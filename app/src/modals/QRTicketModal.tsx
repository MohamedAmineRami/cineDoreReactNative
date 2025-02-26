import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { X } from 'lucide-react-native';
import { TicketDisplayDTO } from '../types';

interface QRTicketModalProps {
    visible: boolean;
    onClose: () => void;
    tickets: TicketDisplayDTO[];
}

const QRTicketModal: React.FC<QRTicketModalProps> = ({ visible, onClose, tickets }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 20000);

            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

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

                    {tickets.length === 0 ? (
                        <View style={styles.emptyStateContainer}>
                            <Image
                                source={require('../assets/images/theaterSeats.png')}
                                style={styles.seatsIcon}
                            />
                        </View>
                    ) : (
                        tickets.map((ticket, index) => (
                            <View key={index} style={styles.qrSection}>
                                <QRCode
                                    value={ticket.codigoQr}
                                    size={200}
                                    backgroundColor="white"
                                />
                                <Text style={styles.entriesText}>x{ticket.cantidadTickets} Entradas</Text>
                                <Text style={styles.movieTitle}>{ticket.tituloPelicula}</Text>
                                <Text style={styles.dateText}>{ticket.fechaFuncion}</Text>
                                <Text style={styles.roomText}>Sala: 1</Text>
                            </View>
                        ))
                    )}
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
        padding: 20,
    },
    ticketContainer: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 8,
    },
    qrSection: {
        marginTop: 40,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    entriesText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    roomText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
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
