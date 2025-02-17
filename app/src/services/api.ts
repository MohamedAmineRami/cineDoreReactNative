import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://192.168.1.132:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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

export default api;