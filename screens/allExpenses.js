import { Text } from "react-native";
import ExpenseOutput from "../components/ExpenseOuput/ExpenseOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expense-context";

export default function AllExpenses(){
    const expensesCtx=useContext(ExpenseContext)
    return <ExpenseOutput  expenses={expensesCtx.expenses} expensesPeriod={'Total'}/>
}