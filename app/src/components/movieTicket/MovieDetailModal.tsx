import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import TabNavigation from '../../components/movieTicket/TabNavigation';
import TicketPurchaseModal from '../../components/movieTicket/TicketPurchaseModal';
import { fetchMovieById, fetchFuncionesByMovieId } from '../../services/movies';
import { Movie, Funcion } from '../../types';
import MovieHeader from '../../components/movieTicket/MovieHeader';
import MovieInfo from '../../components/movieTicket/MovieInfo';
import ScheduleList from '../../components/movieTicket/ScheduleList';

interface MovieDetailModalProps {
    visible: boolean;
    movieId: number | null;
    onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ visible, movieId, onClose }) => {
    const [activeTab, setActiveTab] = useState('Horarios');
    const [showTicketPurchase, setShowTicketPurchase] = useState(false);
    const [selectedFuncion, setSelectedFuncion] = useState<Funcion | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [funciones, setFunciones] = useState<Funcion[]>([]);

    useEffect(() => {
        if (movieId) {
            const loadMovieDetails = async () => {
                try {
                    const movieData = await fetchMovieById(movieId);
                    setMovie(movieData);

                    const funcionesData = await fetchFuncionesByMovieId(movieId);
                    setFunciones(funcionesData);
                } catch (error) {
                    console.error('Failed to load movie details:', error);
                }
            };
            loadMovieDetails();
        }
    }, [movieId]);

    if (!movie) return null;

    const schedules = funciones.reduce((acc, funcion) => {
        const date = new Date(funcion.fechaHora).toLocaleDateString();
        const time = new Date(funcion.fechaHora).toLocaleTimeString();
        if (!acc[date]) acc[date] = [];
        acc[date].push({ time, funcion });
        return acc;
    }, {} as { [key: string]: { time: string; funcion: Funcion }[] });

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
                statusBarTranslucent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <MovieHeader imageUrl={movie.imagenPoster} onBack={onClose} />

                        <TabNavigation
                            tabs={['Horarios', 'Sinopsis']}
                            activeTab={activeTab}
                            onTabPress={setActiveTab}
                        />

                        <View style={styles.detailsContainer}>
                            <MovieInfo
                                title={movie.nombre}
                                age="18"
                                duration={`Drama | ${movie.anio} ${movie.duracion}m VOSE`}
                            />

                            {activeTab === 'Horarios' ? (
                                <ScheduleList
                                    schedules={schedules}
                                    onSelectFuncion={(funcion) => {
                                        setSelectedFuncion(funcion);
                                        setShowTicketPurchase(true);
                                    }}
                                />
                            ) : (
                                <View style={styles.synopsisContainer}>
                                    <Text style={styles.sectionTitle}>Formato:</Text>
                                    <Text style={styles.format}>{movie.formato}</Text>
                                    <Text style={styles.formatDetails}>{movie.color}</Text>

                                    <Text style={styles.sectionTitle}>Información de la película</Text>
                                    <Text style={styles.synopsis}>{movie.sinopsis}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

            <TicketPurchaseModal
                visible={showTicketPurchase}
                onClose={() => setShowTicketPurchase(false)}
                movie={movie}
                funcion={selectedFuncion}
            />
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#020f1f',
    },
    modalContent: {
        flex: 1,
    },
    detailsContainer: {
        flex: 1,
        padding: 16,
    },
    synopsisContainer: {},
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 8,
    },
    format: {
        color: '#888',
        fontSize: 14,
    },
    formatDetails: {
        color: '#888',
        fontSize: 14,
        marginTop: 4,
    },
    synopsis: {
        color: '#888',
        fontSize: 14,
        lineHeight: 20,
    },
});

export default MovieDetailModal;