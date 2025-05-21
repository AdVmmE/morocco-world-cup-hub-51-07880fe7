
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for news articles
const newsArticles = [
  {
    id: 'news-1',
    title: 'Morocco Unveils Plans for New Grand Stade de Casablanca',
    date: 'January 15, 2023',
    summary: 'The Moroccan government has revealed ambitious plans for the 93,000-capacity Grand Stade de Casablanca, set to be the crown jewel of the 2030 World Cup.',
    content: 'During a ceremony attended by FIFA officials and government representatives, Morocco unveiled detailed plans for the Grand Stade de Casablanca, a state-of-the-art 93,000-seat stadium that will serve as the centerpiece of the 2030 World Cup. The stadium design features a distinctive architecture inspired by traditional Moroccan patterns and will include a partially retractable roof, VIP facilities, and cutting-edge technology.\n\nConstruction is scheduled to begin in early 2024, with completion expected by late 2028, allowing ample time for test events before the tournament. The stadium will be located on the outskirts of Casablanca, with new transportation infrastructure planned to ensure easy access.\n\n"This stadium will be a symbol of Morocco\'s passion for football and our commitment to hosting an unforgettable World Cup," said the Moroccan Minister of Sports. "We are creating a venue that honors our cultural heritage while providing the most modern facilities for players and fans."',
    image: '/placeholder.svg',
    category: 'Infrastructure',
    featured: true,
  },
  {
    id: 'news-2',
    title: 'High-Speed Rail Network to Connect World Cup Host Cities',
    date: 'February 22, 2023',
    summary: 'Morocco announces expansion of its high-speed rail network to connect all World Cup host cities, enhancing transportation for the tournament.',
    content: 'Morocco has announced a significant expansion of its high-speed rail network as part of preparations for the 2030 World Cup. The ambitious project will connect all six host cities—Casablanca, Rabat, Marrakech, Tangier, Fez, and Agadir—with modern, high-speed train service.\n\nBuilding on the success of the Al Boraq high-speed line between Tangier and Casablanca, the expanded network will reduce travel times significantly. The journey from Casablanca to Marrakech, for example, will take just 1 hour and 20 minutes, compared to the current 3 hours by conventional rail.\n\n"Transportation infrastructure is a key component of our World Cup preparation strategy," said the director of Morocco\'s national railway office. "This network will not only serve the tournament but will be a lasting legacy that benefits our country for decades to come."\n\nThe project represents an investment of approximately 40 billion dirhams ($4 billion) and is expected to be completed by 2028. In addition to improving the fan experience during the World Cup, the expanded rail network aims to boost tourism and regional development across Morocco.',
    image: '/placeholder.svg',
    category: 'Transportation',
    featured: false,
  },
  {
    id: 'news-3',
    title: 'FIFA Delegation Visits Morocco to Review World Cup Preparations',
    date: 'March 10, 2023',
    summary: 'A FIFA delegation has concluded a week-long visit to Morocco, expressing satisfaction with the country\'s progress in preparing for the 2030 World Cup.',
    content: 'A delegation of FIFA officials has completed a comprehensive week-long tour of Morocco to assess the country\'s preparations for co-hosting the 2030 World Cup. The delegation visited all six Moroccan host cities—Casablanca, Rabat, Marrakech, Tangier, Fez, and Agadir—inspecting stadium sites, transportation infrastructure, and accommodation facilities.\n\nFollowing the visit, the head of the delegation expressed optimism about Morocco\'s progress: "We are impressed by the level of commitment and the quality of planning we\'ve seen throughout our visit. Morocco has clearly taken on board the lessons from previous tournaments and is making excellent progress in its preparations."\n\nThe delegation particularly praised the integration of cultural elements into the stadium designs and the emphasis on sustainability. They also noted the significant improvements in transportation infrastructure, including the expanding high-speed rail network.\n\nMoroccan officials presented updated timelines for stadium construction and renovation, confirming that all venues will be completed at least 18 months before the tournament begins. The FIFA representatives will submit a detailed report to the FIFA Council, with recommendations for any adjustments to ensure a successful tournament.',
    image: '/placeholder.svg',
    category: 'Official',
    featured: false,
  },
  {
    id: 'news-4',
    title: 'Morocco Launches Volunteer Program for 2030 World Cup',
    date: 'April 5, 2023',
    summary: 'The Organizing Committee has launched a volunteer recruitment initiative, seeking 20,000 volunteers to support various aspects of the tournament.',
    content: 'The Morocco 2030 World Cup Organizing Committee has officially launched its volunteer program, aiming to recruit and train 20,000 individuals to support the tournament. Volunteers will play crucial roles across various functional areas, including spectator services, media operations, transportation, and cultural activities.\n\nThe program is designed to engage Morocco\'s young population, with a particular focus on university students and recent graduates. However, applications are welcome from people of all ages and backgrounds, including international volunteers who wish to contribute to the tournament\'s success.\n\n"Volunteers are the heart and soul of any major sporting event," said the volunteer program director. "They will be the face of Morocco to the world, showcasing our legendary hospitality and helping to create an unforgettable experience for visitors."\n\nThe recruitment process will take place in several phases, beginning with an online application system that opens next month. Selected candidates will undergo comprehensive training starting in 2029, covering specific role requirements, customer service, language skills, and cultural awareness.\n\nIn addition to gaining valuable experience, volunteers will receive benefits including uniforms, meals during shifts, transportation, and special access to certain World Cup events.',
    image: '/placeholder.svg',
    category: 'Community',
    featured: false,
  },
  {
    id: 'news-5',
    title: 'Morocco Integrates Cultural Heritage into World Cup Stadium Designs',
    date: 'May 12, 2023',
    summary: 'Architects reveal how Morocco\'s rich cultural heritage is being incorporated into the design of all World Cup stadiums, creating unique venues that celebrate local traditions.',
    content: 'The architectural firms responsible for Morocco\'s 2030 World Cup stadiums have revealed how they are integrating elements of the country\'s rich cultural heritage into their designs. Each stadium will feature distinctive characteristics reflecting the history and traditions of its host city, creating unique venues that offer fans more than just a sporting experience.\n\nIn Casablanca, the Grand Stade will incorporate geometric patterns inspired by traditional Moroccan zellige tilework in its façade, creating stunning visual effects as light passes through. The Marrakech stadium renovation will feature gardens and water features reminiscent of the city\'s famous riads, while the Fez venue will showcase elements of the city\'s renowned craftsmanship.\n\n"We wanted each stadium to tell a story about its city and region," explained the lead architect for the stadium program. "Visitors will experience different aspects of Moroccan culture as they travel between venues."\n\nBeyond aesthetic considerations, the designs also incorporate sustainable elements inspired by traditional Moroccan building techniques, such as natural ventilation systems and strategic shade placement to reduce energy consumption.\n\nCultural zones will be established around each stadium, featuring exhibitions, craft demonstrations, and performances that will introduce visitors to local traditions, cuisine, and arts. These areas will remain as permanent cultural centers after the tournament, contributing to the World Cup\'s lasting legacy.',
    image: '/placeholder.svg',
    category: 'Culture',
    featured: true,
  },
  {
    id: 'news-6',
    title: 'Morocco 2030 Partners with Local Universities for Sustainability Initiatives',
    date: 'June 20, 2023',
    summary: 'The World Cup Organizing Committee announces partnerships with Morocco\'s leading universities to develop and implement sustainability initiatives for the tournament.',
    content: 'The Morocco 2030 World Cup Organizing Committee has formed strategic partnerships with five of the country\'s leading universities to develop innovative sustainability initiatives for the tournament. This collaboration aims to make the 2030 World Cup one of the most environmentally responsible sports events in history while creating educational opportunities for students.\n\nUniversities involved include Mohammed V University in Rabat, Hassan II University in Casablanca, Cadi Ayyad University in Marrakech, and others across the host cities. Each institution will focus on specific aspects of sustainability, such as renewable energy implementation, water conservation, waste management, and carbon footprint reduction.\n\n"By involving our academic institutions, we\'re not only ensuring innovative approaches to sustainability but also creating valuable research and practical experience for the next generation of environmental leaders," said the Sustainability Director for Morocco 2030.\n\nProjects already under development include solar-powered systems for stadiums, advanced water recycling facilities, and a comprehensive carbon offset program. Student teams will participate in implementing these solutions and will monitor their effectiveness during and after the tournament.\n\nThe partnership also includes the development of sustainability-focused educational programs that will be integrated into university curricula, creating a legacy that extends beyond the tournament itself.',
    image: '/placeholder.svg',
    category: 'Sustainability',
    featured: false,
  },
];

// Categories for filtering
const categories = ['All Categories', 'Infrastructure', 'Transportation', 'Official', 'Community', 'Culture', 'Sustainability'];

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Filter articles based on search term and category
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Separate featured and regular articles
  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-morocco-red to-morocco-green py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">News & Updates</h1>
          <p className="text-lg">
            Stay informed with the latest news about the FIFA World Cup 2030 in Morocco
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search news articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center w-full md:w-auto">
                {selectedCategory} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category} 
                  onClick={() => setSelectedCategory(category)}
                  className={category === selectedCategory ? "bg-muted" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured News</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="aspect-video relative">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-morocco-red hover:bg-red-700">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{article.summary}</p>
                      <Button className="w-full md:w-auto bg-morocco-green hover:bg-green-700 mt-auto">
                        Read Full Article
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* All News Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No news articles found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria.
                Try adjusting your search term or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col h-full">
                    <div className="aspect-video relative">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="bg-white text-morocco-green border-morocco-green">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">{article.summary}</p>
                      <Button variant="ghost" size="sm" className="text-morocco-green hover:text-morocco-green hover:bg-green-50 p-0 justify-start">
                        Read More
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {filteredArticles.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-morocco-green text-white hover:bg-morocco-green/90">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-16 bg-morocco-pattern bg-cover bg-center rounded-lg text-white">
          <div className="bg-black bg-opacity-70 p-8 rounded-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg mb-8">
                Subscribe to our newsletter for the latest news and updates about
                the Morocco 2030 World Cup delivered directly to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 border-0 text-white placeholder:text-gray-300 focus-visible:ring-morocco-gold"
                />
                <Button className="bg-morocco-gold hover:bg-yellow-600 text-black">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm mt-4 text-gray-300">
                We'll never spam you or share your email with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
