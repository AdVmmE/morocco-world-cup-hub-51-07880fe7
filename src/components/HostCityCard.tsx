
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HostCity } from "@/api/apiClient";
import { Link } from "react-router-dom";

interface HostCityCardProps {
  city: HostCity;
}

const HostCityCard: React.FC<HostCityCardProps> = ({ city }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
            <Button 
              variant="outline" 
              className="border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white"
              asChild
            >
              <Link to={`/city/${city.name}`}>
                Explore City
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HostCityCard;
