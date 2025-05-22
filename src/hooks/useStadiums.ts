
import { useQuery } from "@tanstack/react-query";
import { Stadium, StadiumsAPI } from "@/api/apiClient";

export const useStadiums = () => {
  return useQuery({
    queryKey: ["stadiums"],
    queryFn: StadiumsAPI.getAll,
  });
};

export const useStadium = (stadiumId: string | undefined) => {
  return useQuery({
    queryKey: ["stadium", stadiumId],
    queryFn: () => StadiumsAPI.getById(stadiumId as string),
    enabled: !!stadiumId,
  });
};
