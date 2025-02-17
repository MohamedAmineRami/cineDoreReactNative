import { useCallback } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { deleteAccount } from '../services/api';

export const useAuth = (setUser: (value: boolean) => void) => {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleDeleteAccount = useCallback(async () => {
        try {
            await deleteAccount();
            await SecureStore.deleteItemAsync('token');
            setUser(false);
        } catch (error) {
            console.error('Error deleting account:', error);
            Alert.alert(
                'Error',
                'No se pudo eliminar la cuenta. Por favor, intente nuevamente.'
            );
        }
    }, [navigation, setUser]);

    return {
        handleDeleteAccount
    };
};