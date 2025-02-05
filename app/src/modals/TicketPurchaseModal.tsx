import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QuantityControl from '../components/QuantityControl';

const TicketPurchaseModal = ({ visible, onClose, movie, selectedDate, selectedTime }) => {
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
                    <Image source={movie?.image} style={styles.movieBanner} />

                    <View style={styles.movieInfo}>
                        <View style={styles.ageRating}>
                            <Text style={styles.ageText}>18</Text>
                        </View>
                        <Text style={styles.movieTitle}>{movie?.title}</Text>
                        <Text style={styles.movieTime}>
                            {selectedDate} - {selectedTime} - Sala: 1
                        </Text>
                    </View>

                    <View style={styles.ticketSection}>
                        <View style={styles.ticketType}>
                            <Text style={styles.ticketTitle}>Entrada general</Text>
                            <Text style={styles.price}>3 €</Text>
                            <QuantityControl
                                quantity={quantities.general}
                                onIncrease={() => updateQuantity('general', 1)}
                                onDecrease={() => updateQuantity('general', -1)}
                            />
                        </View>

                        <View style={styles.ticketType}>
                            <Text style={styles.ticketTitle}>Entrada reducida</Text>
                            <Text style={styles.price}>2 €</Text>
                            <Text style={styles.subtitle}>Estudiantes</Text>
                            <Text style={styles.subtitle}>Familias numerosas</Text>
                            <Text style={styles.subtitle}>Grupos vinculados a instituciones culturales o educativas</Text>
                            <Text style={styles.subtitle}>Mayores a 65 años</Text>
                            <Text style={styles.subtitle}>En situación de desempleo</Text>
                            <QuantityControl
                                quantity={quantities.reduced}
                                onIncrease={() => updateQuantity('reduced', 1)}
                                onDecrease={() => updateQuantity('reduced', -1)}
                            />
                        </View>

                        <View style={styles.ticketType}>
                            <Text style={styles.ticketTitle}>Entrada gratuita</Text>
                            <Text style={styles.price}>0 €</Text>
                            <Text style={styles.subtitle}>Menor de 18 años</Text>
                            <Text style={styles.subtitle}>Con discapacidad {'>'}= 33% + Acompañante</Text>
                            <QuantityControl
                                quantity={quantities.free}
                                onIncrease={() => updateQuantity('free', 1)}
                                onDecrease={() => updateQuantity('free', -1)}
                            />
                        </View>
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
    ticketType: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    ticketTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        color: '#4CC9F0',
        fontSize: 24,
        marginVertical: 10,
    },
    subtitle: {
        color: '#999',
        fontSize: 14,
        marginBottom: 4,
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