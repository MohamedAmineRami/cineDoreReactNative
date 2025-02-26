import api from './api';
import * as SecureStore from 'expo-secure-store';

export const login = async (email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/login', { correoElectronico: email, contrasenia: password });

    // Store user ID in SecureStore (assumes the response includes a userId)
    if (response.data && response.data.id) {
        await SecureStore.setItemAsync('userId', response.data.id.toString());
    } else if (response.data && response.data.usuario && response.data.usuario.id) {
        // Alternative response structure some APIs use
        await SecureStore.setItemAsync('userId', response.data.usuario.id.toString());
    }

    return response.data;
};

export const register = async (userData: {
    nombre: string;
    apellidos: string;
    correoElectronico: string;
    contrasenia: string;
    telefono?: string;
    identificacion: string;
    fechaNacimiento: string;
}) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout'); // Call the backend logout endpoint
    await SecureStore.deleteItemAsync('token'); // Remove the JWT token
    await SecureStore.deleteItemAsync('userId'); // Remove the userId
};

export const getUserProfile = async (): Promise<any> => {
    try {
        const response = await api.get('/auth/profile');
        console.log('User profile response:', response.data);

        // Store user ID if it's available in the profile response
        if (response.data && response.data.id) {
            await SecureStore.setItemAsync('userId', response.data.id.toString());
            console.log('Stored userId from profile:', response.data.id);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const deleteAccount = async () => {
    const response = await api.delete('/auth/delete-account');
    return response.data;
};