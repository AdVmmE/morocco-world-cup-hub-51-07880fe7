
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, Compass } from "lucide-react";

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  tags: string[];
  dateOptions?: string[];
}

const TourCard = ({ 
  id, 
  title, 
  image, 
  location, 
  duration, 
  price, 
  rating, 
  tags,
  dateOptions 
}: TourCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={`Tour: ${title} in ${location}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-3 right-3 bg-morocco-gold">
          ${price}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        
        <div className="flex items-center mb-3">
          <MapPin className="h-4 w-4 mr-1 text-morocco-red" />
          <span className="text-sm">{location}</span>
          <div className="ml-auto flex items-center">
            <span className="bg-morocco-green text-white rounded-full py-0.5 px-2 text-xs font-bold">
              {rating}/5
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-sm mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {dateOptions && dateOptions.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center text-sm mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Available dates:</span>
            </div>
            <select className="w-full border rounded py-1 px-2 text-sm">
              {dateOptions.map((date, index) => (
                <option key={index}>{date}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-sm text-morocco-green">
            <Compass className="h-4 w-4 mr-1" />
            <span>World Cup Special</span>
          </div>
          
          <Button className="bg-morocco-blue hover:bg-blue-700">
            Book Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;
