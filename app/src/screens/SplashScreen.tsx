import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import MinesterioCultura from "../assets/svgr/MinesterioCultura";
import FilmotecaEspanola from "../assets/svgr/FilmotecaEspanola";
import LogoCineDore from "../assets/svgr/LogoCineDore";

const SplashScreen = () => {
    return (
        <ImageBackground
            source={require('../assets/images/splash.png')}
            style={styles.backgroundImage}
        >

                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <LogoCineDore />
                    </View>

                    <View style={styles.rightLogosContainer}>
                        <View style={styles.mc}>
                            <MinesterioCultura />
                        </View>
                        <View style={styles.fe}>
                            <FilmotecaEspanola />
                        </View>
                    </View>
                </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        flex: 1,
        width: 270,
    },
    rightLogosContainer: {
        position: 'absolute',
        bottom: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    fe: {
        height: 20,
        width: 95,
    },
    mc: {
        height: 20,
        width: 75,
    },
});

export default SplashScreen;
