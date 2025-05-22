
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Stadium } from '@/api/types/stadiums';

interface StadiumsStatisticsProps {
  stadiums: Stadium[] | undefined;
}

const StadiumsStatistics: React.FC<StadiumsStatisticsProps> = ({ stadiums }) => {
  return (
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
  );
};

export default StadiumsStatistics;
