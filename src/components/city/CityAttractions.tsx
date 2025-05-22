
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { HostCity } from "@/api/types/hostCities";

interface CityAttractionsProps {
  city: HostCity;
}

const CityAttractions = ({ city }: CityAttractionsProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {city.attractions.map((attraction, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <MapPin className="h-8 w-8 text-morocco-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{attraction}</h3>
                  <p className="text-sm text-gray-500">Tourist Attraction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CityAttractions;
