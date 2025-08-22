class DataSourceService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'data_source_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "last_sync_c" } },
          { field: { Name: "credentials_c" } }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching data sources:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "last_sync_c" } },
          { field: { Name: "credentials_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching data source with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async create(dataSource) {
    try {
      // Only include Updateable fields
      const params = {
        records: [{
          Name: dataSource.Name || dataSource.name,
          Tags: dataSource.Tags || "",
          type_c: dataSource.type_c || dataSource.type,
          status_c: dataSource.status_c || dataSource.status || "pending",
          last_sync_c: dataSource.last_sync_c || dataSource.lastSync || "Never",
          credentials_c: dataSource.credentials_c || dataSource.credentials || ""
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create data sources ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating data source:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async update(id, updates) {
    try {
      // Only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.Name && { Name: updates.Name }),
          ...(updates.Tags && { Tags: updates.Tags }),
          ...(updates.type_c && { type_c: updates.type_c }),
          ...(updates.status_c && { status_c: updates.status_c }),
          ...(updates.last_sync_c && { last_sync_c: updates.last_sync_c }),
          ...(updates.credentials_c && { credentials_c: updates.credentials_c }),
          // Support legacy field names for backward compatibility
          ...(updates.status && { status_c: updates.status }),
          ...(updates.lastSync && { last_sync_c: updates.lastSync })
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update data sources ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating data source:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete data sources ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length === 1;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting data source:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async syncDataSource(id) {
    try {
      // Update status to syncing first, then to connected
      await this.update(id, { 
        status_c: "syncing"
      });
      
      // Simulate sync delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return this.update(id, { 
        status_c: "connected", 
        last_sync_c: "Just now" 
      });
    } catch (error) {
      // Set status to error on failure
      await this.update(id, { status_c: "error" });
      throw error;
    }
  }
}

export default new DataSourceService();