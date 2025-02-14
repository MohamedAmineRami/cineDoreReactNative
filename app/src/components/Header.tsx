import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logoCinedore.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.cineTitulo}>
                        CINE <Text style={{ fontWeight: 'bold' }}>DORÉ</Text>
                    </Text>
                </View>
                <View style={styles.rightLogosContainer}>
                    <Image
                        source={require('../assets/images/ministerio.png')}
                        style={styles.rightLogo}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/images/filmotecaLogoText.png')}
                        style={styles.rightLogo}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A0F24',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        gap:0
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
});

export default Header;