
import { HostCity } from "@/api/types/hostCities";

interface CityDescriptionProps {
  city: HostCity;
}

const CityDescription = ({ city }: CityDescriptionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">About {city.name}</h2>
      <p className="text-gray-700 leading-relaxed">{city.description}</p>
    </div>
  );
};

export default CityDescription;
