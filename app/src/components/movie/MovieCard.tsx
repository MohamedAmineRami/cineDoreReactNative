import React, { useState } from 'react';
import {TouchableOpacity, Image, StyleSheet, ActivityIndicator, View, Text} from 'react-native';
import { Movie } from '../../types';

interface MovieCardProps {
    movie: Movie;
    onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image
                source={{ uri: movie.imagenPoster }}
                style={styles.poster}
                onError={(error) => {
                    console.error('Image loading error:', error.nativeEvent.error);
                    setImageError(true);
                }}
                onLoad={() => setIsLoading(false)}
                onLoadStart={() => setIsLoading(true)}
            />
            {isLoading && (
                <ActivityIndicator
                    style={StyleSheet.absoluteFill}
                    size="large"
                    color="#000"
                />
            )}
            {imageError && (
                <View style={[styles.poster, styles.errorContainer]}>
                    <Text>Error loading image</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '48%',
        borderRadius: 8,
        overflow: 'hidden',
        padding: 8,
        marginLeft: 7,

    },
    poster: {
        width: '98%',
        height: 250,
        borderRadius: 20,
    },
    errorContainer: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MovieCard;