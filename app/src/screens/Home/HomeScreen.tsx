import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
//import MovieDetailModal from './MovieDetailModal';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import MovieDetailModal from "../../modals/MovieDetailModal";
import PalestineBanner from "../../palestinaBanner/PalestineBanner";

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const moviePosters = [
        { id: 1, title: 'La Dolce Vita', image: require('../../assets/images/Movie1.png') },
        { id: 2, title: 'El Valle del Fugitivo', image: require('../../assets/images/Movie2.png') },
        { id: 3, title: 'Flores de Otro Mundo', image: require('../../assets/images/Movie3.png') },
        { id: 4, title: 'Raices Profundas', image: require('../../assets/images/Movie4.png') },
    ];

    const handleMoviePress = (movie) => {
        setSelectedMovie(movie);
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

                {/* Featured Section */}
                <View style={styles.featuredContainer}>
                    <Image
                        source={require('../../assets/images/Palestina.jpg')}
                        style={styles.featuredImage}
                        resizeMode="cover"
                    />
                    <View style={styles.featuredOverlay}>
                        <Text style={styles.featuredSubtitle}>Este mes esta dedicado a:</Text>
                        <Text style={styles.featuredTitle}>PELICULAS PALESTINAS</Text>
                        <View style={styles.closedBanner}>
                            <LinearGradient
                                colors={['#5CE1FF', '#4B6DEE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            >
                                <Text style={styles.closedText}>Cerrado: 1 y 6 Enero</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </View>

                {/* Movie Grid */}
                <View style={styles.movieGrid}>
                    {moviePosters.map((movie) => (
                        <TouchableOpacity
                            key={movie.id}
                            style={styles.movieCard}
                            onPress={() => handleMoviePress(movie)}
                        >
                            <Image source={movie.image} style={styles.moviePoster} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <BottomNav />
            <MovieDetailModal
                visible={modalVisible}
                movie={selectedMovie}
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
    featuredContainer: {
        height: 300,
        position: 'relative',
    },
    featuredImage: {
        width: '90%',
        height: '90%',
        borderRadius: 25,
        marginLeft: 20,
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    featuredSubtitle: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 15,
    },
    featuredTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 15,
    },
    gradient: {
        width: 250,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 45,
    },
    closedBanner: {
        padding: 8,
        marginTop: 12,
    },
    closedText: {
        color: '#fff',
        fontSize: 14,
    },
    movieGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    movieCard: {
        width: (width - 32) / 2,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    moviePoster: {
        width: '100%',
        height: 250,
        borderRadius: 8,
    },
});

export default HomeScreen;