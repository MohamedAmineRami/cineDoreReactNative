import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '../../../../FirebaseConfig';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import {NavigationProp, useNavigation} from "@react-navigation/native";

const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const handleSignOut = async () => {
        try {
            await FIREBASE_AUTH.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <ImageBackground source={require('../../assets/images/ProfileBG.png')} style={styles.ProfileBG}>
                    <Header/>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('Inside')}
                    >
                        <Text style={styles.backButtonText}>← Ir a Cartelera</Text>
                    </TouchableOpacity>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>¡Hola!</Text>
                        <Text style={styles.nameText}>Bienvenido, Yahya Sinwar</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSignOut}>
                            <LinearGradient
                                colors={['#5CE1FF', '#4B6DEE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.signOutButton}
                            >
                                <Text style={styles.buttonText}>Cerrar sesión</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteAccountButton}>
                            <Text style={styles.deleteAccountText}>Eliminar cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>

            <BottomNav />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000B1F',
    },
    scrollContent: {
        flex: 1,
    },
    ProfileBG: {
        height: '110%',
    },
    backButton: {
        top: 10,
        left: 16,
        zIndex: 1,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 15,
    },
    welcomeContainer: {
        padding: 20,
        marginTop: 40,
    },
    welcomeText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    nameText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    buttonContainer: {
        padding: 20,
        marginTop: 340,
    },
    signOutButton: {
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteAccountButton: {
        alignItems: 'center',
    },
    deleteAccountText: {
        color: 'white',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default ProfileScreen;