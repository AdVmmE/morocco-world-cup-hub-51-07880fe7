
import { Stadium } from '../types/stadiums';
import { mockStadiums } from '../mockData/stadiums';

/**
 * Stadiums API
 */
export const StadiumsAPI = {
  // Get all stadiums
  getAll: async (): Promise<Stadium[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStadiums;
  },

  // Get stadium by ID
  getById: async (id: string): Promise<Stadium | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStadiums.find((stadium) => stadium.id === id);
  },

  // Get stadiums by city
  getByCity: async (city: string): Promise<Stadium[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStadiums.filter((stadium) => stadium.city === city);
  }
};
