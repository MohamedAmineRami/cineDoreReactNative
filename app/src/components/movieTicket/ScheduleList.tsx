import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Funcion} from "../../types";

interface ScheduleListProps {
    schedules: { [key: string]: { time: string; funcion: Funcion }[] };
    onSelectFuncion: (funcion: Funcion) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedules, onSelectFuncion }) => (
    <View style={styles.scheduleContainer}>
        {Object.entries(schedules).map(([date, times]) => (
            <View key={date} style={styles.scheduleItem}>
                <Text style={styles.scheduleDate}>{date}</Text>
                {times.map(({ time, funcion }, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.scheduleTimeContainer}
                        onPress={() => onSelectFuncion(funcion)}
                    >
                        <Text style={styles.scheduleTime}>{time}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    scheduleContainer: {
        marginTop: 16,
    },
    scheduleItem: {
        marginBottom: 16,
    },
    scheduleDate: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 4,
    },
    scheduleTimeContainer: {
        marginBottom: 8,
    },
    scheduleTime: {
        color: '#5DD9FA',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ScheduleList;