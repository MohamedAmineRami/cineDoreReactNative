import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Movie, Funcion } from '../../types';
import TicketType from '../../components/movieTicket/TicketType';

interface TicketPurchaseModalProps {
    visible: boolean;
    onClose: () => void;
    movie: Movie;
    funcion: Funcion | null;
}

const TicketPurchaseModal = ({ visible, onClose, movie, funcion }) => {
    const [quantities, setQuantities] = useState({
        general: 0,
        reduced: 0,
        free: 0,
    });

    const updateQuantity = (type, increment) => {
        setQuantities((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + increment),
        }));
    };

    const total = (quantities.general * 3 + quantities.reduced * 2).toFixed(2);

    if (!funcion) return null;

    const date = new Date(funcion.fechaHora).toLocaleDateString();
    const time = new Date(funcion.fechaHora).toLocaleTimeString();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.purchaseContainer}>
                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                    <Text style={styles.backButtonText}>← Atrás</Text>
                </TouchableOpacity>

                <ScrollView style={styles.purchaseContent}>
                    <Image source={{ uri: movie.imagenPoster }} style={styles.movieBanner} />

                    <View style={styles.movieInfo}>
                        <View style={styles.ageRating}>
                            <Text style={styles.ageText}>18</Text>
                        </View>
                        <Text style={styles.movieTitle}>{movie.nombre}</Text>
                        <Text style={styles.movieTime}>
                            {date} - {time} - Sala: {funcion.sala.nombre}
                        </Text>
                    </View>

                    <View style={styles.ticketSection}>
                        <TicketType
                            title="Entrada general"
                            price="3 €"
                            subtitles={[]}
                            quantity={quantities.general}
                            onIncrease={() => updateQuantity('general', 1)}
                            onDecrease={() => updateQuantity('general', -1)}
                        />

                        <TicketType
                            title="Entrada reducida"
                            price="2 €"
                            subtitles={[
                                'Estudiantes',
                                'Familias numerosas',
                                'Grupos vinculados a instituciones culturales o educativas',
                                'Mayores a 65 años',
                                'En situación de desempleo',
                            ]}
                            quantity={quantities.reduced}
                            onIncrease={() => updateQuantity('reduced', 1)}
                            onDecrease={() => updateQuantity('reduced', -1)}
                        />

                        <TicketType
                            title="Entrada gratuita"
                            price="0 €"
                            subtitles={[
                                'Menor de 18 años',
                                'Con discapacidad >= 33% + Acompañante',
                            ]}
                            quantity={quantities.free}
                            onIncrease={() => updateQuantity('free', 1)}
                            onDecrease={() => updateQuantity('free', -1)}
                        />
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.totalSection}>
                        <Text style={styles.totalText}>Total (IVA incluido)</Text>
                        <Text style={styles.totalAmount}>{total}€</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.purchaseButton}
                        onPress={onClose}
                    >
                        <LinearGradient
                            colors={['#4CC9F0', '#4361EE']}
                            style={styles.gradientButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.buttonText}>Comprar</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    purchaseContainer: {
        flex: 1,
        backgroundColor: '#000000ee',
    },
    purchaseContent: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    movieBanner: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    movieInfo: {
        padding: 20,
    },
    movieTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    movieTime: {
        color: '#999',
        fontSize: 16,
        marginTop: 5,
    },
    ageRating: {
        backgroundColor: '#4361EE',
        padding: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    ageText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    ticketSection: {
        padding: 20,
    },
    footer: {
        padding: 20,
        backgroundColor: '#1a1a1a',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    totalText: {
        color: '#fff',
        fontSize: 18,
    },
    totalAmount: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    purchaseButton: {
        marginBottom: 10,
    },
    gradientButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4361EE',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#4361EE',
        fontSize: 18,
    },
});

export default TicketPurchaseModal;