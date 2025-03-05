import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRTicketModal from '../modals/QRTicketModal';
import * as SecureStore from 'expo-secure-store';
import { fetchUserTickets } from "../services/ticket";
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

const BottomNav = () => {
    const navigation = useNavigation<any>();
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [noTicketsModalVisible, setNoTicketsModalVisible] = useState(false);
    const [latestTicket, setLatestTicket] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchLatestTicket = async () => {
        setLoading(true);
        try {
            const userId = await SecureStore.getItemAsync('userId');

            if (!userId) {
                setNoTicketsModalVisible(true);
                return false;
            }
            const userTickets = await fetchUserTickets(parseInt(userId, 10));
            if (userTickets && userTickets.length > 0) {
                const now = new Date();
                let closestTicket = null;
                let closestDiff = Infinity;

                userTickets.forEach(ticket => {
                    try {
                        const showTime = new Date(ticket.fechaFuncion);

                        if (showTime < now) return;

                        const diff = showTime.getTime() - now.getTime();

                        if (diff < closestDiff) {
                            closestDiff = diff;
                            closestTicket = ticket;
                        }
                    } catch (error) {
                        console.error('Error:', ticket, error);
                    }
                });

                if (!closestTicket) {
                    let mostRecentPast = null;
                    let smallestPastDiff = Infinity;

                    userTickets.forEach(ticket => {
                        try {
                            const showTime = new Date(ticket.fechaFuncion);

                            if (showTime >= now) return;

                            const diff = now.getTime() - showTime.getTime();

                            if (diff < smallestPastDiff) {
                                smallestPastDiff = diff;
                                mostRecentPast = ticket;
                            }
                        } catch (error) {
                            console.error('Error:', ticket, error);
                        }
                    });

                    closestTicket = mostRecentPast;
                }

                if (closestTicket) {
                    setLatestTicket(closestTicket);
                    return true;
                } else {
                    setNoTicketsModalVisible(true);
                    return false;
                }
            } else {
                setNoTicketsModalVisible(true);
                return false;
            }
        } catch (error) {
            console.error('Error en fetchLatestTicket:', error);
            setNoTicketsModalVisible(true);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleQrButtonPress = async () => {
        const hasTicket = await fetchLatestTicket();
        if (hasTicket) {
            setQrModalVisible(true);
        }
    };

    const handleTicketPurchased = (ticketData) => {
        setLatestTicket(ticketData);
    };

    useEffect(() => {
        if (navigation) {
            navigation.handleTicketPurchased = handleTicketPurchased;
        }

        return () => {
            if (navigation) {
                navigation.handleTicketPurchased = undefined;
            }
        };
    }, [navigation]);

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Cine')}
                style={styles.navItem}
            >
                <Image
                    source={require('../assets/icons/map.png')}
                    style={styles.navIcon}
                />
                <Text style={styles.navText}>Cine</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={handleQrButtonPress}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#4361EE" />
                ) : (
                    <Image
                        source={require('../assets/icons/QR.png')}
                        style={styles.navIcon}
                    />
                )}
                <Text style={styles.navText}>Entradas</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.navItem}
            >
                <Image
                    source={require('../assets/icons/user.png')}
                    style={styles.navIcon}
                />
                <Text style={styles.navText}>Perfil</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={noTicketsModalVisible}
                onRequestClose={() => setNoTicketsModalVisible(false)}
            >
                <LinearGradient
                    colors={['#00060F', '#041B35']}
                    style={styles.gradient}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image
                            source={require('../assets/images/theaterSeats.png')}
                            style={styles.backgroundImage}
                            resizeMode="contain"
                        />

                        <View style={styles.actionContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setNoTicketsModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </LinearGradient>
            </Modal>

            {latestTicket && (
                <QRTicketModal
                    visible={qrModalVisible}
                    onClose={() => setQrModalVisible(false)}
                    ticketData={latestTicket}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#333',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    navItem: {
        alignItems: 'center',
    },
    navIcon: {
        width: 24,
        height: 24,
        tintColor: '#000',
    },
    navText: {
        color: '#000',
        marginTop: 4,
        fontSize: 12,
    },
    gradient: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        padding: 2,

    },
    backgroundImage: {
        width: '100%',
        height: height * 0.4,
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    closeButton: {
        backgroundColor: '#6c757d',
        padding: 10,
        borderRadius: 10,
        minWidth: 120,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BottomNav;