
import { Match } from '../types/matches';
import { apiClient } from '../client';

/**
 * Matches API
 */
export const MatchesAPI = {
  // Get all matches
  getAll: async (): Promise<Match[]> => {
    return apiClient.get<Match[]>('/matches');
  },

  // Get match by ID
  getById: async (id: string): Promise<Match | undefined> => {
    try {
      return await apiClient.get<Match>(`/matches/${id}`);
    } catch (error) {
      return undefined;
    }
  },

  // Get matches by stadium
  getByStadium: async (stadium: string): Promise<Match[]> => {
    return apiClient.get<Match[]>(`/matches/stadium/${encodeURIComponent(stadium)}`);
  },

  // Get matches by team
  getByTeam: async (team: string): Promise<Match[]> => {
    return apiClient.get<Match[]>(`/matches/team/${encodeURIComponent(team)}`);
  },

  // Get matches by date range
  getByDateRange: async (startDate: string, endDate: string): Promise<Match[]> => {
    return apiClient.get<Match[]>(`/matches/date-range?start=${startDate}&end=${endDate}`);
  }
};
