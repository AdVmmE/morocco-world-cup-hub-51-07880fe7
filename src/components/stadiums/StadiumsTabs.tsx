
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Stadium } from '@/api/types/stadiums';
import { HostCity } from '@/api/types/hostCities';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import StadiumCard from '@/components/StadiumCard';
import HostCityCard from '@/components/HostCityCard';
import StadiumMap from '@/components/maps/StadiumMap';
import SingleStadiumMap from '@/components/maps/SingleStadiumMap';

// Import Leaflet CSS to ensure it's loaded on this page
import 'leaflet/dist/leaflet.css';

interface StadiumsTabsProps {
  activeTab: string;
  stadiums: Stadium[] | undefined;
  hostCities: HostCity[] | undefined;
  stadiumsLoading: boolean;
  citiesLoading: boolean;
  stadiumsError: Error | null;
  citiesError: Error | null;
  refetchStadiums: () => void;
  refetchCities: () => void;
}

const StadiumsTabs: React.FC<StadiumsTabsProps> = ({
  activeTab,
  stadiums,
  hostCities,
  stadiumsLoading,
  citiesLoading,
  stadiumsError,
  citiesError,
  refetchStadiums,
  refetchCities
}) => {
  return (
    <>
      {/* Stadiums Tab */}
      <TabsContent value="stadiums" className="animate-fade-in">
        {stadiumsLoading ? (
          <LoadingSpinner size="large" />
        ) : stadiumsError ? (
          <ErrorDisplay onRetry={refetchStadiums} />
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {stadiums?.map((stadium) => (
              <div key={stadium.id} className="stadium-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <StadiumCard stadium={stadium} />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold mb-4">{stadium.name} Location</h3>
                    <SingleStadiumMap stadium={stadium} height="300px" />
                  </div>
                </div>
                <hr className="my-8 border-gray-200" />
              </div>
            ))}
          </div>
        )}
      </TabsContent>
      
      {/* Host Cities Tab */}
      <TabsContent value="cities" className="animate-fade-in">
        {citiesLoading ? (
          <LoadingSpinner size="large" />
        ) : citiesError ? (
          <ErrorDisplay onRetry={refetchCities} />
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
            <ErrorDisplay onRetry={refetchStadiums} />
          ) : stadiums && stadiums.length > 0 ? (
            <StadiumMap stadiums={stadiums} height="600px" />
          ) : (
            <p className="text-gray-500">No stadiums data available.</p>
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
    </>
  );
};

export default StadiumsTabs;
