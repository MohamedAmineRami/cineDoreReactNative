export interface Movie {
    id: number;
    nombre: string;
    anio: number;
    duracion: number;
    sinopsis: string;
    imagenPoster: string;
    categoria: string;
    clasificacion: string;
    formato: string;
    lenguaje: string;
    color: string;
    funciones: Funcion[];
}

export interface Funcion {
    id: number;
    fechaHora: string;
    sala: string;
}