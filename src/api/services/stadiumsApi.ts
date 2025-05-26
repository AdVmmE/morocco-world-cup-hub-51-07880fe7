
import { Stadium } from '../types/stadiums';
import { apiClient } from '../client';

/**
 * Stadiums API
 */
export const StadiumsAPI = {
  // Get all stadiums
  getAll: async (): Promise<Stadium[]> => {
    return apiClient.get<Stadium[]>('/stadiums');
  },

  // Get stadium by ID
  getById: async (id: string): Promise<Stadium | undefined> => {
    try {
      return await apiClient.get<Stadium>(`/stadiums/${id}`);
    } catch (error) {
      return undefined;
    }
  },

  // Get stadiums by city
  getByCity: async (city: string): Promise<Stadium[]> => {
    return apiClient.get<Stadium[]>(`/stadiums?city=${encodeURIComponent(city)}`);
  },

  // Get stadium matches
  getMatches: async (stadiumId: string) => {
    return apiClient.get(`/stadiums/${stadiumId}/matches`);
  }
};
