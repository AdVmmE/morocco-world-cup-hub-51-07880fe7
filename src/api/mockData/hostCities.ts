
import { HostCity } from '../types/hostCities';

export const mockHostCities: HostCity[] = [
  {
    name: 'Casablanca',
    description: 'Morocco\'s largest city and economic center, Casablanca blends modern architecture with traditional Moroccan design. Visitors can explore the Hassan II Mosque, the Corniche, and enjoy the city\'s vibrant nightlife and culinary scene.',
    attractions: ['Hassan II Mosque', 'Old Medina', 'Morocco Mall', 'Corniche', 'Royal Palace of Casablanca'],
    image: '/placeholder.svg',
    population: 3.71,
    stadium: 'Grand Stade de Casablanca',
    distanceFromAirport: 25,
  },
  {
    name: 'Rabat',
    description: 'Morocco\'s capital city offers a perfect blend of history and modernity. Known for its wide avenues, green spaces, and preserved historic sites, Rabat is a UNESCO World Heritage city that showcases the country\'s administrative and cultural importance.',
    attractions: ['Hassan Tower', 'Kasbah of the Udayas', 'Chellah Necropolis', 'Mohammed VI Museum', 'Royal Palace'],
    image: '/placeholder.svg',
    population: 1.83,
    stadium: 'Stade Moulay Abdallah',
    distanceFromAirport: 12,
  },
  {
    name: 'Marrakech',
    description: 'Known as the "Red City," Marrakech is famous for its vibrant souks, historic palaces, and the bustling Jemaa el-Fnaa square. This imperial city offers visitors an immersive experience into Moroccan traditions, craftsmanship, and cuisine.',
    attractions: ['Jemaa el-Fnaa', 'Majorelle Garden', 'Bahia Palace', 'Koutoubia Mosque', 'Medina Souks'],
    image: '/placeholder.svg',
    population: 1.33,
    stadium: 'Stade de Marrakech',
    distanceFromAirport: 15,
  },
  {
    name: 'Tangier',
    description: 'Located at the crossroads of Europe and Africa, Tangier has a unique multicultural heritage and fascinating history. The city offers stunning views of the Mediterranean and Atlantic, alongside historic sites and a distinctive international atmosphere.',
    attractions: ['Kasbah Museum', 'Cap Spartel', 'Caves of Hercules', 'American Legation', 'Grand Socco'],
    image: '/placeholder.svg',
    population: 1.06,
    stadium: 'Grand Stade de Tanger',
    distanceFromAirport: 14,
  },
  {
    name: 'Fez',
    description: 'Morocco\'s cultural and spiritual center, Fez boasts the world\'s largest car-free urban area in its ancient medina. Known for its educational institutions, traditional crafts, and well-preserved medieval architecture, Fez offers visitors an authentic experience of Moroccan history.',
    attractions: ['Fez El Bali (Old Medina)', 'Al-Qarawiyyin University', 'Bou Inania Madrasa', 'Chouara Tannery', 'Merenid Tombs'],
    image: '/placeholder.svg',
    population: 1.22,
    stadium: 'Stade de Fès',
    distanceFromAirport: 16,
  },
  {
    name: 'Agadir',
    description: 'Morocco\'s premier coastal resort, Agadir offers beautiful beaches, modern infrastructure, and a pleasant climate year-round. Rebuilt following an earthquake in 1960, the city features contemporary architecture alongside traditional markets and cultural sites.',
    attractions: ['Agadir Beach', 'Kasbah', 'Souk El Had', 'Valley of the Birds', 'Crocoparc'],
    image: '/placeholder.svg',
    population: 0.92,
    stadium: 'Grand Stade d\'Agadir',
    distanceFromAirport: 20,
  },
];
