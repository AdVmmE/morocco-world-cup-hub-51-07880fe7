
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, MapPin } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useHostCity } from '@/hooks/useHostCities';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

// Map of city names to appropriate Unsplash images
const cityImages = {
  "Casablanca": "https://source.unsplash.com/photo-1577261041320-9cc1bc46fc7a", // Casablanca cityscape
  "Rabat": "https://source.unsplash.com/photo-1579014483681-b08aafe226c8", // Rabat fortress
  "Marrakech": "https://source.unsplash.com/photo-1548019979-e7ce31429f68", // Marrakech marketplace
  "Tangier": "https://source.unsplash.com/photo-1539542222780-720ddb735d62", // Tangier coastal view
  "Fez": "https://source.unsplash.com/photo-1512958789358-4dac96947982", // Fez medina
  "Agadir": "https://source.unsplash.com/photo-1596627118111-5b6c7890bc2a", // Agadir beach
};

// Map of attraction types to appropriate icons from Lucide
const attractionIcons = {
  "mosque": <Building className="h-8 w-8 text-morocco-red" />,
  "market": <MapPin className="h-8 w-8 text-morocco-red" />,
  "palace": <Building className="h-8 w-8 text-morocco-red" />,
  "garden": <MapPin className="h-8 w-8 text-morocco-red" />,
  "default": <MapPin className="h-8 w-8 text-morocco-red" />
};

const CityDetail = () => {
  const { name } = useParams<{ name: string }>();
  
  const {
    data: city,
    isLoading,
    error,
    refetch
  } = useHostCity(name);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <ErrorDisplay onRetry={() => refetch()} message="Failed to load city details" />
          <div className="mt-8 text-center">
            <Button asChild className="bg-morocco-green hover:bg-green-700">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get the appropriate image for the city, or fallback to the city's image property
  const cityImage = cityImages[city.name] || city.image;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative">
        <div className="h-80 bg-gray-300 relative">
          <img 
            src={cityImage} 
            alt={city.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-40"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 left-4"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <div className="mb-6 mt-6 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{city.name}</h1>
                  <p className="text-lg text-gray-600">Host City, Morocco</p>
                </div>
                <Badge className="mt-2 md:mt-0 self-start md:self-auto bg-morocco-red text-white">
                  {city.stadium}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-morocco-red mb-2">{city.population}M</h3>
                  <p className="text-gray-500">Population</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-morocco-green mb-2">{city.stadium}</h3>
                  <p className="text-gray-500">Main Stadium</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-morocco-gold mb-2">{city.distanceFromAirport} km</h3>
                  <p className="text-gray-500">Airport Distance</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About {city.name}</h2>
              <p className="text-gray-700 leading-relaxed">{city.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Top Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {city.attractions.map((attraction, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="mr-4">
                          {attractionIcons.default}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{attraction}</h3>
                          <p className="text-sm text-gray-500">Tourist Attraction</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Stadium Information</h2>
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gray-100 p-6 flex items-center justify-center">
                    <Building className="h-16 w-16 text-morocco-green" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="font-bold text-xl mb-2">{city.stadium}</h3>
                    <p className="text-gray-600 mb-4">Main venue for World Cup matches in {city.name}</p>
                    <Button 
                      variant="outline" 
                      className="border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white"
                      asChild
                    >
                      <Link to={`/stadiums`}>
                        View Stadium Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CityDetail;
