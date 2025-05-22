
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stadium } from "@/api/apiClient";
import { Link } from "react-router-dom";

interface StadiumCardProps {
  stadium: Stadium;
}

const StadiumCard: React.FC<StadiumCardProps> = ({ stadium }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
          <Button 
            className="bg-morocco-green hover:bg-green-700"
            asChild
          >
            <Link to={`/stadium/${stadium.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StadiumCard;
