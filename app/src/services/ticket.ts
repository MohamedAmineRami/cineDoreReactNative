import api from './api'; // Import your existing api instance
import { CompraDTO, TicketDisplayDTO } from '../types';

export const createTicket = async (ticketData: CompraDTO): Promise<TicketDisplayDTO> => {
    try {
        const response = await api.post('/compraTicket/crear', ticketData);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};

export const getTicketsByUserId = async (userId: number): Promise<TicketDisplayDTO[]> => {
    try {
        const response = await api.get(`/compraTicket/usuario/${userId}`);
        console.log('Raw API response for tickets:', response);

        // Make sure we're returning the expected format
        if (response.data && Array.isArray(response.data)) {
            return response.data as TicketDisplayDTO[];
        } else if (response.data && response.data.tickets && Array.isArray(response.data.tickets)) {
            return response.data.tickets as TicketDisplayDTO[];
        } else {
            console.error('Unexpected API response format:', response.data);
            return [] as TicketDisplayDTO[];
        }
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};