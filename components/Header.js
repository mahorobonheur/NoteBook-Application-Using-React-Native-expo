import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotesHeader() {
    return (
        <View style={headerStyles.container}>
            <Text style={headerStyles.headerText}>The Notes House</Text>
            <View style={headerStyles.separator} />
        </View>
    );
}

const headerStyles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    headerText: {
        padding: 40,
        fontSize: 24,
        color: '#1368d1',
        fontFamily: 'System',
        fontWeight: 'bold',
    },
    separator: {
        height: 2, 
        width: '80%', 
        backgroundColor: '#1368d1', 
        marginTop: 0.5,
    },
});
