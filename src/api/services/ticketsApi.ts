
import { Ticket } from '../types/tickets';
import { apiClient } from '../client';

/**
 * Tickets API
 */
export const TicketsAPI = {
  // Get all tickets
  getAll: async (): Promise<Ticket[]> => {
    return apiClient.get<Ticket[]>('/tickets');
  },

  // Get tickets by match ID
  getByMatchId: async (matchId: string): Promise<Ticket[]> => {
    return apiClient.get<Ticket[]>(`/tickets/match/${matchId}`);
  },

  // Book tickets
  bookTickets: async (ticketId: string, quantity: number, ownerData: any): Promise<{ success: boolean; message: string }> => {
    try {
      await apiClient.post(`/tickets/${ticketId}/book`, {
        quantity,
        owner_name: ownerData.name,
        owner_email: ownerData.email,
      });
      return { success: true, message: `Successfully booked ${quantity} tickets` };
    } catch (error: any) {
      return { success: false, message: error.message || 'Booking failed' };
    }
  },

  // Get user tickets
  getUserTickets: async () => {
    return apiClient.get('/user/tickets');
  },

  // Cancel user ticket
  cancelTicket: async (userTicketId: string) => {
    return apiClient.delete(`/user/tickets/${userTicketId}`);
  }
};
