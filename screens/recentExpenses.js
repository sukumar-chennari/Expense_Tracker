
import ExpenseOutput from "../components/ExpenseOuput/ExpenseOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
    const expenseCtx = useContext(ExpenseContext);

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);
        // console.log("Expense Date:", expense.date, "7 Days Ago:", date7daysAgo); // Debugging
        return (expense.date > date7daysAgo)&& (expense.date <= today);
    });

    return (
        <ExpenseOutput 
            expensesPeriod="Last 7 days" 
            expenses={recentExpenses} 
            fallbackText={'No expenses registered for the last 7 days'}
        />
    );
}
