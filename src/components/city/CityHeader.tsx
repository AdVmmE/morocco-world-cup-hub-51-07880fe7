
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HostCity } from "@/api/types/hostCities";

interface CityHeaderProps {
  city: HostCity;
  cityImage: string;
}

const CityHeader = ({ city, cityImage }: CityHeaderProps) => {
  return (
    <div className="relative">
      <div className="h-80 bg-gray-300 relative">
        <img 
          src={cityImage} 
          alt={city.name} 
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
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="mb-6 mt-6 md:mt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{city.name}</h1>
                <p className="text-lg text-gray-600">Host City, Morocco</p>
              </div>
              <Badge className="mt-2 md:mt-0 self-start md:self-auto bg-morocco-red text-white">
                {city.stadium}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityHeader;
