
export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  image: string;
  status: string;
  progress: number;
  description: string;
  features: string[];
  matches: number;
  startDate: string;
  coordinates: [number, number];
}
