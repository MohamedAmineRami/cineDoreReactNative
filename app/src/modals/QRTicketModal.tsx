import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Svg, { Path } from 'react-native-svg';

const TicketNotch = () => (
    <View style={styles.notchContainer}>
        <Svg height="30" width="72" style={styles.notch}>
            <Path
                d="M0 0 H72 V15 C36 15 36 30 0 30 Z"
                fill="rgba(0, 0, 0, 0.5)"
            />
        </Svg>
    </View>
);

const QRTicketModal = ({ visible, onClose, movie, selectedDate, selectedTime }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
            <View style={styles.ticketContainer}>
                <TicketNotch />
                <View style={styles.ticketContent}>
                    <View style={styles.ticketHeader}>
                        <Text style={styles.movieTitle}>La Dolce Vita</Text>
                        <Text style={styles.movieRating}>18</Text>
                    </View>

                    <View style={styles.qrCodeContainer}>
                        <QRCode
                            value={`Movie: ${movie?.title}, Date: ${selectedDate}, Time: ${selectedTime}, Sala: 1`}
                            size={200}
                        />
                    </View>

                    <View style={styles.ticketDetails}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailText}>Miércoles 15 de Enero</Text>
                            <Text style={styles.detailText}>1h 14m</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailText}>17:00</Text>
                            <Text style={styles.detailText}>Sala: 1</Text>
                        </View>
                        <Text style={styles.voseText}>VOSE</Text>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ticketContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    notchContainer: {
        height: 80,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    notch: {
        position: 'absolute',
        top: -15,
    },
    ticketContent: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    movieRating: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    qrCodeContainer: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    ticketDetails: {
        padding: 15,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
    },
    voseText: {
        textAlign: 'right',
        fontSize: 12,
        color: '#666',
    },
});

export default QRTicketModal;