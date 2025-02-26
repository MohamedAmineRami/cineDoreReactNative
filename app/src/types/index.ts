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

export interface CompraDTO {
    usuarioId: number;
    funcionId: number;
    totalPago: number;
    tickets: TicketEntradaDTO[];
}

export interface TicketEntradaDTO {
    codigoQr: string;
    estadoId: number;
}

export interface TicketDisplayDTO {
    funcionId: number;
    totalPago: number;
    codigoQr: string;
    fechaFuncion: string;
    tituloPelicula: string;
    imagenPelicula: string;
    clasificacion: string;
    lenguaje: string;
    duracion: number;
    cantidadTickets: number;
}

export interface TicketPurchaseModalProps {
    visible: boolean;
    onClose: () => void;
    movie: Movie | null;
    selectedDate: string;
    selectedTime: string;
    selectedSala: string;
}
