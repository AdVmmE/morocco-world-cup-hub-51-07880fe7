
/**
 * API Client for the Morocco 2030 World Cup project
 * 
 * This file contains all API calls needed for the application,
 * organized by their respective domains (matches, stadiums, tickets, news)
 */

// Types for our API responses
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  group?: string;
  round?: string;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'completed';
  highlightUrl?: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  image: string;
  status: string;
  progress: number;
  description: string;
  features: string[];
  matches: number;
  startDate: string;
  coordinates: [number, number];
}

export interface HostCity {
  name: string;
  description: string;
  attractions: string[];
  image: string;
  population: number;
  stadium: string;
  distanceFromAirport: number;
}

export interface Ticket {
  id: string;
  matchId: string;
  category: string;
  price: number;
  currency: string;
  available: number;
  maxPerPerson: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
}

// Mock data - In a real app, these would be API calls to a backend
const mockStadiums: Stadium[] = [
  {
    id: 'grand-stade-casablanca',
    name: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    capacity: 93000,
    image: '/placeholder.svg',
    status: 'Under Construction',
    progress: 65,
    description: 'The Grand Stade de Casablanca will be the crown jewel of Morocco\'s World Cup hosting, with a planned capacity of 93,000 spectators. This ultramodern arena will host the opening ceremony, several group matches, a semi-final, and the final match. The stadium features a distinctive Moroccan architectural design with a partially retractable roof and state-of-the-art facilities.',
    features: ['Retractable roof', 'VIP lounges', '360° screens', 'Smart seating', 'FIFA Elite Stadium status'],
    matches: 8,
    startDate: 'June 10, 2030',
    coordinates: [33.5731, -7.5898],
  },
  {
    id: 'stade-moulay-abdallah',
    name: 'Stade Moulay Abdallah',
    city: 'Rabat',
    capacity: 52000,
    image: '/placeholder.svg',
    status: 'Renovation Planned',
    progress: 30,
    description: 'Located in Morocco\'s capital city, the Stade Moulay Abdallah is undergoing extensive renovations to meet FIFA\'s standards for the 2030 World Cup. The renovations will increase seating capacity to 52,000 and modernize all facilities while preserving the stadium\'s historic character. The stadium will host group stage matches and a Round of 16 game.',
    features: ['Enhanced acoustics', 'Improved player facilities', 'New media center', 'Expanded VIP areas'],
    matches: 5,
    startDate: 'June 12, 2030',
    coordinates: [34.0209, -6.8416],
  },
  {
    id: 'grand-stade-agadir',
    name: 'Grand Stade d\'Agadir',
    city: 'Agadir',
    capacity: 45480,
    image: '/placeholder.svg',
    status: 'Operational',
    progress: 100,
    description: 'The Grand Stade d\'Agadir is a modern stadium completed in 2013 with a distinctive crescent-moon shape inspired by the nearby Atlas Mountains. With a capacity of 45,480, this coastal venue will host group stage matches. Its location offers visiting fans an opportunity to combine football with beach activities in one of Morocco\'s most popular tourist destinations.',
    features: ['Natural grass pitch', 'Energy-efficient design', 'Panoramic city views', 'Athletic track'],
    matches: 4,
    startDate: 'June 14, 2030',
    coordinates: [30.4078, -9.5981],
  },
  {
    id: 'stade-marrakech',
    name: 'Stade de Marrakech',
    city: 'Marrakech',
    capacity: 45240,
    image: '/placeholder.svg',
    status: 'Operational',
    progress: 100,
    description: 'The Stade de Marrakech, set against the backdrop of the Atlas Mountains, is a multi-purpose stadium that will showcase Morocco\'s cultural heritage during the World Cup. With a capacity of 45,240, it will host group stage matches and a Round of 16 game. The stadium combines modern amenities with traditional Moroccan design elements such as mosaic tilework and geometric patterns.',
    features: ['Hybrid grass system', '360° fan zone', 'Cultural exhibition space', 'Traditional design elements'],
    matches: 5,
    startDate: 'June 12, 2030',
    coordinates: [31.6295, -8.0056],
  },
  {
    id: 'grand-stade-tanger',
    name: 'Grand Stade de Tanger',
    city: 'Tangier',
    capacity: 65000,
    image: '/placeholder.svg',
    status: 'Expansion Planned',
    progress: 50,
    description: 'The Grand Stade de Tanger is undergoing significant expansion to increase its capacity to 65,000 for the World Cup. Its strategic location near the Strait of Gibraltar makes it easily accessible for European fans. The stadium will feature a unique design inspired by the region\'s maritime heritage and will host group stage matches, a Round of 16 game, and a quarter-final match.',
    features: ['Expanded seating', 'Maritime design theme', 'Mediterranean views', 'Advanced cooling system'],
    matches: 6,
    startDate: 'June 13, 2030',
    coordinates: [35.7595, -5.8040],
  },
  {
    id: 'stade-fes',
    name: 'Stade de Fès',
    city: 'Fez',
    capacity: 45000,
    image: '/placeholder.svg',
    status: 'Renovation Planned',
    progress: 40,
    description: 'Located in the historic city of Fez, this stadium is being renovated to reflect the city\'s status as a cultural and intellectual center. The renovations will boost capacity to 45,000 and improve all facilities while incorporating elements inspired by the city\'s famous medina. The stadium will host group stage matches and will showcase Morocco\'s oldest imperial city to visiting fans.',
    features: ['Traditional architecture', 'Modern amenities', 'Cultural heritage displays', 'Improved accessibility'],
    matches: 4,
    startDate: 'June 13, 2030',
    coordinates: [34.0181, -4.9774],
  },
];

const mockHostCities: HostCity[] = [
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

// Mock upcoming matches data
const mockMatches: Match[] = [
  {
    id: 'match-1',
    homeTeam: 'Morocco',
    awayTeam: 'Spain',
    date: '2030-06-10',
    time: '20:00',
    stadium: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    group: 'A',
    status: 'scheduled',
  },
  {
    id: 'match-2',
    homeTeam: 'France',
    awayTeam: 'Brazil',
    date: '2030-06-11',
    time: '17:00',
    stadium: 'Stade de Marrakech',
    city: 'Marrakech',
    group: 'B',
    status: 'scheduled',
  },
  {
    id: 'match-3',
    homeTeam: 'Argentina',
    awayTeam: 'Germany',
    date: '2030-06-12',
    time: '14:00',
    stadium: 'Grand Stade de Tanger',
    city: 'Tangier',
    group: 'C',
    status: 'scheduled',
  },
  {
    id: 'match-4',
    homeTeam: 'England',
    awayTeam: 'Portugal',
    date: '2030-06-12',
    time: '20:00',
    stadium: 'Stade Moulay Abdallah',
    city: 'Rabat',
    group: 'D',
    status: 'scheduled',
  },
  {
    id: 'match-5',
    homeTeam: 'Belgium',
    awayTeam: 'Netherlands',
    date: '2030-06-13',
    time: '17:00',
    stadium: 'Grand Stade d\'Agadir',
    city: 'Agadir',
    group: 'E',
    status: 'scheduled',
  },
  {
    id: 'match-6',
    homeTeam: 'Italy',
    awayTeam: 'Uruguay',
    date: '2030-06-14',
    time: '14:00',
    stadium: 'Stade de Fès',
    city: 'Fez',
    group: 'F',
    status: 'scheduled',
  },
];

// Mock news data
const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Morocco Unveils Final Stadium Designs for World Cup 2030',
    summary: 'The organizing committee has revealed the final designs for all six stadiums that will host matches during the 2030 FIFA World Cup.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Mohammed El Fassi',
    date: '2025-03-15',
    category: 'Infrastructure',
    image: '/placeholder.svg',
    tags: ['Stadiums', 'Architecture', 'Infrastructure'],
  },
  {
    id: 'news-2',
    title: 'FIFA Praises Morocco\'s World Cup Preparations',
    summary: 'FIFA officials have expressed satisfaction with Morocco\'s progress in preparing for the 2030 World Cup, citing significant infrastructure development.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Sarah Johnson',
    date: '2025-04-02',
    category: 'Official',
    image: '/placeholder.svg',
    tags: ['FIFA', 'Preparations', 'Official Statement'],
  },
  {
    id: 'news-3',
    title: 'Transportation Network Expansion on Track for 2030',
    summary: 'Morocco\'s ambitious transportation expansion project is proceeding on schedule, with high-speed rail connections between all host cities expected to be operational by 2028.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Younes Belhanda',
    date: '2025-04-10',
    category: 'Infrastructure',
    image: '/placeholder.svg',
    tags: ['Transportation', 'High-Speed Rail', 'Infrastructure'],
  },
  {
    id: 'news-4',
    title: 'Ticket Sales Strategy Announced for World Cup 2030',
    summary: 'The organizing committee has unveiled the ticket sales strategy for the 2030 FIFA World Cup, with the first phase of sales starting in January 2029.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Fatima Zahra',
    date: '2025-04-18',
    category: 'Tickets',
    image: '/placeholder.svg',
    tags: ['Tickets', 'Sales', 'Strategy'],
  },
];

// Mock tickets data
const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    matchId: 'match-1',
    category: 'Category 1',
    price: 200,
    currency: 'USD',
    available: 5000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-2',
    matchId: 'match-1',
    category: 'Category 2',
    price: 150,
    currency: 'USD',
    available: 10000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-3',
    matchId: 'match-1',
    category: 'Category 3',
    price: 100,
    currency: 'USD',
    available: 20000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-4',
    matchId: 'match-2',
    category: 'Category 1',
    price: 180,
    currency: 'USD',
    available: 4000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-5',
    matchId: 'match-2',
    category: 'Category 2',
    price: 130,
    currency: 'USD',
    available: 8000,
    maxPerPerson: 4,
  },
];

// API functions
// In a real app, these would be actual API calls using fetch or axios

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

/**
 * News API
 */
export const NewsAPI = {
  // Get all news
  getAll: async (): Promise<NewsItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews;
  },

  // Get news by ID
  getById: async (id: string): Promise<NewsItem | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews.find((news) => news.id === id);
  },

  // Get news by category
  getByCategory: async (category: string): Promise<NewsItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews.filter((news) => news.category === category);
  },

  // Search news
  search: async (query: string): Promise<NewsItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews.filter((news) => {
      return news.title.toLowerCase().includes(query.toLowerCase()) || 
             news.summary.toLowerCase().includes(query.toLowerCase()) ||
             news.content.toLowerCase().includes(query.toLowerCase());
    });
  }
};

/**
 * Tickets API
 */
export const TicketsAPI = {
  // Get all tickets
  getAll: async (): Promise<Ticket[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTickets;
  },

  // Get tickets by match ID
  getByMatchId: async (matchId: string): Promise<Ticket[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTickets.filter((ticket) => ticket.matchId === matchId);
  },

  // Book tickets (simulated)
  bookTickets: async (ticketId: string, quantity: number): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const ticket = mockTickets.find((t) => t.id === ticketId);
    
    if (!ticket) {
      return { success: false, message: 'Ticket not found' };
    }
    
    if (quantity > ticket.available) {
      return { success: false, message: 'Not enough tickets available' };
    }
    
    if (quantity > ticket.maxPerPerson) {
      return { success: false, message: `Maximum ${ticket.maxPerPerson} tickets per person allowed` };
    }
    
    // In a real app, this would update the database
    // ticket.available -= quantity;
    
    return { success: true, message: `Successfully booked ${quantity} tickets` };
  }
};

// Export a default object with all APIs for convenience
const API = {
  Stadiums: StadiumsAPI,
  HostCities: HostCitiesAPI,
  Matches: MatchesAPI,
  News: NewsAPI,
  Tickets: TicketsAPI
};

export default API;
