import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const PalestineBanner = ({ statement, externalLink }) => {
    const handlePress = async () => {
        if (await Linking.canOpenURL(externalLink)) {
            await Linking.openURL(externalLink);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>{statement}</Text>
                <Text style={styles.learnMore}>Learn More →</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#000000',
        padding: 15,
        width: '100%',
    },
    bannerText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    learnMore: {
        color: '#FFFFFF',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 5,
        fontSize: 14,
    },
});

export default PalestineBanner;