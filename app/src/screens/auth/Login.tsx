import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/Input';
import Button from '../../components/buttons/Button';
import { login } from '../../services/auth';
import * as SecureStore from 'expo-secure-store';

interface LoginProps {
    setUser: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await login(email, password);
            await SecureStore.setItemAsync('token', response.token); // Store JWT token
            setUser(true); // Update user state
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/loginBackground.png')}
            style={styles.container}
        >
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.title}>Inicia sesión</Text>

                <Input
                    label="Dirección de correo electrónico*"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Input
                    label="Contraseña*"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
                ) : (
                    <Button title="Iniciar sesión" onPress={handleLogin} />
                )}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        flex: 1,
    },
    keyboardView: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        marginTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
    },
    loader: {
        marginVertical: 20,
    },
});

export default Login;