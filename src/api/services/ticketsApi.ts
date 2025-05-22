
import { Ticket } from '../types/tickets';
import { mockTickets } from '../mockData/tickets';

/**
 * Tickets API
 */
export const TicketsAPI = {
  // Get all tickets
  getAll: async (): Promise<Ticket[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTickets;
  },

  // Get tickets by match ID
  getByMatchId: async (matchId: string): Promise<Ticket[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTickets.filter((ticket) => ticket.matchId === matchId);
  },

  // Book tickets (simulated)
  bookTickets: async (ticketId: string, quantity: number): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const ticket = mockTickets.find((t) => t.id === ticketId);
    
    if (!ticket) {
      return { success: false, message: 'Ticket not found' };
    }
    
    if (quantity > ticket.available) {
      return { success: false, message: 'Not enough tickets available' };
    }
    
    if (quantity > ticket.maxPerPerson) {
      return { success: false, message: `Maximum ${ticket.maxPerPerson} tickets per person allowed` };
    }
    
    // In a real app, this would update the database
    // ticket.available -= quantity;
    
    return { success: true, message: `Successfully booked ${quantity} tickets` };
  }
};
