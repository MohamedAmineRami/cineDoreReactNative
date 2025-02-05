import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import Header from '../../components/Header';
import Section from '../../components/Section';
import BottomNav from '../../components/BottomNav';

const CineScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ImageBackground source={require('../../assets/images/CineBG.png')}>
                    <Header />
                    <Text style={styles.mainHeading}>
                        El cine Doré es la sede de proyecciones de Filmoteca Española.
                    </Text>

                    <Section title="Horario taquilla">
                        <Text style={styles.note}>*Excepto festivos</Text>
                        <Text style={styles.sectionText}>• Invierno de 17:00 a 20:00</Text>
                        <Text style={styles.sectionText}>• Verano (julio y agosto): 17:30 - 20:30.</Text>
                    </Section>

                    <Section title="Horario proyecciones">
                        <Text style={styles.sectionText}>De martes a domingo</Text>
                    </Section>

                    <Section title="Localización">
                        <Text style={styles.sectionText}>Calle Santa Isabel, n.° 3 (28012 Madrid)</Text>
                    </Section>

                    <Section title="Instalaciones">
                        <Text style={styles.sectionText}>• 2 Salas internas +1 Sala de verano (exterior)</Text>
                        <Text style={styles.sectionText}>• Cafetería</Text>
                        <Text style={styles.sectionText}>• Librería</Text>
                    </Section>
                </ImageBackground>
            </ScrollView>

            <BottomNav />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001133',
    },
    mainHeading: {
        color: '#ffffff',
        fontSize: 24,
        textAlign: 'center',
        padding: 20,
        marginVertical: 20,
    },
    note: {
        color: '#ffffff',
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    sectionText: {
        color: '#ffffff',
        fontSize: 16,
        marginVertical: 5,
    },
});

export default CineScreen;