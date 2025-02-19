import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {getUserProfile, logout} from "../../services/auth";
import * as SecureStore from 'expo-secure-store';
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import {useAuth} from "../../hooks/useAuth";
import { DangerButton } from '../../components/buttons/DangerButton';
import {ConfirmationModal} from "../../modals/ConfirmationModal";

interface ProfileProps {
    setUser: (value: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ setUser }) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { handleDeleteAccount } = useAuth(setUser);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [userProfile, setUserProfile] = useState<{
        nombre: string;
        apellidos: string;
        correoElectronico: string;
        telefono?: string;
    } | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await getUserProfile();
                setUserProfile(profileData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        await logout(); // Call the logout function
        await SecureStore.deleteItemAsync('token'); // Remove the token from SecureStore
        setUser(false); // Update the user state to false
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <ImageBackground source={require('../../assets/images/ProfileBG.png')} style={styles.ProfileBG}>
                    <Header />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.backButtonText}>← Ir a Cartelera</Text>
                    </TouchableOpacity>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>¡Hola!</Text>
                        <Text style={styles.nameText}>
                            Bienvenido, {userProfile ? `${userProfile.nombre} ${userProfile.apellidos}` : 'Usuario'}
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleLogout}>
                            <LinearGradient
                                colors={['#5CE1FF', '#4B6DEE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.signOutButton}
                            >
                                <Text style={styles.buttonText}>Cerrar sesión</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <DangerButton
                            text="Eliminar cuenta"
                            onPress={() => setShowDeleteConfirmation(true)}
                        />
                    </View>
                </ImageBackground>
            </ScrollView>
            <ConfirmationModal
                isVisible={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                onConfirm={handleDeleteAccount}
                title="Confirmar eliminación"
                message="¿Está seguro que desea eliminar su cuenta? Esta acción no se puede deshacer."
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
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

export default Profile;