// src/screens/Register.tsx
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/Input';
import Button from '../../components/buttons/Button';
import { register } from '../../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [document, setDocument] = useState('');
    const navigation = useNavigation<NavigationProp<any>>();

    const handleRegister = async () => {
        if (email !== confirmEmail) {
            Alert.alert('Error', 'Los correos electrónicos no coinciden');
            return;
        }
        if (password.length < 10) {
            Alert.alert('Error', 'La contraseña debe tener al menos 10 caracteres');
            return;
        }

        try {
            const userData = {
                nombre: firstName,
                apellidos: lastName,
                correoElectronico: email,
                contrasenia: password,
                telefono: phone,
                identificacion: document,
                fechaNacimiento: birthDate,
            };
            await register(userData);
            Alert.alert('Éxito', 'Usuario registrado correctamente');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Error al registrar el usuario');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/loginBackground.png')}
            style={styles.container}
        >
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Crear tu cuenta</Text>

                    <Input
                        label="Dirección de correo electrónico*"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Input
                        label="Confirmar correo electrónico*"
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                        keyboardType="email-address"
                    />

                    <Input
                        label="Contraseña*"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Input
                        label="Nombre*"
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <Input
                        label="Apellidos*"
                        value={lastName}
                        onChangeText={setLastName}
                    />

                    <Input
                        label="Fecha de nacimiento*"
                        value={birthDate}
                        onChangeText={setBirthDate}
                        placeholder="YYYY/MM/DD"
                    />

                    <Input
                        label="Teléfono"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <Input
                        label="DNI/NIE/Pasaporte"
                        value={document}
                        onChangeText={setDocument}
                    />
                    <Button title="Crear cuenta" onPress={handleRegister} />
                </ScrollView>
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
    scrollView: {
        flex: 1,
        padding: 20,
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
});

export default Register;