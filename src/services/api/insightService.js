import mockData from "@/services/mockData/insights.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class InsightService {
  async getAll() {
    await delay(450);
    return [...mockData];
  }

  async getById(id) {
    await delay(200);
    const item = mockData.find(insight => insight.Id === parseInt(id));
    if (!item) {
      throw new Error("Insight not found");
    }
    return { ...item };
  }

  async create(insight) {
    await delay(500);
    const newId = Math.max(...mockData.map(item => item.Id), 0) + 1;
    const newInsight = {
      Id: newId,
      ...insight
    };
    mockData.push(newInsight);
    return { ...newInsight };
  }

  async update(id, updates) {
    await delay(400);
    const index = mockData.findIndex(insight => insight.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Insight not found");
    }
    mockData[index] = { ...mockData[index], ...updates };
    return { ...mockData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = mockData.findIndex(insight => insight.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Insight not found");
    }
    const deleted = mockData.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new InsightService();