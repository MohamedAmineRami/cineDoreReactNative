import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

const SplashScreen = () => {
    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['#0a1933', '#081428']}
                style={styles.background}
            >
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/logoCinedore.png')} />
                        <Text style={styles.logoText}>CINE DORÉ</Text>
                    </View>

                    <View style={styles.bottomLogos}>
                        <Image  source={require('../assets/images/filmotecaLogoText.png')} />
                        <Image  source={require('../assets/images/ministerio.png')} />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:5,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    bottomLogos: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        gap: 20
    },


});

export default SplashScreen;