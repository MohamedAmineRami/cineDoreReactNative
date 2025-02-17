import React from 'react';
import { TouchableOpacity, Text, StyleSheet,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
    title: string;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'text';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary' }) => {
    if (type === 'primary') {
        return (
            <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
                <LinearGradient
                    colors={['#5CE1FF', '#4B6DEE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <Text style={styles.primaryButtonText}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    } else if (type === 'secondary') {
        return (
            <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
                <Text style={styles.secondaryButtonText}>{title}</Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity style={styles.textButton} onPress={onPress}>
                <Text style={styles.textButtonText}>{title}</Text>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    primaryButton: {
        width: '100%',
        height: 60,
        borderRadius: 8,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 10,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButton: {
        height: 60,
        backgroundColor: 'transparent',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginBottom: 12,
    },
    secondaryButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    textButton: {
        paddingVertical: 10,
    },
    textButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});

export default Button;