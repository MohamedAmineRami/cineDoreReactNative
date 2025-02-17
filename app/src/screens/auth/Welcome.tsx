import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import Button from '../../components/buttons/Button';

const Welcome = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../assets/images/theaterCine.png')}
            style={styles.container}
        >
            <View style={styles.content}>
                <Image style={styles.logo} source={require('../../assets/images/logoCinedore.png')} />
                <Text style={styles.title}>Bienvenido al{'\n'}Cine Doré</Text>
                <Text style={styles.subtitle}>
                    Compra tus entradas y disfruta del mejor{'\n'}
                    cine clásico y de autor en Madrid.
                </Text>
                <Button title="Inicia sesión" onPress={() => navigation.navigate('Login')} />
                <Button title="Crea tu cuenta" onPress={() => navigation.navigate('Register')} type="secondary" />
                <Button title="Continuar como invitado" onPress={() => navigation.navigate('Guest')} type="text" />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        flex: 1,
    },
    content: {
        alignItems: 'center',
        marginBottom: 100,
        paddingHorizontal: 40,
    },
    logo: {
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 40,
        opacity: 0.8,
    },
});

export default Welcome;