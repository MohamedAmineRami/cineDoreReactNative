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
                <View style={styles.flagContainer}>

                    <View style={styles.flagStripeBlack} />
                    <View style={styles.flagStripeWhite} />
                    <View style={styles.flagStripeGreen} />
                    <View style={styles.flagTriangle} />
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
    learnMore: {
        color: '#FFFFFF',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 5,
        fontSize: 14,
    },
    flagContainer: {
        width: 30,
        height: 20,
        marginRight: 10,
        position: 'relative',
        overflow: 'hidden',
    },
    flagStripeBlack: {
        position: 'absolute',
        width: '100%',
        height: '33.33%',
        backgroundColor: '#000000',
        top: 0,
    },
    flagStripeWhite: {
        position: 'absolute',
        width: '100%',
        height: '33.33%',
        backgroundColor: '#FFFFFF',
        top: '33.33%',
    },
    flagStripeGreen: {
        position: 'absolute',
        width: '100%',
        height: '33.33%',
        backgroundColor: '#009900',
        top: '66.66%',
    },
    flagTriangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderBottomWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: '#FF0000',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        left: 0,
    },
});

export default PalestineBanner;