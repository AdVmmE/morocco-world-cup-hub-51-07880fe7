
import { useQuery } from "@tanstack/react-query";
import { HostCitiesAPI, HostCity } from "@/api/apiClient";

export const useHostCities = () => {
  return useQuery({
    queryKey: ["hostCities"],
    queryFn: HostCitiesAPI.getAll,
  });
};

export const useHostCity = (cityName: string | undefined) => {
  return useQuery({
    queryKey: ["hostCity", cityName],
    queryFn: () => HostCitiesAPI.getByName(cityName as string),
    enabled: !!cityName,
  });
};
