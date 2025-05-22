
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStadiums } from '@/hooks/useStadiums';
import { useHostCities } from '@/hooks/useHostCities';
import StadiumsHeader from '@/components/stadiums/StadiumsHeader';
import StadiumsTabs from '@/components/stadiums/StadiumsTabs';
import StadiumsStatistics from '@/components/stadiums/StadiumsStatistics';
import StadiumsProgress from '@/components/stadiums/StadiumsProgress';
import StadiumsFAQ from '@/components/stadiums/StadiumsFAQ';

const Stadiums = () => {
  const [activeTab, setActiveTab] = useState('stadiums');
  
  const { 
    data: stadiums, 
    isLoading: stadiumsLoading, 
    error: stadiumsError,
    refetch: refetchStadiums
  } = useStadiums();

  const { 
    data: hostCities, 
    isLoading: citiesLoading, 
    error: citiesError,
    refetch: refetchCities
  } = useHostCities();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <StadiumsHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="stadiums" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="stadiums" className="px-6">Stadiums</TabsTrigger>
              <TabsTrigger value="cities" className="px-6">Host Cities</TabsTrigger>
              <TabsTrigger value="map" className="px-6">Interactive Map</TabsTrigger>
            </TabsList>
          </div>
          
          <StadiumsTabs 
            activeTab={activeTab}
            stadiums={stadiums}
            hostCities={hostCities}
            stadiumsLoading={stadiumsLoading}
            citiesLoading={citiesLoading}
            stadiumsError={stadiumsError}
            citiesError={citiesError}
            refetchStadiums={refetchStadiums}
            refetchCities={refetchCities}
          />
        </Tabs>
        
        <StadiumsStatistics stadiums={stadiums} />
        
        <StadiumsProgress 
          stadiums={stadiums}
          isLoading={stadiumsLoading}
          error={stadiumsError}
          onRetry={refetchStadiums}
        />
        
        <StadiumsFAQ />
      </div>
      
      <Footer />
    </div>
  );
};

export default Stadiums;
