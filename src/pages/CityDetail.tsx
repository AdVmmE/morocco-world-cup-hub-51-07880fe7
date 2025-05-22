
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useHostCity } from '@/hooks/useHostCities';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import CityHeader from '@/components/city/CityHeader';
import CityStats from '@/components/city/CityStats';
import CityDescription from '@/components/city/CityDescription';
import CityAttractions from '@/components/city/CityAttractions';
import CityStadium from '@/components/city/CityStadium';
import { getCityImage } from '@/components/city/CityImageHelper';

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

  const cityImage = getCityImage(city.name);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CityHeader city={city} cityImage={cityImage} />
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-6">
          <CityStats city={city} />
          <CityDescription city={city} />
          <CityAttractions city={city} />
          <CityStadium city={city} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CityDetail;
