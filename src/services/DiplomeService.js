import apiClient from '@/helpers/http.js'

class DiplomeService {

  gettoto(){
    console.log("toto")
  }

  async getAllDiplomes() {
    console.log("getAllDiplomes")
    return await apiClient.get('diplomes').then(response => response.data);

  }
  async getDiplome(diplomeId) {
    return apiClient.get(`diplomes/${diplomeId}`);
  }

  async createDiplome(userData) {
    return apiClient.post('diplomes', userData);
  }

  async updateDiplome(diplomeId, userData) {
    return apiClient.put(`diplomes/${diplomeId}`, userData);
  }

  async deleteDiplome(diplomeId) {
    return apiClient.delete(`diplomes/${diplomeId}`);
  }
}

export const diplomeService = new DiplomeService();
