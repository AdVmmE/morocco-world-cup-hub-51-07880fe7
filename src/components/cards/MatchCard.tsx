
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Star } from "lucide-react";
import { Link } from 'react-router-dom';

interface MatchCardProps {
  id: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  stage: string;
  group?: string | null;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const MatchCard = ({ 
  id, 
  team1, 
  team2, 
  date, 
  time, 
  venue, 
  city, 
  stage, 
  group, 
  isFavorite = false,
  onToggleFavorite
}: MatchCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm bg-morocco-red/10 text-morocco-red px-3 py-1 rounded-full">
            {group ? `${stage} - ${group}` : stage}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {date} • {time}
            </span>
            {onToggleFavorite && (
              <button 
                onClick={() => onToggleFavorite(id)} 
                className="focus:outline-none"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star 
                  className={`h-5 w-5 ${isFavorite ? 'text-morocco-gold fill-morocco-gold' : 'text-gray-300'}`}
                />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-2">
              {team1 === 'Morocco' ? (
                <span className="text-morocco-red text-xs font-bold">MAR</span>
              ) : team1 === 'Spain' ? (
                <span className="text-red-600 text-xs font-bold">ESP</span>
              ) : team1 === 'Portugal' ? (
                <span className="text-green-600 text-xs font-bold">POR</span>
              ) : (
                <span className="text-xs font-medium">{team1.substring(0, 3)}</span>
              )}
            </div>
            <span className="font-medium">{team1}</span>
          </div>
          <span className="text-sm font-bold">VS</span>
          <div className="flex items-center">
            <span className="font-medium">{team2}</span>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center ml-2">
              {team2 === 'Morocco' ? (
                <span className="text-morocco-red text-xs font-bold">MAR</span>
              ) : team2 === 'Spain' ? (
                <span className="text-red-600 text-xs font-bold">ESP</span>
              ) : team2 === 'Portugal' ? (
                <span className="text-green-600 text-xs font-bold">POR</span>
              ) : (
                <span className="text-xs font-medium">{team2.substring(0, 3)}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center justify-center mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          {venue}, {city}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            className="text-sm border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white"
            asChild
          >
            <Link to={`/match/${id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
