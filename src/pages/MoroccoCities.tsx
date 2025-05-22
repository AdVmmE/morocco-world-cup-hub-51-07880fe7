
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useHostCities } from '@/hooks/useHostCities';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

const MoroccoCities = () => {
  const { data: cities, isLoading, error, refetch } = useHostCities();

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
  
  if (error || !cities) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <ErrorDisplay onRetry={() => refetch()} message="Failed to load cities" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Host Cities</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the vibrant cities of Morocco that will host the 2030 FIFA World Cup
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link to={`/city/${city.name}`} key={city.name}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 relative">
                  <img 
                    src={city.image} 
                    alt={city.imageAlt || city.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h2 className="text-2xl font-bold">{city.name}</h2>
                      <p className="text-sm opacity-90">{city.stadium}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {city.description.substring(0, 120)}...
                  </p>
                  <div className="flex items-center text-morocco-green font-medium">
                    Explore city <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MoroccoCities;
