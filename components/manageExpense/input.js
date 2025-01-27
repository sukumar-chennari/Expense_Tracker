import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input({ label, style, textInputConfig, errorMessage }) {
    const inputStyles = [styles.input];

    // Add error styles if there's an error message
    if (errorMessage) {
        inputStyles.push(styles.inputError);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        color: 'white',
        marginBottom: 4,
    },
    input: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 6,
        fontSize: 16,
    },
    inputError: {
        borderWidth: 1,
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});
