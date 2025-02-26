import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import MinesterioCultura from "../assets/svgr/MinesterioCultura";
import FilmotecaEspanola from "../assets/svgr/FilmotecaEspanola";
import LogoCineDore from "../assets/svgr/LogoCineDore";

const SplashScreen = () => {
    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['#0a1933', '#081428']}
                style={styles.background}
            >
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <LogoCineDore/>
                    </View>

                    <View style={styles.rightLogosContainer}>
                        <View
                            style={styles.mc}
                        ><MinesterioCultura /></View>
                        <View
                            style={styles.fe}
                        ><FilmotecaEspanola/></View>
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
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        flex: 1,
        width: 270,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    rightLogosContainer: {
        position: 'absolute',
        bottom: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },    fe:  {
        height: 20,
        width: 95,
    },
    mc:  {
        height:20,
        width: 75,
    },


});

export default SplashScreen;