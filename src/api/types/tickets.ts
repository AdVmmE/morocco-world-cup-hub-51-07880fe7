
export interface Ticket {
  id: string;
  matchId: string;
  category: string;
  price: number;
  currency: string;
  available: number;
  maxPerPerson: number;
}
