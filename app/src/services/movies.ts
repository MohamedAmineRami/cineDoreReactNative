import api from './api';
import {Funcion, Movie} from "../types";

export const fetchMovies = async () => {
    try {
        const response = await api.get('/peliculas');
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
    try {
        const response = await api.get(`/peliculas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const fetchFuncionesByMovieId = async (movieId: number): Promise<Funcion[]> => {
    try {
        const response = await api.get(`/funciones?peliculaId=${movieId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching funciones:', error);
        throw error;
    }
};