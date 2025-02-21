import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface DangerButtonProps {
    onPress: () => void;
    text: string;
    style?: object;
}

export const DangerButton: React.FC<DangerButtonProps> = ({
                                                              onPress,
                                                              text,
                                                              style
                                                          }) => (
    <TouchableOpacity
        style={[styles.dangerButton, style]}
        onPress={onPress}
    >
        <Text style={styles.dangerButtonText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    dangerButton: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF4444',
        alignItems: 'center',
        marginTop: 10,
    },
    dangerButtonText: {
        color: '#FF4444',
        fontSize: 16,
        fontWeight: 'bold',
    },
});