
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Bus } from "lucide-react";

interface TransportCardProps {
  id: string;
  type: 'bus' | 'train' | 'taxi' | 'shuttle';
  title: string;
  image: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  departureTime?: string;
  frequency?: string;
}

const TransportCard = ({ 
  id, 
  type, 
  title, 
  image, 
  from, 
  to, 
  duration, 
  price, 
  departureTime, 
  frequency 
}: TransportCardProps) => {
  
  // Get appropriate icon by type
  let TransportIcon = Bus;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={`${type} transport from ${from} to ${to}`} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-3 right-3 bg-morocco-blue capitalize">
          {type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm">
            <TransportIcon className="h-4 w-4 mr-1" />
            <span>{from} → {to}</span>
          </div>
          <Badge className="bg-morocco-red/10 text-morocco-red">
            ${price}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {frequency || departureTime || 'Daily Service'}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            {frequency ? `Runs ${frequency}` : departureTime ? `Departs at ${departureTime}` : 'Schedule varies'}
          </p>
          <Button className="bg-morocco-green hover:bg-green-700">
            Reserve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportCard;
