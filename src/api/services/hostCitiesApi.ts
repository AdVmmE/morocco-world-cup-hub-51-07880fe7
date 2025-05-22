
import { HostCity } from '../types/hostCities';
import { mockHostCities } from '../mockData/hostCities';

/**
 * Host Cities API
 */
export const HostCitiesAPI = {
  // Get all host cities
  getAll: async (): Promise<HostCity[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockHostCities;
  },

  // Get host city by name
  getByName: async (name: string): Promise<HostCity | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockHostCities.find((city) => city.name === name);
  }
};
