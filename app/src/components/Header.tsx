import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image
                source={require('../assets/images/logoCinedore.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: '#000',
    },
    logo: {
        height: 40,
        width: '100%',
        marginTop: 15,
    },
});

export default Header;