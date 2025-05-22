
import { Match } from '../types/matches';
import { mockMatches } from '../mockData/matches';

/**
 * Matches API
 */
export const MatchesAPI = {
  // Get all matches
  getAll: async (): Promise<Match[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMatches;
  },

  // Get match by ID
  getById: async (id: string): Promise<Match | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMatches.find((match) => match.id === id);
  },

  // Get matches by stadium
  getByStadium: async (stadium: string): Promise<Match[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMatches.filter((match) => match.stadium === stadium);
  },

  // Get matches by team
  getByTeam: async (team: string): Promise<Match[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMatches.filter((match) => match.homeTeam === team || match.awayTeam === team);
  },

  // Get matches by date range
  getByDateRange: async (startDate: string, endDate: string): Promise<Match[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMatches.filter((match) => {
      return match.date >= startDate && match.date <= endDate;
    });
  }
};
