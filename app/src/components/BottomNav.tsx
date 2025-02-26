import React, { useState } from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import QRTicketModal from '../modals/QRTicketModal';
import { getTicketsByUserId } from '../services/ticket'; // Import the service
import * as SecureStore from 'expo-secure-store';
import {TicketDisplayDTO} from "../types";

const BottomNav = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [tickets, setTickets] = useState<TicketDisplayDTO[]>([]); // store tickets
    const [loading, setLoading] = useState(false); // handle loading

    const handleQrButtonPress = async (): Promise<void> => {
        setLoading(true);
        try {
            const userId = await SecureStore.getItemAsync('userId');
            console.log('Retrieved userId from SecureStore:', userId);

            if (userId) {
                console.log('Fetching tickets for user ID:', userId);
                const userTickets = await getTicketsByUserId(parseInt(userId, 10));
                console.log('Fetched tickets:', userTickets);
                setTickets(userTickets);
                setQrModalVisible(true);
            } else {
                console.log('User not logged in - no userId found in SecureStore');
                Alert.alert(
                    "Login Required",
                    "Please log in to view your tickets",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Login",
                            onPress: () => navigation.navigate('Login' as never)
                        }
                    ]
                );
            }
        } catch (error) {
            console.error('Error in handleQrButtonPress:', error);
        } finally {
            setLoading(false);
        }
    };

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
            <QRTicketModal
                visible={qrModalVisible}
                onClose={() => setQrModalVisible(false)}
                tickets={tickets}
            />
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
});

export default BottomNav;