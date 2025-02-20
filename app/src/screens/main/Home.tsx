import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PalestineBanner from '../../palestinaBanner/PalestineBanner';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import FeaturedSection from '../../components/movie/FeaturedSection';
import MovieGrid from '../../components/movie/MovieGrid';
import MovieDetailModal from '../../components/movieTicket/MovieDetailModal';
import { fetchMovies } from '../../services/movies';
import { Movie } from '../../types';

const Home = () => {
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies();
                setMovies(data);
            } catch (error) {
                console.error('Failed to load movies:', error);
            }
        };
        loadMovies();
    }, []);

    const handleMoviePress = (movie: Movie) => {
        setSelectedMovieId(movie.id); // Movie type has an id property
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <PalestineBanner
                statement="We stand in solidarity with the people of palestine."
                externalLink="https://blog.paulbiggar.com/i-cant-sleep/"
            />
            <ScrollView style={styles.scrollContent}>
                <Header />
                <FeaturedSection />
                <MovieGrid movies={movies} onMoviePress={handleMoviePress} />
            </ScrollView>
            <BottomNav />
            <MovieDetailModal
                visible={modalVisible}
                movieId={selectedMovieId}
                onClose={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContent: {
        flex: 1,
    },
});

export default Home;