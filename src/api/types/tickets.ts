
export interface Ticket {
  id: string;
  matchId: string;
  category: string;
  price: number;
  currency: string;
  available: number;
  maxPerPerson: number;
  seatType?: string;
  seatNumber?: string;
  purchaseDate?: string;
  status?: 'active' | 'used' | 'cancelled' | 'refunded';
  ownerName?: string;
  ownerEmail?: string;
}
