import { StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./input";
import { useState } from "react";
import Button from "../UI/button";

export default function ExpenseForm({ defaultValues, onCancel, onSubmit, submitButtonLabel }) {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    const [errors, setErrors] = useState({
        amount: '',
        date: '',
        description: '',
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => ({
            ...curInputValues,
            [inputIdentifier]: enteredValue,
        }));
    }

    function validateInputs() {
        const errors = {};

        // Validate Amount
        const amount = parseFloat(inputValues.amount);
        if (isNaN(amount) || amount <= 0) {
            errors.amount = 'Please enter a valid positive number.';
        }

        // Validate Date
        if (!/^\d{4}-\d{2}-\d{2}$/.test(inputValues.date) || isNaN(new Date(inputValues.date).getTime())) {
            errors.date = 'Please enter a valid date (YYYY-MM-DD).';
        }

        // Validate Description
        if (!inputValues.description.trim()) {
            errors.description = 'Description cannot be empty.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function submitHandler() {
        if (!validateInputs()) {
            return; // Don't submit if there are validation errors
        }

        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description.trim(),
        };

        onSubmit(expenseData);
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: (text) => inputChangedHandler('amount', text),
                        value: inputValues.amount,
                    }}
                    errorMessage={errors.amount} // Pass error message
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: (text) => inputChangedHandler('date', text),
                        value: inputValues.date,
                    }}
                    errorMessage={errors.date} // Pass error message
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: (text) => inputChangedHandler('description', text),
                    value: inputValues.description,
                }}
                errorMessage={errors.description} // Pass error message
            />
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>
                    Cancel
                </Button>
                <Button onPress={submitHandler} style={styles.button}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 80,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    rowInput: {
        flex: 1,
        marginHorizontal: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
