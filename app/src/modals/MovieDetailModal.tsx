import React, { useState, useEffect } from 'react';
import {View, Text, Modal, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';
import TabNavigation from '../components/TabNavigation';
import TicketPurchaseModal from '../modals/TicketPurchaseModal';
import { fetchMovieById } from '../services/movies';
import {Movie, MovieDetailModalProps, RootStackParamList} from '../types';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Clock} from "lucide-react-native";

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ visible, movieId, onClose }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [activeTab, setActiveTab] = useState('Horarios');
    const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
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

    const handlePurchaseComplete = (ticketData: any) => {
        console.log('Purchase completed:', ticketData);
    };

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
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };


    const schedules = movie.funciones.reduce((acc, funcion) => {
        const dateTime = new Date(funcion.fechaHora);
        const date = dateTime.toLocaleDateString('es-ES', options);
        const time = dateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        if (!acc[date]) acc[date] = [];

        acc[date].push({ time, sala: funcion.sala, funcionId: funcion.id });
        return acc;
    }, {} as { [key: string]: { time: string, sala: string, funcionId: number }[] });

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
                        <View style={styles.movieDetails}>
                            <Text
                                style={styles.detailText}
                            >{movie.categoria} | {movie.anio} </Text>
                            <Clock style={styles.clock} size={12} color="#fff" />
                            <Text
                                style={styles.detailText}
                            >

                                {movie.duracion}m | {movie.lenguaje} </Text>
                        </View>

                        {activeTab === 'Horarios' ? (
                            <View style={styles.scheduleContainer}>
                                {Object.entries(schedules).map(([date, timeSlots]) => (
                                    <View key={date} style={styles.timesContainer}>

                                        <View>
                                            {timeSlots.map((slot, index) => (
                                                <TouchableOpacity
                                                    key={`${date}-${index}`}
                                                    style={styles.timeSlot}
                                                    onPress={() => {
                                                        setSelectedDate(date);
                                                        setSelectedTime(slot.time);
                                                        setSelectedSala(slot.sala);
                                                        setPurchaseModalVisible(true);
                                                    }}
                                                >
                                                    <Text style={styles.dateHeader}>{date}</Text>
                                                    <Text style={styles.scheduleTime}>{slot.time}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
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
                visible={purchaseModalVisible}
                onClose={() => setPurchaseModalVisible(false)}
                movie={movie}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedSala={selectedSala}
                onPurchaseComplete={handlePurchaseComplete}
                navigation={navigation}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#b0b0b0',
        fontSize: 14,
    },
    clock:{
        position: 'absolute',
        left: 290,
        marginTop: 4
    },
    detailText: {
        color: "#fff",
    },
    dateHeader: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
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
        marginBottom: 8,
        color: '#000',
    },
    timesContainer: {
        flexDirection: 'column',
    },
    timeSlot: {
        backgroundColor: '#4CC9F0FF',
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10
    },
    scheduleTime: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    scheduleSala: {
        fontSize: 20,
        color: '#fff',
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