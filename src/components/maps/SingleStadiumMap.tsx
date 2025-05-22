
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Stadium } from '@/api/types/stadiums';
import { Card, CardContent } from '@/components/ui/card';
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

interface SingleStadiumMapProps {
  stadium: Stadium;
  height?: string;
  withCard?: boolean;
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

const SingleStadiumMap: React.FC<SingleStadiumMapProps> = ({ 
  stadium, 
  height = '250px',
  withCard = true
}) => {
  // Force map to refresh when component mounts
  useEffect(() => {
    // This forces a rerender after the component is added to the DOM
    const refreshMap = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(refreshMap);
  }, []);

  const MapContent = (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={stadium.coordinates}
        zoom={13}
        scrollWheelZoom={false}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Marker 
          position={stadium.coordinates}
          icon={stadiumIcon}
        >
          <Popup>
            <div className="w-56 stadium-popup">
              <h3 className="font-bold text-base">{stadium.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{stadium.city}, Morocco</p>
              <p className="text-xs text-gray-500">Capacity: {stadium.capacity.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );

  if (withCard) {
    return (
      <Card className="overflow-hidden border shadow-md">
        <CardContent className="p-0">
          {MapContent}
        </CardContent>
      </Card>
    );
  }

  return MapContent;
};

export default SingleStadiumMap;
