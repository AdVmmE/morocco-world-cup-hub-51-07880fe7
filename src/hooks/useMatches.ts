
import { useQuery } from "@tanstack/react-query";
import { Match, MatchesAPI } from "@/api/apiClient";

interface UseMatchesOptions {
  stadiumId?: string;
  teamName?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export const useMatches = (options?: UseMatchesOptions) => {
  return useQuery({
    queryKey: ["matches", options],
    queryFn: async () => {
      if (options?.stadiumId) {
        return MatchesAPI.getByStadium(options.stadiumId);
      }
      
      if (options?.teamName) {
        return MatchesAPI.getByTeam(options.teamName);
      }
      
      if (options?.dateRange) {
        return MatchesAPI.getByDateRange(options.dateRange.start, options.dateRange.end);
      }
      
      return MatchesAPI.getAll();
    }
  });
};

export const useMatch = (matchId: string | undefined) => {
  return useQuery({
    queryKey: ["match", matchId],
    queryFn: () => MatchesAPI.getById(matchId as string),
    enabled: !!matchId,
  });
};
