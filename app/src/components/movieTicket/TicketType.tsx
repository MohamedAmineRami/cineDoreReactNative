import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuantityControl from '../../components/movieTicket/QuantityControl';

interface TicketTypeProps {
    title: string;
    price: string;
    subtitles: string[];
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const TicketType: React.FC<TicketTypeProps> = ({ title, price, subtitles, quantity, onIncrease, onDecrease }) => (
    <View style={styles.ticketType}>
        <Text style={styles.ticketTitle}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        {subtitles.map((subtitle, index) => (
            <Text key={index} style={styles.subtitle}>{subtitle}</Text>
        ))}
        <QuantityControl
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    </View>
);

const styles = StyleSheet.create({
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
});

export default TicketType;