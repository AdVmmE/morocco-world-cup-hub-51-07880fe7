import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStadiums } from '@/hooks/useStadiums';
import { useHostCities } from '@/hooks/useHostCities';
import StadiumCard from '@/components/StadiumCard';
import HostCityCard from '@/components/HostCityCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import StadiumMap from '@/components/maps/StadiumMap';

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
            {stadiumsLoading ? (
              <LoadingSpinner size="large" />
            ) : stadiumsError ? (
              <ErrorDisplay onRetry={() => refetchStadiums()} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stadiums?.map((stadium) => (
                  <StadiumCard key={stadium.id} stadium={stadium} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Host Cities Tab */}
          <TabsContent value="cities" className="animate-fade-in">
            {citiesLoading ? (
              <LoadingSpinner size="large" />
            ) : citiesError ? (
              <ErrorDisplay onRetry={() => refetchCities()} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {hostCities?.map((city) => (
                  <HostCityCard key={city.name} city={city} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Map Tab */}
          <TabsContent value="map" className="animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Morocco Stadium Locations</h2>
              <p className="text-gray-600 mb-6">
                Explore the locations of all stadiums hosting the 2030 FIFA World Cup matches in Morocco.
                Click on any marker to see details about the stadium.
              </p>
              
              {stadiumsLoading ? (
                <LoadingSpinner size="large" />
              ) : stadiumsError ? (
                <ErrorDisplay onRetry={() => refetchStadiums()} />
              ) : (
                <StadiumMap stadiums={stadiums || []} height="600px" />
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Stadium Locations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stadiums?.map((stadium) => (
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
              <h3 className="text-4xl font-bold text-morocco-red mb-2">{stadiums?.length || 0}</h3>
              <p className="text-gray-500">World-Class Stadiums</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-morocco-green mb-2">
                {stadiums?.reduce((total, stadium) => total + stadium.capacity, 0).toLocaleString() || 0}
              </h3>
              <p className="text-gray-500">Total Seating Capacity</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-bold text-morocco-gold mb-2">
                {stadiums?.reduce((total, stadium) => total + stadium.matches, 0) || 0}
              </h3>
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
          
          {stadiumsLoading ? (
            <LoadingSpinner />
          ) : stadiumsError ? (
            <ErrorDisplay onRetry={() => refetchStadiums()} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {stadiums?.map((stadium) => (
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
          )}
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
