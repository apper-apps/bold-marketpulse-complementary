class CampaignService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'campaign_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "source_id_c" } },
          { field: { Name: "impressions_c" } },
          { field: { Name: "clicks_c" } },
          { field: { Name: "conversions_c" } },
          { field: { Name: "spend_c" } },
          { field: { Name: "ctr_c" } },
          { field: { Name: "conversion_rate_c" } },
          { field: { Name: "cpc_c" } },
          { field: { Name: "platform_c" } },
          { field: { Name: "date_range_c" } }
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

      // Transform data to maintain compatibility with existing UI
      const campaigns = (response.data || []).map(campaign => ({
        Id: campaign.Id,
        name: campaign.Name,
        sourceId: campaign.source_id_c?.Id || campaign.source_id_c,
        metrics: {
          impressions: campaign.impressions_c || 0,
          clicks: campaign.clicks_c || 0,
          conversions: campaign.conversions_c || 0,
          spend: campaign.spend_c || 0,
          ctr: campaign.ctr_c || 0,
          conversionRate: campaign.conversion_rate_c || 0,
          cpc: campaign.cpc_c || 0
        },
        normalizedData: {
          platform: campaign.platform_c || "",
          dateRange: campaign.date_range_c || ""
        }
      }));

      return campaigns;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching campaigns:", error?.response?.data?.message);
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
          { field: { Name: "source_id_c" } },
          { field: { Name: "impressions_c" } },
          { field: { Name: "clicks_c" } },
          { field: { Name: "conversions_c" } },
          { field: { Name: "spend_c" } },
          { field: { Name: "ctr_c" } },
          { field: { Name: "conversion_rate_c" } },
          { field: { Name: "cpc_c" } },
          { field: { Name: "platform_c" } },
          { field: { Name: "date_range_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Transform single record to maintain compatibility
      const campaign = response.data;
      return {
        Id: campaign.Id,
        name: campaign.Name,
        sourceId: campaign.source_id_c?.Id || campaign.source_id_c,
        metrics: {
          impressions: campaign.impressions_c || 0,
          clicks: campaign.clicks_c || 0,
          conversions: campaign.conversions_c || 0,
          spend: campaign.spend_c || 0,
          ctr: campaign.ctr_c || 0,
          conversionRate: campaign.conversion_rate_c || 0,
          cpc: campaign.cpc_c || 0
        },
        normalizedData: {
          platform: campaign.platform_c || "",
          dateRange: campaign.date_range_c || ""
        }
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching campaign with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async create(campaign) {
    try {
      // Only include Updateable fields, flatten nested structures
      const params = {
        records: [{
          Name: campaign.name || campaign.Name,
          Tags: campaign.Tags || "",
          source_id_c: parseInt(campaign.sourceId || campaign.source_id_c || 1),
          impressions_c: campaign.metrics?.impressions || campaign.impressions_c || 0,
          clicks_c: campaign.metrics?.clicks || campaign.clicks_c || 0,
          conversions_c: campaign.metrics?.conversions || campaign.conversions_c || 0,
          spend_c: campaign.metrics?.spend || campaign.spend_c || 0,
          ctr_c: campaign.metrics?.ctr || campaign.ctr_c || 0,
          conversion_rate_c: campaign.metrics?.conversionRate || campaign.conversion_rate_c || 0,
          cpc_c: campaign.metrics?.cpc || campaign.cpc_c || 0,
          platform_c: campaign.normalizedData?.platform || campaign.platform_c || "",
          date_range_c: campaign.normalizedData?.dateRange || campaign.date_range_c || ""
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
          console.error(`Failed to create campaigns ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating campaign:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async update(id, updates) {
    try {
      // Only include Updateable fields, flatten nested structures
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.name && { Name: updates.name }),
          ...(updates.Name && { Name: updates.Name }),
          ...(updates.Tags && { Tags: updates.Tags }),
          ...(updates.sourceId && { source_id_c: parseInt(updates.sourceId) }),
          ...(updates.source_id_c && { source_id_c: parseInt(updates.source_id_c) }),
          ...(updates.metrics?.impressions !== undefined && { impressions_c: updates.metrics.impressions }),
          ...(updates.metrics?.clicks !== undefined && { clicks_c: updates.metrics.clicks }),
          ...(updates.metrics?.conversions !== undefined && { conversions_c: updates.metrics.conversions }),
          ...(updates.metrics?.spend !== undefined && { spend_c: updates.metrics.spend }),
          ...(updates.metrics?.ctr !== undefined && { ctr_c: updates.metrics.ctr }),
          ...(updates.metrics?.conversionRate !== undefined && { conversion_rate_c: updates.metrics.conversionRate }),
          ...(updates.metrics?.cpc !== undefined && { cpc_c: updates.metrics.cpc }),
          ...(updates.normalizedData?.platform && { platform_c: updates.normalizedData.platform }),
          ...(updates.normalizedData?.dateRange && { date_range_c: updates.normalizedData.dateRange })
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
          console.error(`Failed to update campaigns ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating campaign:", error?.response?.data?.message);
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
          console.error(`Failed to delete campaigns ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length === 1;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting campaign:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
}
export default new CampaignService();