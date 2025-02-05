import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "./FirebaseConfig";

import Login from "./app/src/screens/Auth/Login";
import SplashScreen from './app/src/screens/SplashScreen';
import Welcome from './app/src/screens/Auth/Welcome';
import Register from './app/src/screens/Auth/Register';
import CineScreen from "./app/src/screens/Home/CineScreen";
import ProfileScreen from "./app/src/screens/Home/ProfileScreen";
import HomeScreen from "./app/src/screens/Home/HomeScreen";

type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Inside: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [showSplash, setShowSplash] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => {
            clearTimeout(splashTimer);
            unsubscribe();
        };
    }, []);

    if (showSplash) {
        return <SplashScreen />;
    }

    //
    if (loading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator id={undefined} >
                {user ? (
                    <>
                        <Stack.Screen
                            name="Inside"
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
                            component={ProfileScreen}
                            options={{ headerShown: false }}
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
                            component={Login}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}