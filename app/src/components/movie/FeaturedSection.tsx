import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FeaturedSection = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Palestina.jpg')}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.overlay}>
                <Text style={styles.subtitle}>Este mes esta dedicado a:</Text>
                <Text style={styles.title}>PELICULAS PALESTINAS</Text>
                <View style={styles.banner}>
                    <LinearGradient
                        colors={['#5CE1FF', '#4B6DEE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.bannerText}>Instalaciones cerradas: 1 y 6 Enero</Text>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 300,
        position: 'relative',
    },
    image: {
        width: '90%',
        height: '90%',
        borderRadius: 25,
        marginLeft: 20,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    subtitle: {
        color: '#fff',
        fontSize: 14.22,
        marginLeft: 15,
        marginBottom:-1
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom:-30
    },
    banner: {
        position: 'relative',
        top: 15,
        right: 20,
        padding: 8,
        marginTop: 12,
    },
    gradient: {
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginLeft: 45,
    },
    bannerText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default FeaturedSection;