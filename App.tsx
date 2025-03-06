import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import Login from "./app/src/screens/auth/Login";
import SplashScreen from './app/src/screens/SplashScreen';
import Welcome from './app/src/screens/auth/Welcome';
import Register from './app/src/screens/auth/Register';
import CineScreen from "./app/src/screens/main/Cine";
import HomeScreen from "./app/src/screens/main/Home";
import Profile from "./app/src/screens/main/Profile";
import { AuthProvider } from './app/src/context/AuthContext';
import TicketScreen from "./app/src/screens/ticket/Ticket";

type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Home: undefined;
    Register: undefined;
    Cine: undefined;
    Profile: undefined;
    TicketScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [user, setUser] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        const checkAuth = async () => {
            const token = await SecureStore.getItemAsync('token');
            setUser(!!token);
            setLoading(false);
        };

        checkAuth();

        return () => {
            clearTimeout(splashTimer);
        };
    }, []);

    useEffect(() => {
        console.log('User state updated:', user);
    }, [user]);

    if (showSplash) {
        return <SplashScreen />;
    }

    if (loading) {
        return null;
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator id={undefined}>
                    {user ? (
                        <>
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Cine"
                                component={CineScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Profile"
                                options={{ headerShown: false }}
                            >
                                {(props) => <Profile {...props} setUser={setUser} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="TicketScreen"
                                component={TicketScreen}
                                options={{
                                    headerShown: false,
                                    presentation: 'modal',
                                    animation: 'slide_from_bottom'
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Welcome"
                                component={Welcome}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Login"
                                options={{ headerShown: false }}
                            >
                                {(props) => <Login {...props} setUser={setUser} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}