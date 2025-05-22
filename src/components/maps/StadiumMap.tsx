
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Stadium } from '@/api/types/stadiums';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// Import Leaflet CSS directly
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface StadiumMapProps {
  stadiums: Stadium[];
  height?: string;
}

// Custom stadium icon
const stadiumIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: 'stadium-marker'
});

// Map initialization component
const MapInitializer = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

const StadiumMap: React.FC<StadiumMapProps> = ({ stadiums, height = '500px' }) => {
  // Center of Morocco
  const moroccoCenter: [number, number] = [31.7917, -7.0926];
  const defaultZoom = 5;
  
  // If there's only one stadium, center on it and use higher zoom
  const mapCenter = stadiums.length === 1 ? stadiums[0].coordinates : moroccoCenter;
  const mapZoom = stadiums.length === 1 ? 10 : defaultZoom;
  
  return (
    <Card className="overflow-hidden border shadow-md">
      <CardContent className="p-0">
        <div style={{ height }}>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={mapCenter}
            zoom={mapZoom}
            className="z-0"
          >
            <MapInitializer center={mapCenter} zoom={mapZoom} />
            
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {stadiums.map((stadium) => (
              <Marker 
                key={stadium.id}
                position={stadium.coordinates}
                icon={stadiumIcon}
              >
                <Popup>
                  <div className="w-56 stadium-popup">
                    <div className="mb-2">
                      <img 
                        src={stadium.image || '/placeholder.svg'} 
                        alt={stadium.name} 
                        className="w-full h-24 object-cover rounded-md"
                      />
                    </div>
                    <h3 className="font-bold text-base">{stadium.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{stadium.city}, Morocco</p>
                    
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Capacity: {stadium.capacity.toLocaleString()}</span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        stadium.status === 'Operational' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {stadium.status}
                      </span>
                    </div>
                    
                    <Button 
                      size="sm"
                      variant="outline"
                      className="w-full flex items-center justify-center gap-1 border-morocco-green text-morocco-green hover:bg-morocco-green hover:text-white"
                      asChild
                    >
                      <Link to={`/stadium/${stadium.id}`}>
                        <MapPin className="h-3.5 w-3.5" />
                        <span>View Details</span>
                      </Link>
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StadiumMap;
