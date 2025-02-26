import React, { useState, useEffect } from 'react';
import {View, Text, Modal, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';
import TabNavigation from '../components/TabNavigation';
import TicketPurchaseModal from '../modals/TicketPurchaseModal';
import { fetchMovieById } from '../services/movies';
import { Movie } from '../types';

interface MovieDetailModalProps {
    visible: boolean;
    movieId: number | null;
    onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ visible, movieId, onClose }) => {
    const [activeTab, setActiveTab] = useState('Horarios');
    const [showTicketPurchase, setShowTicketPurchase] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSala, setSelectedSala] = useState('');
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (movieId) {
            const loadMovieDetails = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const data = await fetchMovieById(movieId);
                    setMovie(data);
                } catch (error) {
                    console.error('Failed to load movie details:', error);
                    setError('No se pudieron cargar los detalles de la película');
                } finally {
                    setLoading(false);
                }
            };
            loadMovieDetails();
        } else {
            setMovie(null);
        }
    }, [movieId]);

    if (!visible) return null;

    if (loading) {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
                statusBarTranslucent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#4361EE" />
                        <Text style={styles.loadingText}>Cargando detalles...</Text>
                    </View>
                </View>
            </Modal>
        );
    }

    if (error || !movie) {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
                statusBarTranslucent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.errorText}>{error || 'No se encontró la película'}</Text>
                        <TouchableOpacity style={styles.backButton} onPress={onClose}>
                            <Text style={styles.backButtonText}>← Atrás</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    const schedules = movie.funciones.reduce((acc, funcion) => {
        const dateTime = new Date(funcion.fechaHora);
        const date = dateTime.toLocaleDateString('es-ES');
        const time = dateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        if (!acc[date]) acc[date] = [];

        acc[date].push({ time, sala: funcion.sala });
        return acc;
    }, {} as { [key: string]: { time: string, sala: string }[] });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.backButton} onPress={onClose}>
                        <Text style={styles.backButtonText}>← Atrás</Text>
                    </TouchableOpacity>

                    <Image source={{ uri: movie.imagenPoster }} style={styles.modalImage} />

                    <TabNavigation
                        tabs={['Horarios', 'Sinopsis']}
                        activeTab={activeTab}
                        onTabPress={setActiveTab}
                    />

                    <View style={styles.detailsContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.ageBadge}>{movie.clasificacion}</Text>
                            <Text style={styles.movieTitle}>{movie.nombre}</Text>
                        </View>
                        <Text style={styles.movieDetails}>
                            {movie.categoria} | {movie.anio} | {movie.duracion}m | {movie.lenguaje}
                        </Text>

                        {activeTab === 'Horarios' ? (
                            <View style={styles.scheduleContainer}>
                                {Object.entries(schedules).map(([date, timeSlots]) => (
                                    <View key={date} style={styles.timesContainer}>
                                        {timeSlots.map((slot, index) => (
                                            <TouchableOpacity
                                                key={`${date}-${index}`} // Ensuring unique key
                                                style={styles.timeSlot}
                                                onPress={() => {
                                                    setSelectedDate(date);
                                                    setSelectedTime(slot.time);
                                                    setSelectedSala(slot.sala);
                                                    setShowTicketPurchase(true);
                                                }}
                                            >
                                                <Text style={styles.scheduleDate}>{date}</Text>
                                                <Text style={styles.scheduleTime}>{slot.time}</Text>
                                                <Text style={styles.scheduleSala}>{slot.sala}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.synopsisContainer}>
                                <Text style={styles.sectionTitle}>Formato:</Text>
                                <View style={styles.formatContainer}>
                                    <View style={styles.formatDetails}>
                                        <Text style={styles.formatType}>{movie.formato}</Text>
                                        <Text style={styles.formatColor}>{movie.color}</Text>
                                    </View>
                                </View>

                                <Text style={styles.sectionTitle}>Información de la película</Text>
                                <Text style={styles.synopsis}>{movie.sinopsis}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <TicketPurchaseModal
                visible={showTicketPurchase}
                onClose={() => setShowTicketPurchase(false)}
                movie={movie}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedSala={selectedSala}
            />
        </Modal>
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 1,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalImage: {
        width: '100%',
        height: 450,
    },
    detailsContainer: {
        flex: 1,
        padding: 16,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ageBadge: {
        backgroundColor: '#1e2a38',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    movieTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    movieDetails: {
        color: '#b0b0b0',
        fontSize: 14,
    },
    formatContainer: {
        marginTop: 12,
        backgroundColor: 'transparent',
        padding: 8,
        borderWidth: 0.5,
        borderColor: '#454545',
    },
    formatDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    formatType: {
        color: '#fff',
        fontSize: 14,
    },
    formatColor: {
        color: '#fff',
        fontSize: 14,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 12,
        fontWeight: 'bold',
    },
    synopsis: {
        color: '#b0b0b0',
        fontSize: 14,
        lineHeight: 20,
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#333',
    },
    errorText: {
        fontSize: 16,
        color: '#ff3b30',
        marginBottom: 20,
        textAlign: 'center',
    },
    dateBlock: {
        marginBottom: 16,
    },
    scheduleDate: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        borderColor:'#000',
        borderWidth: 0.5,
        paddingHorizontal: 2,
    },
    timesContainer: {
        flexDirection: 'column',
    },
    timeSlot: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    scheduleTime: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        borderColor:'#000',
        borderWidth: 0.5,
        paddingHorizontal: 2,
    },
    scheduleSala: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        borderColor:'#000',
        borderWidth: 0.5,
        paddingHorizontal: 2,
    },
    titleContainer: {
        marginBottom: 24,
    },
    age: {
        color: '#fff',
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    duration: {
        color: '#888',
        fontSize: 14,
    },
    scheduleContainer: {
        marginTop: 16,
    },
    scheduleItem: {
        marginBottom: 16,
    },
    synopsisContainer: {},
});

export default MovieDetailModal;