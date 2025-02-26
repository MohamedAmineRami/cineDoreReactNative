import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login as apiLogin, logout as apiLogout, getUserProfile as apiGetUserProfile } from '../services/auth';

interface User {
    id: number;
    nombre?: string;
    correoElectronico?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                const userId = await SecureStore.getItemAsync('userId');
                if (userId) {
                    setUser({ id: parseInt(userId, 10) });
                    try {
                        const userProfile = await apiGetUserProfile();
                        setUser(userProfile);
                    } catch (error) {
                        console.error('Error loading full user profile:', error);
                    }
                }
            } catch (error) {
                console.error('Error loading user from storage:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserFromStorage();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await apiLogin(email, password);

            const userId = await SecureStore.getItemAsync('userId');

            if (userId) {
                const userProfile = await apiGetUserProfile();
                setUser(userProfile);
            } else {
                console.error('Login successful but no userId was stored');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await apiLogout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshUser = async () => {
        setIsLoading(true);
        try {
            const userProfile = await apiGetUserProfile();
            setUser(userProfile);
        } catch (error) {
            console.error('Error refreshing user data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};