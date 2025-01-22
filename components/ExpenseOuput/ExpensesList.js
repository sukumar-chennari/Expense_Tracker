import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({ item }) {
  console.log("Rendering item:", item); // Log each item for debugging
  return <ExpenseItem {...item} />;
}

export default function ExpensesList({ expenses = [] }) {
  console.log("ExpensesList received:", expenses); // Log the entire expenses array

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text style={{ textAlign: "center" }}>No expenses found.</Text>}
    />
  );
}
