import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface TabNavigationProps {
    tabs: string[];
    activeTab: string;
    onTabPress: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabPress }) => {
    return (
        <LinearGradient
            colors={['rgba(89, 217, 250, 0.2)', 'rgba(68, 98, 238, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientContainer}
        >
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => onTabPress(tab)}
                    >
                        {activeTab === tab ? (
                            <LinearGradient
                                colors={['#5DD9FA', '#4462EE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.activeGradient}
                            >
                                <Text style={styles.activeTabText}>{tab}</Text>
                            </LinearGradient>
                        ) : (
                            <Text style={styles.tabText}>{tab}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        margin: 16,
        borderRadius: 17,
        padding: 2,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        borderRadius: 15,
    },
    tab: {
        flex: 1,
        paddingVertical: 5,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    activeTab: {},
    activeGradient: {
        borderRadius: 12,
        padding: 12,
    },
    tabText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    activeTabText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default TabNavigation;