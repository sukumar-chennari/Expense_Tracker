import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesSummary({ expenses = [], periodName }) {
  console.log("Expenses in ExpensesSummary:", expenses);

  const expensesSum = expenses.reduce((sum, expense) => {
    const amount = Number(expense.amount); // Ensure numeric value
    return sum + (isNaN(amount) ? 0 : amount); // Handle invalid amounts
  }, 0);

  const displaySum = isNaN(expensesSum) ? 0 : expensesSum; // Fallback for NaN

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${displaySum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
