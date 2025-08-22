import mockData from "@/services/mockData/campaigns.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CampaignService {
  async getAll() {
    await delay(400);
    return [...mockData];
  }

  async getById(id) {
    await delay(200);
    const item = mockData.find(campaign => campaign.Id === parseInt(id));
    if (!item) {
      throw new Error("Campaign not found");
    }
    return { ...item };
  }

  async create(campaign) {
    await delay(500);
    const newId = Math.max(...mockData.map(item => item.Id), 0) + 1;
    const newCampaign = {
      Id: newId,
      ...campaign
    };
    mockData.push(newCampaign);
    return { ...newCampaign };
  }

  async update(id, updates) {
    await delay(400);
    const index = mockData.findIndex(campaign => campaign.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Campaign not found");
    }
    mockData[index] = { ...mockData[index], ...updates };
    return { ...mockData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = mockData.findIndex(campaign => campaign.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Campaign not found");
    }
    const deleted = mockData.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new CampaignService();