import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { X } from 'lucide-react-native';

const QRTicketModal = ({ visible, onClose }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 20000); // 20 seconds

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
                    {/* Close Button */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <X size={24} color="#000" />
                    </TouchableOpacity>

                    {/* QR Code Section */}
                    <View style={styles.qrSection}>
                        <QRCode
                            value="x3 Entradas"
                            size={200}
                            backgroundColor="white"
                        />
                        <Text style={styles.entriesText}>x3 Entradas</Text>
                    </View>

                    {/* Divider with circles */}
                    <View style={styles.divider}>
                        <View style={styles.leftCircle} />
                        <View style={styles.dottedLine} />
                        <View style={styles.rightCircle} />
                    </View>

                    {/* Movie Details Section */}
                    <View style={styles.detailsSection}>
                        <View style={styles.headerRow}>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>18</Text>
                            </View>
                            <Text style={styles.movieTitle}>La Dolce Vita</Text>
                            <View style={styles.durationContainer}>
                                <Text style={styles.durationText}>1h 14m</Text>
                            </View>
                            <View style={styles.voseContainer}>
                                <Text style={styles.voseText}>VOSE</Text>
                            </View>
                        </View>

                        <View style={styles.showingDetails}>
                            <View style={styles.dateTimeRow}>
                                <Text style={styles.dateText}>Miércoles 15 de Enero</Text>
                                <Text style={styles.timeText}>17:00</Text>
                                <Text style={styles.roomText}>Sala: 1</Text>
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
        padding: 20,
    },
    ticketContainer: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative', // For absolute positioning of close button
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
        marginTop:40,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    entriesText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    leftCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginLeft: -10,
    },
    rightCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginRight: -10,
    },
    dottedLine: {
        flex: 1,
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginHorizontal: 10,
    },
    detailsSection: {
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 40,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 8,
    },
    ratingContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        padding: 2,
        minWidth: 28,
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '500',
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    durationContainer: {
        alignItems: 'flex-end',
    },
    durationText: {
        fontSize: 14,
        color: '#666',
    },
    voseContainer: {
        backgroundColor: '#f0f0f0',
        padding: 4,
        borderRadius: 4,
    },
    voseText: {
        fontSize: 12,
        fontWeight: '500',
    },
    showingDetails: {
        marginTop: 5,
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
    roomText: {
        fontSize: 14,
        color: '#666',
    },
});

export default QRTicketModal;