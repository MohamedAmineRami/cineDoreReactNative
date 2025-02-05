import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TabNavigation from '../components/TabNavigation';
import TicketPurchaseModal from '../modals/TicketPurchaseModal';

const MovieDetailModal = ({ visible, movie, onClose }) => {
    const [activeTab, setActiveTab] = useState('Horarios');
    const [showTicketPurchase, setShowTicketPurchase] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const movieDetails = {
        'La Dolce Vita': {
            year: '1960',
            duration: '1h 14m',
            format: '(DCP) Proyeccion en Formato Digital',
            formatDetails: '175\' B/N',
            schedules: {
                'Hoy, Miércoles 15 de Enero': '17:00',
                'Jueves 16 de Enero': '18:00',
            },
            synopsis: 'La historia sigue a Marcello Rubini...',
        },
        // other movies ...
    };

    if (!movie) return null;

    const details = movieDetails[movie.title] || {
        schedules: {},
        synopsis: 'Información no disponible',
        format: '',
        formatDetails: '',
    };

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

                        <Image source={movie.image} style={styles.modalImage} />

                        <TabNavigation
                            tabs={['Horarios', 'Sinopsis']}
                            activeTab={activeTab}
                            onTabPress={setActiveTab}
                        />

                        <View style={styles.detailsContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.age}>18</Text>
                                <Text style={styles.title}>{movie.title}</Text>
                                <Text style={styles.duration}>Drama | {details.year} {details.duration} VOSE</Text>
                            </View>

                            {activeTab === 'Horarios' ? (
                                <View style={styles.scheduleContainer}>
                                    {Object.entries(details.schedules).map(([date, time]) => (
                                        <TouchableOpacity
                                            key={date}
                                            style={styles.scheduleItem}
                                            onPress={() => {
                                                setSelectedDate(date);
                                                setSelectedTime(time);
                                                setShowTicketPurchase(true);
                                            }}
                                        >
                                            <Text style={styles.scheduleDate}>{date}</Text>
                                            <Text style={styles.scheduleTime}>{time}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                <View style={styles.synopsisContainer}>
                                    <Text style={styles.sectionTitle}>Formato:</Text>
                                    <Text style={styles.format}>{details.format}</Text>
                                    <Text style={styles.formatDetails}>{details.formatDetails}</Text>

                                    <Text style={styles.sectionTitle}>Información de la película</Text>
                                    <Text style={styles.synopsis}>{details.synopsis}</Text>
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