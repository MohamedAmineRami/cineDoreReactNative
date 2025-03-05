import api from './api';

export const fetchUserTickets = async (userId) => {
    try {
        const response = await api.get(`/compraTicket/usuario/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user tickets:', error);
        throw error;
    }
};

export const createTicketPurchase = async (purchaseData) => {
    try {
        const response = await api.post('/compraTicket/crear', purchaseData);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket purchase:', error);
        throw error;
    }
};
