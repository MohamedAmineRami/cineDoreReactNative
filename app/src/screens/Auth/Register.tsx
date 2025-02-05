import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register = () => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [document, setDocument] = useState('');
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;

    const handleRegister = async () => {
        if (email !== confirmEmail) {
            alert('Los correos electrónicos no coinciden');
            return;
        }
        if (password.length < 10) {
            alert('La contraseña debe tener al menos 10 caracteres');
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Error al registrar: ' + error.message);
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
                        placeholder="DD/MM/YYYY"
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
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 20,
        marginTop: 50,
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
    },
});

export default Register;