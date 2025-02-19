// src/components/MovieDetailModal/MovieDetailModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TabNavigation from '../components/TabNavigation';
import TicketPurchaseModal from '../modals/TicketPurchaseModal';
import { fetchMovieById } from '../services/movies';
import { Movie } from '../types';

interface MovieDetailModalProps {
    visible: boolean;
    movieId: number | null; // Pass movieId instead of the entire movie object
    onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ visible, movieId, onClose }) => {
    const [activeTab, setActiveTab] = useState('Horarios');
    const [showTicketPurchase, setShowTicketPurchase] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [movie, setMovie] = useState<Movie | null>(null); // State to store movie details

    // Fetch movie details when movieId changes
    useEffect(() => {
        if (movieId) {
            const loadMovieDetails = async () => {
                try {
                    const data = await fetchMovieById(movieId);
                    setMovie(data);
                } catch (error) {
                    console.error('Failed to load movie details:', error);
                }
            };
            loadMovieDetails();
        }
    }, [movieId]);

    if (!movie) return null;

    // Format the movie's functions into schedules
    const schedules = movie.funciones.reduce((acc, funcion) => {
        const date = new Date(funcion.fechaHora).toLocaleDateString();
        const time = new Date(funcion.fechaHora).toLocaleTimeString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(time);
        return acc;
    }, {} as { [key: string]: string[] });

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
                            <View style={styles.titleContainer}>
                                <Text style={styles.age}>18</Text>
                                <Text style={styles.title}>{movie.nombre}</Text>
                                <Text style={styles.duration}>Drama | {movie.anio} {movie.duracion}m VOSE</Text>
                            </View>

                            {activeTab === 'Horarios' ? (
                                <View style={styles.scheduleContainer}>
                                    {Object.entries(schedules).map(([date, times]) => (
                                        <TouchableOpacity
                                            key={date}
                                            style={styles.scheduleItem}
                                            onPress={() => {
                                                setSelectedDate(date);
                                                setSelectedTime(times[0]);
                                                setShowTicketPurchase(true);
                                            }}
                                        >
                                            <Text style={styles.scheduleDate}>{date}</Text>
                                            {times.map((time, index) => (
                                                <Text key={index} style={styles.scheduleTime}>{time}</Text>
                                            ))}
                                        </TouchableOpacity>
                                    ))}
                                </View>
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
                selectedDate={selectedDate}
                selectedTime={selectedTime}
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
    scheduleDate: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 4,
    },
    scheduleTime: {
        color: '#5DD9FA',
        fontSize: 20,
        fontWeight: 'bold',
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