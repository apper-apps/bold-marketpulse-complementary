const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TeamAccountService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'team_account_c';
  }

  async getAll() {
    try {
      await delay(300);
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "CreatedOn"
            }
          },
          {
            field: {
              Name: "CreatedBy"
            }
          },
          {
            field: {
              Name: "ModifiedOn"
            }
          },
          {
            field: {
              Name: "ModifiedBy"
            }
          },
          {
            field: {
              Name: "team_members_c"
            }
          },
          {
            field: {
              Name: "associated_permissions_c"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
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
        console.error("Error fetching team accounts:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching team accounts:", error);
        throw error;
      }
    }
  }

  async getById(id) {
    try {
      await delay(200);

      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "CreatedOn"
            }
          },
          {
            field: {
              Name: "CreatedBy"
            }
          },
          {
            field: {
              Name: "ModifiedOn"
            }
          },
          {
            field: {
              Name: "ModifiedBy"
            }
          },
          {
            field: {
              Name: "team_members_c"
            }
          },
          {
            field: {
              Name: "associated_permissions_c"
            }
          }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching team account with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching team account with ID ${id}:`, error);
        throw error;
      }
    }
  }

  async create(teamAccountData) {
    try {
      await delay(400);

      // Only include Updateable fields
      const params = {
        records: [
          {
            Name: teamAccountData.Name,
            Tags: teamAccountData.Tags || "",
            team_members_c: teamAccountData.team_members_c?.toString() || "",
            associated_permissions_c: teamAccountData.associated_permissions_c || ""
          }
        ]
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
          console.error(`Failed to create team accounts ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating team account:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating team account:", error);
        throw error;
      }
    }
  }

  async update(id, teamAccountData) {
    try {
      await delay(400);

      // Only include Updateable fields plus Id
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: teamAccountData.Name,
            Tags: teamAccountData.Tags || "",
            team_members_c: teamAccountData.team_members_c?.toString() || "",
            associated_permissions_c: teamAccountData.associated_permissions_c || ""
          }
        ]
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
          console.error(`Failed to update team accounts ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating team account:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating team account:", error);
        throw error;
      }
    }
  }

  async delete(id) {
    try {
      await delay(300);

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
          console.error(`Failed to delete team accounts ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting team account:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting team account:", error);
        throw error;
      }
    }
  }
}

export default new TeamAccountService();