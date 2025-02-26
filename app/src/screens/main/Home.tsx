import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PalestineBanner from '../../palestinaBanner/PalestineBanner';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import FeaturedSection from '../../components/movie/FeaturedSection';
import MovieGrid from '../../components/movie/MovieGrid';
import MovieDetailModal from '../../modals/MovieDetailModal';
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
        setSelectedMovieId(movie.id);
        setModalVisible(true);
    };

    return (
        <LinearGradient
            colors={['#00060F', '#000B17']}
            style={styles.gradient}
        >
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
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContent: {
        flex: 1,
    },
});

export default Home;