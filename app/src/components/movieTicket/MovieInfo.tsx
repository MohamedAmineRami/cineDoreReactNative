import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MovieInfoProps {
    title: string;
    age: string;
    duration: string;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ title, age, duration }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.age}>{age}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration}</Text>
    </View>
);

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 24,
    },
    age: {
        color: '#fff',
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    duration: {
        color: '#888',
        fontSize: 14,
    },
});

export default MovieInfo;