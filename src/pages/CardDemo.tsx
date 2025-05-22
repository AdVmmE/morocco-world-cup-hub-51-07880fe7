
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CardShowcase from '@/components/cards/CardShowcase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StadiumMap from '@/components/maps/StadiumMap';
import { useStadiums } from '@/hooks/useStadiums';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

const CardDemo = () => {
  const { data: stadiums, isLoading: stadiumsLoading, error: stadiumsError, refetch: refetchStadiums } = useStadiums();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-morocco-red to-morocco-green py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Morocco World Cup 2030</h1>
          <p className="text-lg">
            Interactive Components Showcase for the FIFA World Cup 2030
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Tabs defaultValue="cards">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="cards" className="px-6">Card Components</TabsTrigger>
              <TabsTrigger value="maps" className="px-6">Interactive Maps</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="cards" className="animate-fade-in">
            <CardShowcase />
          </TabsContent>
          
          <TabsContent value="maps" className="animate-fade-in">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Morocco Stadium Locations</h2>
                <p className="text-gray-600 mb-6">
                  Explore the locations of all stadiums hosting the 2030 FIFA World Cup matches in Morocco.
                  Click on any marker to see details about the stadium and its status.
                </p>
              </div>
              
              {stadiumsLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="large" />
                </div>
              ) : stadiumsError ? (
                <ErrorDisplay onRetry={() => refetchStadiums()} />
              ) : (
                <StadiumMap stadiums={stadiums || []} height="600px" />
              )}
              
              <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
                <h3 className="text-lg font-bold mb-4">Stadium Information</h3>
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
      </div>
      
      <Footer />
    </div>
  );
};

export default CardDemo;
