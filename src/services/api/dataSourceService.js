import mockData from "@/services/mockData/dataSources.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DataSourceService {
  async getAll() {
    await delay(300);
    return [...mockData];
  }

  async getById(id) {
    await delay(200);
    const item = mockData.find(source => source.Id === parseInt(id));
    if (!item) {
      throw new Error("Data source not found");
    }
    return { ...item };
  }

  async create(dataSource) {
    await delay(500);
    const newId = Math.max(...mockData.map(item => item.Id), 0) + 1;
    const newDataSource = {
      Id: newId,
      ...dataSource,
      status: "connected",
      lastSync: "Just now"
    };
    mockData.push(newDataSource);
    return { ...newDataSource };
  }

  async update(id, updates) {
    await delay(400);
    const index = mockData.findIndex(source => source.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Data source not found");
    }
    mockData[index] = { ...mockData[index], ...updates };
    return { ...mockData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = mockData.findIndex(source => source.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Data source not found");
    }
    const deleted = mockData.splice(index, 1)[0];
    return { ...deleted };
  }

  async syncDataSource(id) {
    await delay(2000);
    return this.update(id, { 
      status: "connected", 
      lastSync: "Just now" 
    });
  }
}

export default new DataSourceService();