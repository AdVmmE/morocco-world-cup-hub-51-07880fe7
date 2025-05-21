
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Info, Map, News, Ticket } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorldCupCountdown from '@/components/WorldCupCountdown';

// Mock data for stadiums
const stadiums = [
  {
    id: 'grand-stade-casablanca',
    name: 'Grand Stade de Casablanca',
    city: 'Casablanca',
    capacity: 93000,
    image: '/placeholder.svg',
    status: 'Under Construction',
    progress: 65,
  },
  {
    id: 'stade-moulay-abdallah',
    name: 'Stade Moulay Abdallah',
    city: 'Rabat',
    capacity: 52000,
    image: '/placeholder.svg',
    status: 'Renovation Planned',
    progress: 30,
  },
  {
    id: 'grand-stade-agadir',
    name: 'Grand Stade d\'Agadir',
    city: 'Agadir',
    capacity: 45480,
    image: '/placeholder.svg',
    status: 'Operational',
    progress: 100,
  },
  {
    id: 'stade-marrakech',
    name: 'Stade de Marrakech',
    city: 'Marrakech',
    capacity: 45240,
    image: '/placeholder.svg',
    status: 'Operational',
    progress: 100,
  },
];

// Mock data for matches
const upcomingMatches = [
  {
    id: 'match-1',
    date: 'June 10, 2030',
    time: '18:00',
    team1: 'Morocco',
    team2: 'Qualifier A1',
    venue: 'Grand Stade de Casablanca',
    type: 'Opening Match',
  },
  {
    id: 'match-2',
    date: 'June 11, 2030',
    time: '15:00',
    team1: 'Spain',
    team2: 'Qualifier B2',
    venue: 'Santiago Bernabéu',
    type: 'Group Stage',
  },
  {
    id: 'match-3',
    date: 'June 11, 2030',
    time: '18:00',
    team1: 'Portugal',
    team2: 'Qualifier C3',
    venue: 'Estádio da Luz',
    type: 'Group Stage',
  },
  {
    id: 'match-4',
    date: 'June 12, 2030',
    time: '15:00',
    team1: 'Qualifier D4',
    team2: 'Qualifier E5',
    venue: 'Stade de Marrakech',
    type: 'Group Stage',
  },
];

// Mock data for news articles
const newsArticles = [
  {
    id: 'news-1',
    title: 'Morocco Unveils Plans for New Grand Stade de Casablanca',
    date: 'January 15, 2023',
    summary: 'The Moroccan government has revealed ambitious plans for the 93,000-capacity Grand Stade de Casablanca, set to be the crown jewel of the 2030 World Cup.',
    image: '/placeholder.svg',
    category: 'Infrastructure',
  },
  {
    id: 'news-2',
    title: 'High-Speed Rail Network to Connect World Cup Host Cities',
    date: 'February 22, 2023',
    summary: 'Morocco announces expansion of its high-speed rail network to connect all World Cup host cities, enhancing transportation for the tournament.',
    image: '/placeholder.svg',
    category: 'Transportation',
  },
  {
    id: 'news-3',
    title: 'FIFA Delegation Visits Morocco to Review World Cup Preparations',
    date: 'March 10, 2023',
    summary: 'A FIFA delegation has concluded a week-long visit to Morocco, expressing satisfaction with the country\'s progress in preparing for the 2030 World Cup.',
    image: '/placeholder.svg',
    category: 'Official',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WorldCupCountdown />
      
      {/* Hero Section */}
      <section className="relative bg-morocco-pattern bg-cover bg-center py-24 md:py-32">
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-display">
              Experience the Magic of Morocco at FIFA World Cup 2030
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Join us for an unforgettable celebration of football, culture, and hospitality across Morocco, Spain, and Portugal.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-morocco-gold hover:bg-yellow-600 text-white font-bold">
                Explore Stadiums
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Ticket className="mr-2 h-5 w-5" /> View Tickets
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Host Countries */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-display">
            <span className="gradient-text">Host Countries</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
              <div className="h-48 bg-gradient-to-r from-morocco-red via-red-600 to-morocco-red flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-2">
                  <div className="w-full h-full bg-morocco-red rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17L6.12 20.5L7.72 13.88L2.92 9.26L9.56 8.38L12 2.5L14.44 8.38L21.08 9.26L16.28 13.88L17.88 20.5L12 17Z" fill="#006233"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Morocco</h3>
                <p className="text-gray-700 mb-4">
                  Experience the warm hospitality, rich culture, and stunning landscapes of Morocco,
                  featuring world-class stadiums in vibrant cities from Casablanca to Marrakech.
                </p>
                <Link to="/morocco-cities" className="text-morocco-green font-medium hover:underline">
                  Discover Morocco
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
              <div className="h-48 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                  <div className="w-20 h-20 p-3">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="6" width="20" height="12" fill="#C60B1E" />
                      <rect x="2" y="9" width="20" height="6" fill="#FFC400" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Spain</h3>
                <p className="text-gray-700 mb-4">
                  From Madrid to Barcelona, Spain offers iconic football venues with a
                  passionate fan base and a country steeped in footballing tradition and success.
                </p>
                <Link to="/spain-cities" className="text-morocco-green font-medium hover:underline">
                  Discover Spain
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
              <div className="h-48 bg-gradient-to-r from-green-600 via-red-600 to-green-600 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                  <div className="w-20 h-20 p-3">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="6" width="8" height="12" fill="#006600" />
                      <rect x="10" y="6" width="12" height="12" fill="#FF0000" />
                      <circle cx="10" cy="12" r="4" fill="#FFC400" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Portugal</h3>
                <p className="text-gray-700 mb-4">
                  Portugal combines beautiful coastal cities with modern stadiums,
                  offering visitors a blend of rich history and contemporary football venues.
                </p>
                <Link to="/portugal-cities" className="text-morocco-green font-medium hover:underline">
                  Discover Portugal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Sections */}
      <section className="py-16 pattern-bg">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="stadiums" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-4 h-auto">
                <TabsTrigger value="stadiums" className="flex flex-col items-center px-3 py-2 data-[state=active]:text-morocco-red">
                  <Map className="h-5 w-5 mb-1" />
                  <span className="text-xs">Stadiums</span>
                </TabsTrigger>
                <TabsTrigger value="matches" className="flex flex-col items-center px-3 py-2 data-[state=active]:text-morocco-red">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs">Matches</span>
                </TabsTrigger>
                <TabsTrigger value="news" className="flex flex-col items-center px-3 py-2 data-[state=active]:text-morocco-red">
                  <News className="h-5 w-5 mb-1" />
                  <span className="text-xs">News</span>
                </TabsTrigger>
                <TabsTrigger value="about" className="flex flex-col items-center px-3 py-2 data-[state=active]:text-morocco-red">
                  <Info className="h-5 w-5 mb-1" />
                  <span className="text-xs">About</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Stadiums Tab */}
            <TabsContent value="stadiums" className="animate-fade-in">
              <h2 className="text-2xl font-bold text-center mb-8">
                State-of-the-Art Stadiums in Morocco
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stadiums.map((stadium) => (
                  <Card key={stadium.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                      <p className="text-sm text-gray-500 mb-2">{stadium.city}, Morocco</p>
                      <div className="flex justify-between items-center text-sm">
                        <span>Capacity: {stadium.capacity.toLocaleString()}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-morocco-green h-2.5 rounded-full" 
                            style={{ width: `${stadium.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/stadiums">
                  <Button variant="outline" className="border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white">
                    View All Stadiums
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* Matches Tab */}
            <TabsContent value="matches" className="animate-fade-in">
              <h2 className="text-2xl font-bold text-center mb-8">
                Upcoming Matches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingMatches.map((match) => (
                  <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm bg-morocco-red/10 text-morocco-red px-3 py-1 rounded-full">
                          {match.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {match.date} • {match.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                            {match.team1 === 'Morocco' ? (
                              <span className="text-morocco-red text-xs">MAR</span>
                            ) : (
                              <span className="text-xs">{match.team1.substring(0, 3)}</span>
                            )}
                          </div>
                          <span className="font-medium">{match.team1}</span>
                        </div>
                        <span className="text-sm font-bold">VS</span>
                        <div className="flex items-center">
                          <span className="font-medium">{match.team2}</span>
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center ml-2">
                            <span className="text-xs">{match.team2.substring(0, 3)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center justify-center">
                        <Map className="h-4 w-4 mr-1" />
                        {match.venue}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/matches">
                  <Button variant="outline" className="border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white">
                    View Complete Schedule
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* News Tab */}
            <TabsContent value="news" className="animate-fade-in">
              <h2 className="text-2xl font-bold text-center mb-8">
                Latest News & Updates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-morocco-red text-white">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{article.summary}</p>
                      <Link to={`/news/${article.id}`} className="text-morocco-green font-medium hover:underline">
                        Read More
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/news">
                  <Button variant="outline" className="border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white">
                    View All News
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* About Tab */}
            <TabsContent value="about" className="animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">
                  About FIFA World Cup 2030 in Morocco
                </h2>
                
                <div className="prose prose-lg mx-auto">
                  <p>
                    The 2030 FIFA World Cup will be a historic tournament hosted jointly by Morocco, Spain, and Portugal,
                    marking the first time the prestigious event is held across two continents - Africa and Europe.
                    This edition celebrates the centenary of the FIFA World Cup, which began in 1930.
                  </p>
                  
                  <p>
                    For Morocco, this represents a crowning achievement after previous bids,
                    showcasing the nation's commitment to football and its world-class infrastructure.
                    The tournament will feature matches across multiple Moroccan cities, including Casablanca, 
                    Rabat, Marrakech, Fez, Tangier, and Agadir.
                  </p>
                  
                  <p>
                    The centerpiece of Morocco's hosting will be the magnificent Grand Stade de Casablanca,
                    a state-of-the-art 93,000-seat stadium that will host the opening ceremony and key matches.
                    Fans from around the world will experience not only world-class football but also Morocco's
                    rich culture, cuisine, and legendary hospitality.
                  </p>
                  
                  <div className="flex justify-center mt-6">
                    <Link to="/about">
                      <Button className="bg-morocco-green hover:bg-green-700">
                        Learn More About Morocco 2030
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Ticket & Services Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-display">
            <span className="gradient-text">Plan Your World Cup Experience</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tickets Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-56 bg-fifa bg-opacity-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-40 transition-opacity"></div>
                <Ticket className="h-24 w-24 text-white group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Match Tickets</h3>
                <p className="text-gray-700 mb-4">
                  Secure your seats for the FIFA World Cup 2030 matches across Morocco's world-class stadiums.
                  Various ticket categories available to suit every budget.
                </p>
                <Link to="/tickets">
                  <Button className="bg-morocco-red hover:bg-red-700 w-full">
                    View Ticket Options
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Hotels Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-56 bg-morocco-green bg-opacity-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-40 transition-opacity"></div>
                <svg className="h-24 w-24 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Hotel Reservations</h3>
                <p className="text-gray-700 mb-4">
                  Find and book accommodation in Morocco's host cities, from luxury hotels to traditional riads,
                  with options for every preference and budget.
                </p>
                <Link to="/hotels">
                  <Button className="bg-morocco-green hover:bg-green-700 w-full">
                    Browse Hotels
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Transportation Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-56 bg-morocco-gold bg-opacity-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-40 transition-opacity"></div>
                <svg className="h-24 w-24 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Transportation & Tours</h3>
                <p className="text-gray-700 mb-4">
                  Explore transportation options between cities and stadium transfers,
                  plus curated tours to experience Morocco's cultural treasures.
                </p>
                <Link to="/transportation">
                  <Button className="bg-morocco-gold hover:bg-yellow-600 w-full text-white">
                    Discover Services
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-4">
              Create an account to enjoy personalized features and seamless booking.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-fifa hover:bg-blue-900">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-morocco-red to-morocco-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for the latest updates on the Morocco 2030 World Cup,
              including ticket releases, stadium progress, and special events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-morocco-gold"
              />
              <Button className="bg-morocco-gold hover:bg-yellow-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
