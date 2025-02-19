import React from 'react';
import { View, StyleSheet } from 'react-native';
import MovieCard from '../movie/MovieCard';
import { Movie } from '../../types';

interface MovieGridProps {
    movies: Movie[];
    onMoviePress: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMoviePress }) => {
    return (
        <View style={styles.container}>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onPress={() => onMoviePress(movie)} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default MovieGrid;