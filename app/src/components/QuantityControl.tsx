// components/QuantityControl.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuantityControlProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <View style={styles.quantityControl}>
            <TouchableOpacity onPress={onDecrease}>
                <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrease}>
                <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    quantityButton: {
        color: '#fff',
        fontSize: 24,
        paddingHorizontal: 20,
    },
    quantity: {
        color: '#fff',
        fontSize: 18,
        paddingHorizontal: 20,
    },
});

export default QuantityControl;