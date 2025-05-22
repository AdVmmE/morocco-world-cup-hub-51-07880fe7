import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStadium } from '@/hooks/useStadiums';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import { useMatches } from '@/hooks/useMatches';
import StadiumMap from '@/components/maps/StadiumMap';

// Import Leaflet CSS to ensure it's loaded
import 'leaflet/dist/leaflet.css';

const StadiumDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const {
    data: stadium,
    isLoading: stadiumLoading,
    error: stadiumError,
    refetch: refetchStadium
  } = useStadium(id);
  
  const {
    data: stadiumMatches,
    isLoading: matchesLoading,
    error: matchesError
  } = useMatches({ stadiumId: id });

  if (stadiumLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (stadiumError || !stadium) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <ErrorDisplay onRetry={() => refetchStadium()} message="Failed to load stadium details" />
          <div className="mt-8 text-center">
            <Button asChild className="bg-morocco-green hover:bg-green-700">
              <Link to="/stadiums">Back to Stadiums</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative">
        <div className="h-80 bg-gray-300 relative">
          <img 
            src={stadium.image} 
            alt={stadium.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-40"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 left-4"
              asChild
            >
              <Link to="/stadiums">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Stadiums
              </Link>
            </Button>
            
            <div className="mb-6 mt-6 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{stadium.name}</h1>
                  <p className="text-lg text-gray-600">{stadium.city}, Morocco</p>
                </div>
                <Badge className={`mt-2 md:mt-0 self-start md:self-auto ${
                  stadium.status === 'Operational' ? 'bg-green-500' : 
                  stadium.status === 'Under Construction' ? 'bg-yellow-500' : 
                  'bg-blue-500'
                } text-white`}>
                  {stadium.status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-morocco-red mb-2">{stadium.capacity.toLocaleString()}</h3>
                  <p className="text-gray-500">Seating Capacity</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-morocco-green mb-2">{stadium.matches}</h3>
                  <p className="text-gray-500">World Cup Matches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-3xl font-bold text-morocco-gold mb-2">{stadium.progress}%</h3>
                  <p className="text-gray-500">Completion</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About the Stadium</h2>
              <p className="text-gray-700 leading-relaxed">{stadium.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Stadium Features</h2>
              <div className="flex flex-wrap gap-2">
                {stadium.features.map((feature, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Matches Schedule</h2>
              {matchesLoading ? (
                <LoadingSpinner />
              ) : matchesError ? (
                <ErrorDisplay message="Failed to load match schedule" />
              ) : stadiumMatches && stadiumMatches.length > 0 ? (
                <div className="space-y-4">
                  {stadiumMatches.map((match) => (
                    <Card key={match.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-right mr-3">
                              <p className="font-bold">{match.homeTeam}</p>
                              <p className="text-sm text-gray-500">Home</p>
                            </div>
                            <div className="text-center mx-3">
                              <p className="font-bold">vs</p>
                            </div>
                            <div className="text-left ml-3">
                              <p className="font-bold">{match.awayTeam}</p>
                              <p className="text-sm text-gray-500">Away</p>
                            </div>
                          </div>
                          <div>
                            <p>{new Date(match.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">{match.time}</p>
                          </div>
                          <div>
                            <Badge>{match.group || match.round || "TBD"}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No matches scheduled yet.</p>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Stadium Location</h2>
              <div className="rounded-lg overflow-hidden mb-4 h-[400px]">
                {stadium && (
                  <StadiumMap stadiums={[stadium]} height="100%" />
                )}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Coordinates: {stadium.coordinates[0]}, {stadium.coordinates[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StadiumDetail;
