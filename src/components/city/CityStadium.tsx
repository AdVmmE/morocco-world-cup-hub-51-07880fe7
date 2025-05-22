
import { Card } from "@/components/ui/card";
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HostCity } from "@/api/types/hostCities";

interface CityStadiumProps {
  city: HostCity;
}

const CityStadium = ({ city }: CityStadiumProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stadium Information</h2>
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gray-100 p-6 flex items-center justify-center">
            <Building className="h-16 w-16 text-morocco-green" />
          </div>
          <div className="md:w-2/3 p-6">
            <h3 className="font-bold text-xl mb-2">{city.stadium}</h3>
            <p className="text-gray-600 mb-4">Main venue for World Cup matches in {city.name}</p>
            <Button 
              variant="outline" 
              className="border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white"
              asChild
            >
              <Link to={`/stadiums`}>
                View Stadium Details
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CityStadium;
