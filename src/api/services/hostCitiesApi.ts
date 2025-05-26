
import { HostCity } from '../types/hostCities';
import { apiClient } from '../client';

/**
 * Host Cities API
 */
export const HostCitiesAPI = {
  // Get all host cities
  getAll: async (): Promise<HostCity[]> => {
    return apiClient.get<HostCity[]>('/host-cities');
  },

  // Get host city by name
  getByName: async (name: string): Promise<HostCity | undefined> => {
    try {
      return await apiClient.get<HostCity>(`/host-cities/${encodeURIComponent(name)}`);
    } catch (error) {
      return undefined;
    }
  }
};
