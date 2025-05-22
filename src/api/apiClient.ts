
/**
 * API Client for the Morocco 2030 World Cup project
 * 
 * This file re-exports all API interfaces and services for easy access
 */

// Export types
export * from './types/stadiums';
export * from './types/hostCities';
export * from './types/matches';
export * from './types/news';
export * from './types/tickets';

// Export API services
export { StadiumsAPI } from './services/stadiumsApi';
export { HostCitiesAPI } from './services/hostCitiesApi';
export { MatchesAPI } from './services/matchesApi';
export { NewsAPI } from './services/newsApi';
export { TicketsAPI } from './services/ticketsApi';

// Export a default object with all APIs for convenience
import { StadiumsAPI } from './services/stadiumsApi';
import { HostCitiesAPI } from './services/hostCitiesApi';
import { MatchesAPI } from './services/matchesApi';
import { NewsAPI } from './services/newsApi';
import { TicketsAPI } from './services/ticketsApi';

const API = {
  Stadiums: StadiumsAPI,
  HostCities: HostCitiesAPI,
  Matches: MatchesAPI,
  News: NewsAPI,
  Tickets: TicketsAPI
};

export default API;
