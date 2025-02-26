import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#334466',
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Section;