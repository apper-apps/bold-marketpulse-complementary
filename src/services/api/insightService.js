class InsightService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'insight_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "type_c" } },
          { field: { Name: "severity_c" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "metric_c" } },
          { field: { Name: "value_c" } },
          { field: { Name: "prediction_c" } }
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
        console.error("Error fetching insights:", error?.response?.data?.message);
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
          { field: { Name: "severity_c" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "metric_c" } },
          { field: { Name: "value_c" } },
          { field: { Name: "prediction_c" } }
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
        console.error(`Error fetching insight with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async create(insight) {
    try {
      // Only include Updateable fields
      const params = {
        records: [{
          Name: insight.Name || insight.title_c,
          Tags: insight.Tags || "",
          type_c: insight.type_c,
          severity_c: insight.severity_c,
          title_c: insight.title_c,
          description_c: insight.description_c,
          metric_c: insight.metric_c,
          value_c: insight.value_c,
          prediction_c: insight.prediction_c
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
          console.error(`Failed to create insights ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating insight:", error?.response?.data?.message);
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
          ...(updates.severity_c && { severity_c: updates.severity_c }),
          ...(updates.title_c && { title_c: updates.title_c }),
          ...(updates.description_c && { description_c: updates.description_c }),
          ...(updates.metric_c && { metric_c: updates.metric_c }),
          ...(updates.value_c && { value_c: updates.value_c }),
          ...(updates.prediction_c && { prediction_c: updates.prediction_c })
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
          console.error(`Failed to update insights ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating insight:", error?.response?.data?.message);
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
          console.error(`Failed to delete insights ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length === 1;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting insight:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
}
export default new InsightService();