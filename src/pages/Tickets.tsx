
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Check, HelpCircle, Info, Ticket } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

// Mock data for ticket categories
const ticketCategories = [
  {
    id: 'category-1',
    name: 'Category 1',
    description: 'Premium seats with the best views, located in the main stand along the sidelines.',
    features: ['Best viewing positions', 'Padded seats', 'Optimal camera views', 'Easy access to premium facilities'],
    groupStagePrice: 200,
    roundOf16Price: 275,
    quarterFinalsPrice: 400,
    semiFinalsPrice: 850,
    finalPrice: 1900,
    color: 'bg-morocco-red',
    textColor: 'text-morocco-red',
    availability: 'Limited',
  },
  {
    id: 'category-2',
    name: 'Category 2',
    description: 'Great seats behind the goals and in the corners, offering excellent views of the action.',
    features: ['Good viewing angles', 'Behind the goals and corners', 'Access to standard amenities'],
    groupStagePrice: 135,
    roundOf16Price: 185,
    quarterFinalsPrice: 275,
    semiFinalsPrice: 600,
    finalPrice: 1250,
    color: 'bg-morocco-gold',
    textColor: 'text-morocco-gold',
    availability: 'Available',
  },
  {
    id: 'category-3',
    name: 'Category 3',
    description: 'Affordable seats in the upper tiers offering panoramic views of the entire stadium and match.',
    features: ['Upper tier seating', 'Economical option', 'Panoramic views'],
    groupStagePrice: 80,
    roundOf16Price: 120,
    quarterFinalsPrice: 180,
    semiFinalsPrice: 400,
    finalPrice: 750,
    color: 'bg-morocco-green',
    textColor: 'text-morocco-green',
    availability: 'Available',
  },
];

// Mock data for special packages
const specialPackages = [
  {
    id: 'team-specific-series',
    name: 'Team Specific Series',
    description: 'Follow your favorite team throughout their World Cup journey with guaranteed tickets to all their matches.',
    price: 'From $795',
    features: [
      'All group stage matches for one team',
      'Priority access to knockout matches if team advances',
      'Team merchandise pack',
      'Pre-match fan zone access',
    ],
    availability: 'Limited',
    image: '/placeholder.svg',
    popular: true,
  },
  {
    id: 'venue-series',
    name: 'Venue Series',
    description: 'Experience all matches at a specific stadium throughout the tournament, perfect for fans based in one city.',
    price: 'From $695',
    features: [
      'Tickets to all matches at your chosen venue',
      'Same seat guaranteed for all matches',
      'Stadium tour',
      'Local city experience package',
    ],
    availability: 'Available',
    image: '/placeholder.svg',
    popular: false,
  },
  {
    id: 'finals-series',
    name: 'Finals Series',
    description: 'Witness the climax of the World Cup with this premium package for the quarter-finals onwards.',
    price: 'From $2995',
    features: [
      'Quarter-finals ticket',
      'Semi-finals ticket',
      'Final match ticket',
      'Exclusive access to player appearances',
      'Trophy photo opportunity',
    ],
    availability: 'Very Limited',
    image: '/placeholder.svg',
    popular: true,
  },
];

// Mock data for FAQs
const faqs = [
  {
    question: 'When will tickets go on sale?',
    answer: 'Ticket sales for the 2030 FIFA World Cup in Morocco, Spain, and Portugal will begin approximately 18 months before the tournament, with different sales phases. FIFA typically launches the first ticket sales phase about 500 days before the opening match. For Morocco 2030, this would be around early 2029. Subscribe to our newsletter to receive notifications when sales begin.',
  },
  {
    question: 'How can I purchase tickets?',
    answer: 'Tickets will be available through the official FIFA ticketing platform. Fans must create an account on FIFA.com to access the ticket portal. Tickets will be sold directly by FIFA, not through third-party websites. This official website will provide links to the official ticketing platform when sales begin.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'The official ticketing platform will accept major credit cards (Visa, Mastercard), as well as selected local payment methods. FIFA typically partners with Visa as the official payment services partner, and Visa cards may be given preference in certain ticket sales phases.',
  },
  {
    question: 'Are there any age restrictions for tickets?',
    answer: 'Children of all ages require a ticket to attend matches. FIFA typically offers special child tickets at reduced prices for certain matches and categories. Children under 3 years may be required to sit on a parent\'s lap if a separate seat is not purchased.',
  },
  {
    question: 'Can I resell my tickets if I cannot attend?',
    answer: 'FIFA usually provides an official resale platform for fans who cannot attend matches. Reselling tickets through unofficial channels is prohibited and may result in ticket cancellation. More details about the official resale platform will be announced closer to the tournament.',
  },
  {
    question: 'Will there be accessible seating for disabled fans?',
    answer: 'Yes, all stadiums will offer accessible seating for disabled fans and their companions. These special tickets can be requested during the ticket sales process. Documentation may be required to verify eligibility for accessible seating.',
  },
];

const Tickets = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleTicketInterest = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "Ticket Interest Registered",
      description: `You'll be notified when ${category} tickets become available for purchase.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-morocco-red to-morocco-green py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Match Tickets</h1>
          <p className="text-lg">
            Secure your seats for the FIFA World Cup 2030 matches in Morocco, Spain, and Portugal
          </p>
        </div>
      </div>
      
      {/* Ticket Information Notice */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
        <div className="container mx-auto px-4 flex items-start md:items-center">
          <Info className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
          <p className="text-amber-700">
            <strong>Important Notice:</strong> Official ticket sales will begin in early 2029. Current information is subject to change.
            Register your interest now to receive priority notifications when sales officially open.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="categories">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="categories" className="px-6">Ticket Categories</TabsTrigger>
              <TabsTrigger value="packages" className="px-6">Special Packages</TabsTrigger>
              <TabsTrigger value="faq" className="px-6">FAQ</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Ticket Categories Tab */}
          <TabsContent value="categories" className="animate-fade-in">
            <div className="max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold mb-2">Ticket Categories</h2>
              <p className="text-gray-600">
                FIFA World Cup tickets are divided into categories based on seat location within the stadium.
                Each category offers a different viewing experience and price point.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ticketCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden border-t-4 hover:shadow-lg transition-shadow" style={{ borderTopColor: category.color }}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-xl ${category.textColor}`}>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1 mb-4">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-morocco-green" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Group Stage:</span>
                        <span className="font-bold">${category.groupStagePrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Round of 16:</span>
                        <span className="font-bold">${category.roundOf16Price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Quarter Finals:</span>
                        <span className="font-bold">${category.quarterFinalsPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Semi Finals:</span>
                        <span className="font-bold">${category.semiFinalsPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span>Final:</span>
                        <span className="font-bold">${category.finalPrice}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        category.availability === 'Available' ? 'bg-green-100 text-green-800' : 
                        category.availability === 'Limited' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {category.availability}
                      </span>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className={`${category.textColor} border-current hover:bg-gray-50`}
                              onClick={() => handleTicketInterest(category.name)}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Register Interest
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Be notified when tickets go on sale</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Stadium Seating Diagram */}
            <div className="mt-16">
              <h3 className="text-xl font-bold mb-4">Stadium Seating Categories</h3>
              <div className="bg-white shadow-sm rounded-lg p-4 border">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="max-w-lg w-full p-6">
                    <div className="w-full h-64 bg-gray-200 rounded-full flex flex-col items-center justify-center relative">
                      <div className="w-3/4 h-48 bg-gray-300 rounded-full flex flex-col items-center justify-center">
                        <div className="w-1/2 h-32 bg-gray-400 rounded-full flex flex-col items-center justify-center">
                          <div className="w-1/4 h-16 bg-green-600 rounded-full"></div>
                        </div>
                        
                        {/* Category Labels */}
                        <div className="absolute inset-x-0 top-12 text-center">
                          <span className="inline-block bg-morocco-red text-white text-xs px-2 py-1 rounded-full">
                            Category 1
                          </span>
                        </div>
                        <div className="absolute left-1/4 right-1/4 top-24 text-center">
                          <span className="inline-block bg-morocco-gold text-white text-xs px-2 py-1 rounded-full">
                            Category 2
                          </span>
                        </div>
                        <div className="absolute left-1/3 right-1/3 top-36 text-center">
                          <span className="inline-block bg-morocco-green text-white text-xs px-2 py-1 rounded-full">
                            Category 3
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4 text-sm text-gray-500">
                      Simplified stadium seating diagram. Actual layouts may vary by venue.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accessibility Information */}
            <div className="mt-12 bg-white shadow-sm rounded-lg p-6 border">
              <div className="flex items-start">
                <div className="mr-4 bg-morocco-blue rounded-full p-2 text-white">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Accessible Seating</h3>
                  <p className="text-gray-600 mb-4">
                    All stadiums offer wheelchair accessible seating and facilities for disabled fans and their companions.
                    These tickets will be available in all price categories, subject to availability.
                  </p>
                  <Button variant="outline" className="text-morocco-green border-morocco-green hover:bg-green-50">
                    Learn About Accessibility
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Special Packages Tab */}
          <TabsContent value="packages" className="animate-fade-in">
            <div className="max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold mb-2">Special Ticket Packages</h2>
              <p className="text-gray-600">
                Enhance your World Cup experience with our special ticket packages designed for 
                the ultimate fan experience. Follow your team, explore a host city, or witness the
                tournament's most exciting matches.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialPackages.map((pkg) => (
                <Card key={pkg.id} className={`overflow-hidden ${pkg.popular ? 'ring-2 ring-morocco-gold' : ''}`}>
                  {pkg.popular && (
                    <div className="bg-morocco-gold text-white text-xs font-bold py-1 text-center">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="aspect-video relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        pkg.availability === 'Available' ? 'bg-green-500 text-white' : 
                        pkg.availability === 'Limited' ? 'bg-yellow-500 text-white' : 
                        'bg-red-500 text-white'
                      }`}>
                        {pkg.availability}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    
                    <ul className="space-y-1 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-morocco-green" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">{pkg.price}</span>
                      <Button 
                        className="bg-morocco-gold hover:bg-yellow-600 text-white"
                        onClick={() => handleTicketInterest(pkg.name)}
                      >
                        Register Interest
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Hospitality Packages */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Premium Hospitality Packages</h3>
              
              <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <h4 className="text-2xl font-bold mb-4">FIFA Hospitality Experience</h4>
                    <p className="mb-4 text-gray-300">
                      Experience the FIFA World Cup 2030 in luxury with official hospitality packages.
                      Enjoy premium seating, gourmet dining, exclusive lounges, and VIP services throughout the tournament.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-morocco-gold" />
                        <span>Premium match tickets</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-morocco-gold" />
                        <span>Gourmet pre-match dining</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-morocco-gold" />
                        <span>Exclusive lounge access</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-morocco-gold" />
                        <span>VIP stadium entrance</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-morocco-gold" />
                        <span>Premium beverage service</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-morocco-gold" />
                        <span>Gift bag with memorabilia</span>
                      </div>
                    </div>
                    <Button className="bg-morocco-gold hover:bg-yellow-600 text-black">
                      Request Information
                    </Button>
                  </div>
                  <div className="md:w-1/3 bg-gray-800 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="inline-block rounded-full p-3 bg-morocco-gold/20 mb-4">
                        <Ticket className="h-16 w-16 text-morocco-gold" />
                      </div>
                      <div className="font-bold text-2xl mb-2">FROM $12,000</div>
                      <p className="text-sm text-gray-400">per person, per match</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq" className="animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="mb-8">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-3">Still have questions?</h3>
                <p className="text-gray-600 mb-4">
                  Our team is ready to help you with any additional questions about tickets,
                  packages, or the purchasing process.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-morocco-red hover:bg-red-700">
                    Contact Support
                  </Button>
                  <Button variant="outline">
                    Read Ticket Terms & Conditions
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-morocco-red/10 to-morocco-green/10 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated on Ticket Sales</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive the latest information about ticket sales phases,
              special packages, and exclusive offers for the FIFA World Cup 2030.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md flex-grow border focus:outline-none focus:ring-2 focus:ring-morocco-green"
              />
              <Button className="bg-morocco-green hover:bg-green-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Official Ticketing Notice */}
        <div className="mt-12 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-morocco-red mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Official Ticketing Information</h3>
              <p className="text-gray-600 mb-4">
                This website provides preliminary information about FIFA World Cup 2030 tickets.
                Official ticket sales will be conducted exclusively through FIFA.com. Beware of
                unauthorized third-party websites offering tickets, as these may be fraudulent.
              </p>
              <p className="text-sm text-gray-500">
                All information on this page is subject to change as FIFA finalizes ticketing details closer to the tournament.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Tickets;
