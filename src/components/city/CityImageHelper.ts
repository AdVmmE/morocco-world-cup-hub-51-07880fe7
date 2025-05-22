
import { ASSETS } from '@/assets';

export const getCityImage = (cityName: string): string => {
  switch (cityName) {
    case 'Casablanca':
      return ASSETS.cities.casablanca;
    case 'Rabat':
      return ASSETS.cities.rabat;
    case 'Marrakech':
      return ASSETS.cities.marrakech;
    case 'Tangier':
      return ASSETS.cities.tangier;
    case 'Fez':
      return ASSETS.cities.fez;
    case 'Agadir':
      return ASSETS.cities.agadir;
    default:
      return '/placeholder.svg';
  }
};
