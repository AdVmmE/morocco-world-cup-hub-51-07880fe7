
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronDown, Filter, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for matches
const matchesData = [
  // Group Stage
  {
    id: 'match-1',
    date: 'June 10, 2030',
    time: '18:00',
    team1: 'Morocco',
    team2: 'Qualifier A1',
    venue: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    stage: 'Group Stage',
    group: 'Group A',
  },
  {
    id: 'match-2',
    date: 'June 11, 2030',
    time: '15:00',
    team1: 'Spain',
    team2: 'Qualifier B2',
    venue: 'Santiago Bernabéu',
    city: 'Madrid',
    stage: 'Group Stage',
    group: 'Group B',
  },
  {
    id: 'match-3',
    date: 'June 11, 2030',
    time: '18:00',
    team1: 'Portugal',
    team2: 'Qualifier C3',
    venue: 'Estádio da Luz',
    city: 'Lisbon',
    stage: 'Group Stage',
    group: 'Group C',
  },
  {
    id: 'match-4',
    date: 'June 12, 2030',
    time: '15:00',
    team1: 'Qualifier D4',
    team2: 'Qualifier E5',
    venue: 'Stade de Marrakech',
    city: 'Marrakech',
    stage: 'Group Stage',
    group: 'Group D',
  },
  {
    id: 'match-5',
    date: 'June 12, 2030',
    time: '18:00',
    team1: 'Qualifier A2',
    team2: 'Qualifier A3',
    venue: 'Stade Moulay Abdallah',
    city: 'Rabat',
    stage: 'Group Stage',
    group: 'Group A',
  },
  {
    id: 'match-6',
    date: 'June 13, 2030',
    time: '15:00',
    team1: 'Qualifier B1',
    team2: 'Qualifier B3',
    venue: 'Grand Stade de Tanger',
    city: 'Tangier',
    stage: 'Group Stage',
    group: 'Group B',
  },
  {
    id: 'match-7',
    date: 'June 13, 2030',
    time: '18:00',
    team1: 'Qualifier C1',
    team2: 'Qualifier C2',
    venue: 'Stade de Fès',
    city: 'Fez',
    stage: 'Group Stage',
    group: 'Group C',
  },
  {
    id: 'match-8',
    date: 'June 14, 2030',
    time: '15:00',
    team1: 'Morocco',
    team2: 'Qualifier A3',
    venue: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    stage: 'Group Stage',
    group: 'Group A',
  },
  
  // Round of 16
  {
    id: 'match-49',
    date: 'June 28, 2030',
    time: '18:00',
    team1: 'Winner Group A',
    team2: 'Runner-up Group B',
    venue: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    stage: 'Round of 16',
    group: null,
  },
  {
    id: 'match-50',
    date: 'June 29, 2030',
    time: '15:00',
    team1: 'Winner Group C',
    team2: 'Runner-up Group D',
    venue: 'Stade de Marrakech',
    city: 'Marrakech',
    stage: 'Round of 16',
    group: null,
  },
  
  // Quarter Finals
  {
    id: 'match-57',
    date: 'July 3, 2030',
    time: '18:00',
    team1: 'Winner Match 49',
    team2: 'Winner Match 50',
    venue: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    stage: 'Quarter Finals',
    group: null,
  },
  
  // Semi Finals
  {
    id: 'match-61',
    date: 'July 7, 2030',
    time: '21:00',
    team1: 'Winner Match 57',
    team2: 'Winner Match 58',
    venue: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    stage: 'Semi Finals',
    group: null,
  },
  
  // Final
  {
    id: 'match-64',
    date: 'July 13, 2030',
    time: '18:00',
    team1: 'Winner Match 61',
    team2: 'Winner Match 62',
    venue: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    stage: 'Final',
    group: null,
  },
];

// All available stages
const stages = ['All Stages', 'Group Stage', 'Round of 16', 'Quarter Finals', 'Semi Finals', 'Final'];

// All available venues
const venues = ['All Venues', 'Grand Stade de Casablanca', 'Stade de Marrakech', 'Stade Moulay Abdallah', 'Grand Stade de Tanger', 'Stade de Fès', 'Santiago Bernabéu', 'Estádio da Luz'];

// All available teams
const teams = ['All Teams', 'Morocco', 'Spain', 'Portugal', 'Qualifier A1', 'Qualifier A2', 'Qualifier A3', 'Qualifier B1', 'Qualifier B2', 'Qualifier B3', 'Qualifier C1', 'Qualifier C2', 'Qualifier C3', 'Qualifier D4', 'Qualifier E5'];

const Matches = () => {
  const [selectedStage, setSelectedStage] = useState('All Stages');
  const [selectedVenue, setSelectedVenue] = useState('All Venues');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Filter matches based on selected filters
  const filteredMatches = matchesData.filter((match) => {
    const stageMatch = selectedStage === 'All Stages' || match.stage === selectedStage;
    const venueMatch = selectedVenue === 'All Venues' || match.venue === selectedVenue;
    const teamMatch = selectedTeam === 'All Teams' || match.team1 === selectedTeam || match.team2 === selectedTeam;
    const favoriteMatch = !showFavorites || favorites.includes(match.id);
    
    return stageMatch && venueMatch && teamMatch && favoriteMatch;
  });
  
  // Group matches by stage for the Stages tab
  const matchesByStage = stages.slice(1).map(stage => ({
    stage,
    matches: matchesData.filter(match => match.stage === stage)
  }));
  
  // Toggle favorite status of a match
  const toggleFavorite = (matchId: string) => {
    if (favorites.includes(matchId)) {
      setFavorites(favorites.filter(id => id !== matchId));
    } else {
      setFavorites([...favorites, matchId]);
    }
  };
  
  // Function to render a match card
  const renderMatchCard = (match: typeof matchesData[0]) => {
    const isFavorite = favorites.includes(match.id);
    
    return (
      <Card key={match.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm bg-morocco-red/10 text-morocco-red px-3 py-1 rounded-full">
              {match.group ? `${match.stage} - ${match.group}` : match.stage}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {match.date} • {match.time}
              </span>
              <button 
                onClick={() => toggleFavorite(match.id)} 
                className="focus:outline-none"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star 
                  className={`h-5 w-5 ${isFavorite ? 'text-morocco-gold fill-morocco-gold' : 'text-gray-300'}`}
                />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                {match.team1 === 'Morocco' ? (
                  <span className="text-morocco-red text-xs font-bold">MAR</span>
                ) : match.team1 === 'Spain' ? (
                  <span className="text-red-600 text-xs font-bold">ESP</span>
                ) : match.team1 === 'Portugal' ? (
                  <span className="text-green-600 text-xs font-bold">POR</span>
                ) : (
                  <span className="text-xs font-medium">{match.team1.substring(0, 3)}</span>
                )}
              </div>
              <span className="font-medium">{match.team1}</span>
            </div>
            <span className="text-sm font-bold">VS</span>
            <div className="flex items-center">
              <span className="font-medium">{match.team2}</span>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center ml-2">
                {match.team2 === 'Morocco' ? (
                  <span className="text-morocco-red text-xs font-bold">MAR</span>
                ) : match.team2 === 'Spain' ? (
                  <span className="text-red-600 text-xs font-bold">ESP</span>
                ) : match.team2 === 'Portugal' ? (
                  <span className="text-green-600 text-xs font-bold">POR</span>
                ) : (
                  <span className="text-xs font-medium">{match.team2.substring(0, 3)}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-1" />
            {match.venue}, {match.city}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" className="text-sm border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-morocco-red to-morocco-green py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Match Schedule</h1>
          <p className="text-lg">
            Find and filter all matches of the FIFA World Cup 2030 in Morocco, Spain, and Portugal
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calendar">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="calendar" className="px-6">Calendar View</TabsTrigger>
              <TabsTrigger value="stages" className="px-6">Stages</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Calendar View Tab */}
          <TabsContent value="calendar">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Stage Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      {selectedStage} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {stages.map((stage) => (
                      <DropdownMenuItem 
                        key={stage} 
                        onClick={() => setSelectedStage(stage)}
                        className={stage === selectedStage ? "bg-muted" : ""}
                      >
                        {stage}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Venue Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      {selectedVenue} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {venues.map((venue) => (
                      <DropdownMenuItem 
                        key={venue} 
                        onClick={() => setSelectedVenue(venue)}
                        className={venue === selectedVenue ? "bg-muted" : ""}
                      >
                        {venue}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Team Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      {selectedTeam} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {teams.map((team) => (
                      <DropdownMenuItem 
                        key={team} 
                        onClick={() => setSelectedTeam(team)}
                        className={team === selectedTeam ? "bg-muted" : ""}
                      >
                        {team}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Favorites Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="favorites" 
                    checked={showFavorites}
                    onCheckedChange={(checked) => setShowFavorites(checked as boolean)} 
                  />
                  <label
                    htmlFor="favorites"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show favorites only
                  </label>
                </div>
                
                {/* Reset Filters */}
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSelectedStage('All Stages');
                    setSelectedVenue('All Venues');
                    setSelectedTeam('All Teams');
                    setShowFavorites(false);
                  }}
                  className="ml-auto"
                >
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
              </div>
            </div>
            
            {filteredMatches.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No matches found</h3>
                <p className="text-gray-500">
                  Try changing your filters or clear them to see all matches.
                </p>
              </div>
            ) : (
              <>
                <div className="text-gray-500 mb-4">
                  Showing {filteredMatches.length} matches
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMatches.map(renderMatchCard)}
                </div>
              </>
            )}
          </TabsContent>
          
          {/* Stages View Tab */}
          <TabsContent value="stages">
            {matchesByStage.map(({ stage, matches }) => (
              <div key={stage} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-morocco-red/20">
                  {stage}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {matches.map(renderMatchCard)}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Match schedule will be updated as teams qualify for the tournament.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Matches;
