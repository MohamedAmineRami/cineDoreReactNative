import api from './api';
import * as SecureStore from 'expo-secure-store';

export const login = async (email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/login', { correoElectronico: email, contrasenia: password });

    if (response.data && response.data.id) {
        await SecureStore.setItemAsync('userId', response.data.id.toString());
    } else if (response.data && response.data.usuario && response.data.usuario.id) {
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
    await api.post('/auth/logout');
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('userId');
};

export const getUserProfile = async (): Promise<any> => {
    try {
        const response = await api.get('/auth/profile');
        console.log('User profile response:', response.data);

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