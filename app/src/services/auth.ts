import api from './api';
import * as SecureStore from 'expo-secure-store';

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { correoElectronico: email, contrasenia: password });
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

export const logout = async () => {
    await api.post('/auth/logout'); // Call the backend logout endpoint
    await SecureStore.deleteItemAsync('token'); // Remove the JWT token
};

export const getUserProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

export const deleteAccount = async () => {
    const response = await api.delete('/auth/delete-account');
    return response.data;
};