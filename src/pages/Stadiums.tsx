
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for stadiums
const stadiums = [
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

// Mock data for host cities
const hostCities = [
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

const Stadiums = () => {
  const [activeTab, setActiveTab] = useState('stadiums');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-morocco-red to-morocco-green py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Stadiums & Host Cities</h1>
          <p className="text-lg">
            Discover the world-class venues and vibrant cities hosting the FIFA World Cup 2030 in Morocco
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="stadiums" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="stadiums" className="px-6">Stadiums</TabsTrigger>
              <TabsTrigger value="cities" className="px-6">Host Cities</TabsTrigger>
              <TabsTrigger value="map" className="px-6">Interactive Map</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Stadiums Tab */}
          <TabsContent value="stadiums" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stadiums.map((stadium) => (
                <Card key={stadium.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img 
                      src={stadium.image} 
                      alt={stadium.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        stadium.status === 'Operational' ? 'bg-green-500' : 
                        stadium.status === 'Under Construction' ? 'bg-yellow-500' : 
                        'bg-blue-500'
                      } text-white`}>
                        {stadium.status}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{stadium.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{stadium.city}, Morocco</p>
                    
                    <div className="flex justify-between items-center text-sm mb-4">
                      <span>Capacity: {stadium.capacity.toLocaleString()}</span>
                      <span>Matches: {stadium.matches}</span>
                    </div>
                    
                    {stadium.progress < 100 && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>Construction Progress</span>
                          <span>{stadium.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-morocco-green h-2.5 rounded-full" 
                            style={{ width: `${stadium.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 text-center">
                      <Button className="bg-morocco-green hover:bg-green-700">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Host Cities Tab */}
          <TabsContent value="cities" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hostCities.map((city) => (
                <Card key={city.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5">
                      <img 
                        src={city.image} 
                        alt={city.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl mb-3">{city.name}</h3>
                        <Badge className="bg-morocco-red">{city.stadium}</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{city.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {city.attractions.slice(0, 3).map((attraction) => (
                          <Badge key={attraction} variant="outline" className="bg-gray-50">
                            {attraction}
                          </Badge>
                        ))}
                        {city.attractions.length > 3 && (
                          <Badge variant="outline" className="bg-gray-50">
                            +{city.attractions.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Population: {city.population}M</span>
                        <span>Airport: {city.distanceFromAirport} km</span>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" className="border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white">
                          Explore City
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Map Tab */}
          <TabsContent value="map" className="animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4">Interactive Map Coming Soon</h3>
                  <p className="text-gray-600 mb-6">
                    Our interactive map feature is currently under development. It will allow you to
                    explore stadium locations, nearby attractions, and transportation options across Morocco.
                  </p>
                  <div className="inline-flex gap-4">
                    <Button disabled className="bg-morocco-green hover:bg-green-700">
                      Explore Stadiums on Map
                    </Button>
                    <Button disabled variant="outline">
                      View Transportation Routes
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-left">
                <h3 className="text-lg font-bold mb-4">Stadium Locations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stadiums.map((stadium) => (
                    <div key={stadium.id} className="p-3 border rounded-md hover:border-morocco-green cursor-pointer transition-colors">
                      <h4 className="font-medium text-sm mb-1">{stadium.name}</h4>
                      <p className="text-xs text-gray-500">{stadium.city}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-morocco-red mb-2">6</h3>
              <p className="text-gray-500">World-Class Stadiums</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-morocco-green mb-2">345,720</h3>
              <p className="text-gray-500">Total Seating Capacity</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-morocco-gold mb-2">32</h3>
              <p className="text-gray-500">Matches in Morocco</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-fifa mb-2">1.5M+</h3>
              <p className="text-gray-500">Expected Fans</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Stadium Development Progress */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Stadium Development Progress</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {stadiums.map((stadium) => (
                <div key={stadium.id} className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/4">
                    <h3 className="font-medium">{stadium.name}</h3>
                    <p className="text-sm text-gray-500">{stadium.city}</p>
                  </div>
                  <div className="md:w-1/2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          stadium.progress === 100 ? 'bg-green-500' : 
                          stadium.progress > 50 ? 'bg-yellow-500' : 
                          'bg-blue-500'
                        }`} 
                        style={{ width: `${stadium.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="md:w-1/4 flex justify-between">
                    <span className="text-sm font-medium">{stadium.progress}% Complete</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stadium.status === 'Operational' ? 'bg-green-100 text-green-800' : 
                      stadium.status === 'Under Construction' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {stadium.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">When will all stadiums be completed?</h3>
                <p className="text-gray-600">
                  All stadiums in Morocco are scheduled to be completed by the end of 2028, 
                  allowing for a full year of testing and preparation before the tournament begins in 2030.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">How will fans travel between stadiums?</h3>
                <p className="text-gray-600">
                  Morocco is expanding its high-speed rail network to connect all host cities, 
                  and will provide additional shuttle services and public transportation options during the tournament.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Which stadium will host the final match?</h3>
                <p className="text-gray-600">
                  The Grand Stade de Casablanca, with a capacity of 93,000 spectators, 
                  will host the opening ceremony, one semi-final, and the final match of the 2030 FIFA World Cup.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">How sustainable are these stadiums?</h3>
                <p className="text-gray-600">
                  All new and renovated stadiums in Morocco are being built with sustainability in mind, 
                  featuring renewable energy sources, water conservation systems, and eco-friendly materials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Stadiums;
