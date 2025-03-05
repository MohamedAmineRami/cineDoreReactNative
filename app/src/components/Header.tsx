import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilmotecaEspanola from "../assets/svgr/FilmotecaEspanola";
import MinesterioCultura from "../assets/svgr/MinesterioCultura";
import LogoCineDore from "../assets/svgr/LogoCineDore";

const Header = () => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000B17',
        paddingVertical: 16,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    logoContainer: {
        height: 30,
        width: 157.09,
    },
    logo: {
        height: 17,
        width: 30,
        marginTop: 5
    },
    cineTitulo:{
        color: 'white',
        fontSize:20
    },
    rightLogosContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    rightLogo: {
        height: 30,
        width: 80,
    },
    fe:  {
        height: 13,
        width: 63,
    },
    mc:  {
        height: 13,
        width: 53,
    },
});

export default Header;