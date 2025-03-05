import {NativeStackNavigationProp} from "@react-navigation/native-stack";

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

export interface MovieDetailModalProps {
    visible: boolean;
    movieId: number | null;
    onClose: () => void;
}

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Home: undefined;
    Register: undefined;
    Cine: undefined;
    Profile: undefined;
    TicketScreen: { ticketData: any };
};

export interface TicketPurchaseModalProps {
    visible: boolean;
    onClose: () => void;
    movie: any;
    selectedDate: string;
    selectedTime: string;
    selectedSala: string;
    onPurchaseComplete: (ticketData: any) => void;
    navigation: NativeStackNavigationProp<RootStackParamList>;
}