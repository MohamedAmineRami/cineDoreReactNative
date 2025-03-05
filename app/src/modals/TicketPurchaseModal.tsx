import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {TicketPurchaseModalProps} from "../types";
import {Clock} from "lucide-react-native";
import {LinearGradient} from "expo-linear-gradient";
import {createTicketPurchase} from "../services/ticket";
import * as SecureStore from 'expo-secure-store';

const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({
                                                                     visible,
                                                                     onClose,
                                                                     movie,
                                                                     selectedDate,
                                                                     selectedTime,
                                                                     selectedSala,
                                                                     onPurchaseComplete,
                                                                     navigation
                                                                 }) => {
    const [quantities, setQuantities] = useState({
        general: 0,
        reduced: 0,
        free: 0,
    });
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        if (!visible) {
            setQuantities({ general: 0, reduced: 0, free: 0 });
        }

        if (visible) {
            const getUserId = async () => {
                try {
                    const userIdStr = await SecureStore.getItemAsync('userId');
                    setUserId(userIdStr ? parseInt(userIdStr) : null);
                } catch (error) {
                    console.error("Error retrieving userId:", error);
                }
            };
            getUserId();
        }
    }, [visible]);

    const updateQuantity = (type, increment) => {
        setQuantities((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + increment),
        }));
    };

    const total = (quantities.general * 3 + quantities.reduced * 2).toFixed(2);
    const totalTickets = quantities.general + quantities.reduced + quantities.free;

    const handlePurchase = async () => {
        if (totalTickets === 0) {

            Alert.alert("Error", "Debes seleccionar al menos una entrada", [{ text: "OK" }]);
            return;
        }

        if (!userId) {
            Alert.alert("Error", "Usuario no encontrado. Por favor, inicia sesión nuevamente.", [{ text: "OK" }]);
            return;
        }

        setLoading(true);

        try {

            const tickets = [];

            for (let i = 0; i < quantities.general; i++) {
                tickets.push({
                    codigoQr: `qr-general-${Date.now()}-${i}`,
                    estadoId: 1
                });
            }

            for (let i = 0; i < quantities.reduced; i++) {
                tickets.push({
                    codigoQr: `qr-reduced-${Date.now()}-${i}`,
                    estadoId: 1
                });
            }

            for (let i = 0; i < quantities.free; i++) {
                tickets.push({
                    codigoQr: `qr-free-${Date.now()}-${i}`,
                    estadoId: 1
                });
            }

            const purchaseData = {
                usuarioId: userId,
                funcionId: movie.funciones.find(f => f.sala === selectedSala)?.id || 1,
                totalPago: parseFloat(total),
                tickets: tickets
            };

            console.log("Sending ticket data:", purchaseData);

            const response = await createTicketPurchase(purchaseData);

            const ticketData = {
                funcionId: purchaseData.funcionId,
                tituloPelicula: movie.nombre,
                fechaFuncion: new Date().toISOString(),
                cantidadTickets: totalTickets,
                sala: selectedSala,
                clasificacion: movie.clasificacion,
                lenguaje: movie.lenguaje || 'ESP',
                duracion: movie.duracion || 120,
                codigoQr: tickets[0].codigoQr
            };

            onPurchaseComplete(ticketData);

            onClose();

            navigation.navigate('TicketScreen', { ticketData });

        } catch (error) {
            console.error("ERROR Error purchasing ticket:", error);
            Alert.alert(
                "Error",
                "No se pudo completar la compra. Inténtalo de nuevo.",
                [{ text: "OK" }]
            );
        } finally {
            setLoading(false);
        }
    };

    if (!visible) return null;

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <LinearGradient
                colors={['#00060F', '#041B35']}
                style={styles.gradient}
            >
                <View style={styles.container}>
                    <View style={styles.modalContent}>

                        <View style={styles.movieInfoBorder}>
                            <View style={styles.movieInfoHeader}>
                                <View style={styles.ageRatingContainer}>
                                    <Text style={styles.ageRatingText}>
                                        {movie.clasificacion}
                                    </Text>
                                </View>

                                <View style={styles.movieTitleContainer}>
                                    <Text style={styles.movieTitle}>{movie.nombre }</Text>

                                    <View style={styles.durationContainer}>
                                        <Clock size={18} color="#fff" />
                                        <Text style={styles.durationText}>
                                            {movie.duracion ? `${Math.floor(movie.duracion/60)}h ${movie.duracion%60}m` : '1h 14m'}
                                        </Text>
                                    </View>

                                    <View style={styles.languageContainer}>
                                        <Text style={styles.languageText}>
                                            {movie.lenguaje}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.sessionInfoContainer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {selectedDate}
                                    </Text>
                                </View>

                                <View style={styles.timeContainer}>
                                    <Text style={styles.timeText}>
                                        {selectedTime }
                                    </Text>
                                </View>

                                <View style={styles.roomContainer}>
                                    <Text style={styles.roomLabel}></Text>
                                    <Text style={styles.roomNumber}>{selectedSala }</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.ticketSelectionContainer}>

                            <View style={styles.ticketTypeRow}>
                                <View style={styles.ticketInfoContainer}>
                                    <Text style={styles.ticketTypeText}>Entrada general</Text>
                                </View>

                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceText}>3 €</Text>
                                </View>

                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        onPress={() => updateQuantity('general', -1)}
                                        style={styles.quantityButton}
                                    >
                                        <Text style={styles.quantityButtonText}>-</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>{quantities.general}</Text>

                                    <TouchableOpacity
                                        onPress={() => updateQuantity('general', 1)}
                                        style={styles.quantityButton}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.ticketTypeRow}>
                                <View style={styles.ticketInfoContainer}>
                                    <Text style={styles.ticketTypeText}>Entrada reducida</Text>
                                    <Text style={styles.eligibilityText}>Estudiantes</Text>
                                    <Text style={styles.eligibilityText}>Familias numerosas</Text>
                                    <Text style={styles.eligibilityText}>Grupos vinculados a instituciones culturales o educativas</Text>
                                    <Text style={styles.eligibilityText}>Mayores a 65 años</Text>
                                    <Text style={styles.eligibilityText}>En situación de desempleo</Text>
                                </View>

                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceText}>2 €</Text>
                                </View>

                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        onPress={() => updateQuantity('reduced', -1)}
                                        style={styles.quantityButton}
                                    >
                                        <Text style={styles.quantityButtonText}>-</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>{quantities.reduced}</Text>

                                    <TouchableOpacity
                                        onPress={() => updateQuantity('reduced', 1)}
                                        style={styles.quantityButton}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.ticketTypeRow}>
                                <View style={styles.ticketInfoContainer}>
                                    <Text style={styles.ticketTypeText}>Entrada gratuita</Text>
                                    <Text style={styles.eligibilityText}>Menor de 18 años</Text>
                                    <Text style={styles.eligibilityText}>Con discapacidad {'>'}= 33% + Acompañante</Text>
                                </View>

                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceText}>0 €</Text>
                                </View>

                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        onPress={() => updateQuantity('free', -1)}
                                        style={styles.quantityButton}
                                    >
                                        <Text style={styles.quantityButtonText}>-</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>{quantities.free}</Text>

                                    <TouchableOpacity
                                        onPress={() => updateQuantity('free', 1)}
                                        style={styles.quantityButton}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.totalContainer}>
                                <Text style={styles.totalLabel}>
                                    Total <Text style={styles.totalVAT}>(IVA incluido)</Text>
                                </Text>
                                <Text style={styles.totalAmount}>{total}€</Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.purchaseButton,
                                    (quantities.general + quantities.reduced + quantities.free === 0 || loading) && styles.disabledButton
                                ]}
                                onPress={handlePurchase}
                                disabled={quantities.general + quantities.reduced + quantities.free === 0 || loading}
                            >
                                <LinearGradient
                                    colors={['#4CC9F0', '#4361EE']}
                                    style={styles.gradientButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" size="small" />
                                    ) : (
                                        <Text style={styles.buttonText}>Comprar</Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onClose}
                                disabled={loading}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop:150,
    },
    modalContent: {
        flex: 1,
        marginBottom: 12
    },
    backButton: {
        padding: 16,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButtonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '300',
        marginLeft: 8
    },
    movieInfoBorder: {
        margin: 9,
        borderWidth: 1,
        borderColor: '#fff',
        overflow: 'hidden'
    },
    movieInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        gap: 2
    },
    ageRatingContainer: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    ageRatingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    movieTitleContainer: {
        flex: 1,
        flexDirection:"row"
    },
    movieTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:7
    },
    durationContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        left: 210,
        marginTop:11
    },
    durationText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 16,
    },
    languageContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: '#fff',
        borderWidth: 1,
        alignSelf: 'flex-start',
        padding: 1,
        left: 290,
        marginTop:9
    },
    languageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sessionInfoContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#fff',
    },
    dateContainer: {
        flex: 2,
        padding: 15,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    dateText: {
        color: 'white',
        fontSize: 16,
    },
    timeContainer: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    timeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    roomContainer: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roomLabel: {
        color: 'white',
        fontSize: 16,
        marginRight: 5,
    },
    roomNumber: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ticketSelectionContainer: {
        flex: 1,
        padding: 30,
    },
    ticketTypeRow: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    ticketInfoContainer: {
        flex: 1,
    },
    ticketTypeText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eligibilityText: {
        color: '#aaa',
        fontSize: 14,
    },
    priceContainer: {
        width: 60,
        alignItems: 'center',
    },
    priceText: {
        color: 'white',
        fontSize: 17,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 110,
        justifyContent: 'space-between',
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        width: 30,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:10
    },
    totalLabel: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    totalVAT: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    totalAmount: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    purchaseButton: {
        marginBottom: 10,
    },
    gradientButton: {
        borderRadius: 11,
        padding: 15,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 11,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E88E5',
    },
    disabledButton: {

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default TicketPurchaseModal;