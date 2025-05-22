
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Hotel } from "lucide-react";

interface HotelCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  price: number;
  amenities: string[];
  distance?: string;
}

const HotelCard = ({ id, name, image, rating, location, price, amenities, distance }: HotelCardProps) => {
  // Generate star rating
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < rating ? 'text-morocco-gold fill-morocco-gold' : 'text-gray-300'}`}
    />
  ));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={`Hotel: ${name}`}
          className="w-full h-full object-cover" 
          loading="lazy"
        />
        <Badge className="absolute top-3 right-3 bg-morocco-green">
          ${price} / night
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <h3 className="font-bold text-lg mr-2">{name}</h3>
          <div className="flex ml-auto">
            {stars}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
          {distance && <span className="ml-2 text-xs">({distance} from stadium)</span>}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {amenities.map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-sm text-morocco-green">
            <Hotel className="h-4 w-4 mr-1" />
            <span>Official World Cup Partner</span>
          </div>
          
          <Button className="bg-morocco-red hover:bg-red-700">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
