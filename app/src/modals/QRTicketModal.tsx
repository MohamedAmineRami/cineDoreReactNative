import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { X } from 'lucide-react-native';

const QRTicketModal = ({ visible, onClose, ticketData }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 20000); // 20 seconds

            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    if (!ticketData) return null;

    const formatDateTime = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return {
                    date: 'Fecha no disponible',
                    time: 'Hora no disponible'
                };
            }

            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            };
            return {
                date: date.toLocaleDateString('es-ES', options),
                time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            };
        } catch (error) {
            console.error('Error formatting date:', error);
            return {
                date: 'Fecha no disponible',
                time: 'Hora no disponible'
            };
        }
    };

    const { date, time } = formatDateTime(ticketData.fechaFuncion);
    const totalTickets = ticketData.cantidadTickets || 0;
    const qrValue = ticketData.codigoQr || `Purchase-${ticketData.funcionId}`;
    const movieTitle = ticketData.tituloPelicula || 'Película';
    const classification = ticketData.clasificacion || 'TP';
    const language = ticketData.lenguaje || 'ESP';
    const duration = ticketData.duracion || 0;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.ticketContainer}>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <X size={24} color="#000" />
                    </TouchableOpacity>

                    <View style={styles.qrSection}>
                        <QRCode
                            value={qrValue}
                            size={200}
                            backgroundColor="white"
                        />
                        <Text style={styles.entriesText}>
                            x{totalTickets} {totalTickets === 1 ? 'Entrada' : 'Entradas'}
                        </Text>
                    </View>


                    <View style={styles.divider}>
                        <View style={styles.leftCircle} />
                        <View style={styles.dottedLine} />
                        <View style={styles.rightCircle} />
                    </View>


                    <View style={styles.detailsSection}>
                        <View style={styles.headerRow}>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>{classification}</Text>
                            </View>
                            <Text style={styles.movieTitle}>{movieTitle}</Text>
                            <View style={styles.durationContainer}>
                                <Text style={styles.durationText}>
                                    {Math.floor(duration / 60)}h {duration % 60}m
                                </Text>
                            </View>
                            <View style={styles.voseContainer}>
                                <Text style={styles.voseText}>{language}</Text>
                            </View>
                        </View>

                        <View style={styles.showingDetails}>
                            <View style={styles.dateTimeRow}>
                                <Text style={styles.dateText}>{date}</Text>
                                <Text style={styles.timeText}>{time}</Text>
                                <Text style={styles.roomText}>Sala: {ticketData.sala || 1}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ticketContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
    qrSection: {
        alignItems: 'center',
        marginBottom: 15,
    },
    entriesText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 15,
    },
    dottedLine: {
        flex: 1,
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    leftCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginRight: -10,
        left: -10,
    },
    rightCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginLeft: -10,
        right: -10,
    },
    detailsSection: {
        width: '100%',
    },
    headerRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratingContainer: {
        backgroundColor: '#E63946',
        padding: 5,
        borderRadius: 4,
        marginRight: 10,
    },
    ratingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    movieTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
        flex: 1,
    },
    durationContainer: {
        backgroundColor: '#F1FAEE',
        padding: 5,
        borderRadius: 4,
        marginRight: 10,
    },
    durationText: {
        color: '#1D3557',
        fontSize: 12,
    },
    voseContainer: {
        backgroundColor: '#457B9D',
        padding: 5,
        borderRadius: 4,
    },
    voseText: {
        color: 'white',
        fontSize: 12,
    },
    showingDetails: {
        marginTop: 10,
    },
    dateTimeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dateText: {
        fontSize: 16,
        color: '#1D3557',
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1D3557',
    },
    roomText: {
        fontSize: 16,
        color: '#1D3557',
    },
    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    seatsIcon: {
        marginBottom: 30,
        tintColor: '#0a1933',
        marginTop: 5,
    },
});

export default QRTicketModal;
