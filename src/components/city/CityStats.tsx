
import { Card, CardContent } from "@/components/ui/card";
import { HostCity } from "@/api/types/hostCities";

interface CityStatsProps {
  city: HostCity;
}

const CityStats = ({ city }: CityStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold text-morocco-red mb-2">{city.population}M</h3>
          <p className="text-gray-500">Population</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold text-morocco-green mb-2">{city.stadium}</h3>
          <p className="text-gray-500">Main Stadium</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-3xl font-bold text-morocco-gold mb-2">{city.distanceFromAirport} km</h3>
          <p className="text-gray-500">Airport Distance</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CityStats;
