
export interface Ticket {
  id: string;
  matchId: string;
  seatType: string;
  seatNumber: string;
  price: number;
  currency: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled' | 'refunded';
  ownerName?: string;
  ownerEmail?: string;
}
