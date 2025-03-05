import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {LinearGradient} from "expo-linear-gradient";
import QRCode from 'react-native-qrcode-svg';
import Header from "../../components/Header";
import {RootStackParamList} from "../../types";

type TicketScreenProps = NativeStackScreenProps<RootStackParamList, 'TicketScreen'>;

const TicketScreen: React.FC<TicketScreenProps> = ({ route, navigation }) => {
    const ticketData = route.params?.ticketData;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.goBack();
        }, 30000); // 30 seconds

        return () => clearTimeout(timer);
    }, [navigation]);

    if (!ticketData) {
        navigation.goBack();
        return null;
    }

    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return {
                    date: 'Fecha no disponible',
                    time: 'Hora no disponible'
                };
            }

            const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
            return {
                date: date.toLocaleDateString('es-ES', options),
                time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            };
        } catch (error) {
            console.error('Error formatting date:', error);
            return {
                date: 'Fecha no disponible',
                time: 'Hora no disponible'
            };
        }
    };

    const { date, time } = formatDateTime(ticketData.fechaFuncion);
    const totalTickets = ticketData.cantidadTickets || 0;
    const qrValue = ticketData.codigoQr || `Purchase-${ticketData.funcionId}`;
    const movieTitle = ticketData.tituloPelicula || 'Película';
    const classification = ticketData.clasificacion || 'TP';
    const language = ticketData.lenguaje || 'ESP';
    const duration = ticketData.duracion || 0;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000B17" />
            <Header />

            <LinearGradient
                colors={['#00060F', '#041B35']}
                style={styles.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.ticketContainer}>
                        {/* QR Code Section */}
                        <View style={styles.qrSection}>
                            <QRCode
                                value={qrValue}
                                size={200}
                                backgroundColor="white"
                            />
                            <Text style={styles.entriesText}>
                                x{totalTickets} {totalTickets === 1 ? 'Entrada' : 'Entradas'}
                            </Text>
                        </View>

                        {/* Movie Details Section */}
                        <View style={styles.detailsSection}>
                            <View style={styles.movieInfoContainer}>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingText}>{classification}</Text>
                                </View>
                                <Text style={styles.movieTitle}>{movieTitle}</Text>
                                <View style={styles.durationContainer}>
                                    <Text style={styles.durationText}>{hours}h {minutes}m</Text>
                                </View>
                                <View style={styles.voseContainer}>
                                    <Text style={styles.voseText}>{language}</Text>
                                </View>
                            </View>

                            <View style={styles.dateTimeContainer}>
                                <View style={styles.dateColumn}>
                                    <Text style={styles.dateLabel}>{date}</Text>
                                </View>
                                <View style={styles.timeColumn}>
                                    <Text style={styles.timeLabel}>{time}</Text>
                                </View>
                                <View style={styles.salaColumn}>
                                    <Text style={styles.salaNumber}>{ticketData.sala || 1}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <LinearGradient
                        colors={['#4CC9F0', '#4361EE']}
                        style={styles.gradientButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.doneButtonText}>Finalizar Compra</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000B17',
    },
    background: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    ticketContainer: {
        width: 390,
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 15,
        padding: 10
    },
    qrSection: {
        paddingVertical: 25,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    entriesText: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    detailsSection: {
        paddingBottom: 26,
    },
    movieInfoContainer: {
        flexDirection:"row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderTopWidth: 1,
        borderTopColor: '#000',
        justifyContent: 'space-between',
        borderLeftWidth: 1,
        borderLeftColor: '#000',
        borderRightWidth: 1,
        borderRightColor: '#00',
    },
    ratingContainer: {
        backgroundColor: 'transparent',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
        borderColor: '#000000',
        borderWidth: 1,
    },
    ratingText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14
    },
    movieTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,

    },
    durationText: {
        color: '#666',
        fontSize: 14,
    },
    voseContainer: {
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start'
    },
    voseText: {
        fontSize: 14,
        fontWeight: '500',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderLeftWidth: 1,
        borderLeftColor: '#000',

    },
    dateColumn: {
        flex: 1.5,
        padding: 12,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    dateLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    timeColumn: {
        flex: 0.8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    timeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    salaColumn: {
        flex: 0.8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    salaLabel: {
        fontSize: 12,
    },
    salaNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    gradientButton:{
        padding: 15,
        alignItems: 'center',
        borderRadius: 11,
        marginTop: 20,
        width: 300
    },
    doneButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default TicketScreen;