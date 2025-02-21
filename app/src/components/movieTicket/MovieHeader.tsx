import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface MovieHeaderProps {
    imageUrl: string;
    onBack: () => void;
}

const MovieHeader: React.FC<MovieHeaderProps> = ({ imageUrl, onBack }) => (
    <View>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Atrás</Text>
        </TouchableOpacity>
        <Image source={{ uri: imageUrl }} style={styles.modalImage} />
    </View>
);

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 1,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalImage: {
        width: '100%',
        height: 450,
    },
});

export default MovieHeader;