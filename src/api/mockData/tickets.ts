
import { Ticket } from '../types/tickets';

export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    matchId: 'match-1',
    category: 'Category 1',
    price: 200,
    currency: 'USD',
    available: 5000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-2',
    matchId: 'match-1',
    category: 'Category 2',
    price: 150,
    currency: 'USD',
    available: 10000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-3',
    matchId: 'match-1',
    category: 'Category 3',
    price: 100,
    currency: 'USD',
    available: 20000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-4',
    matchId: 'match-2',
    category: 'Category 1',
    price: 180,
    currency: 'USD',
    available: 4000,
    maxPerPerson: 4,
  },
  {
    id: 'ticket-5',
    matchId: 'match-2',
    category: 'Category 2',
    price: 130,
    currency: 'USD',
    available: 8000,
    maxPerPerson: 4,
  },
];
