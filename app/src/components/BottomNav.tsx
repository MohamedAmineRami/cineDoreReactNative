import React, {useState} from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import QRTicketModal from '../modals/QRTicketModal';

const BottomNav = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const movie = {
        title: 'Gaza Mi Amor',
        image: require('../assets/images/Movie1.png'), // Adjust the path as needed
    };
    const selectedDate = 'Miércoles 15 de Enero';
    const selectedTime = '17:00';

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
                onPress={() => setQrModalVisible(true)}
            >
                <Image
                    source={require('../assets/icons/QR.png')}
                    style={styles.navIcon}
                />
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
                movie={movie}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
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