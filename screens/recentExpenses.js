
import ExpenseOutput from "../components/ExpenseOuput/ExpenseOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import LoadingOverlay from "../components/UI/loadingOverlay";
import ErrorOverlay from "../components/UI/iconButton";

export default function RecentExpenses() {
    const expenseCtx = useContext(ExpenseContext);

    const [isFetching,setIsFetching]=useState(true)
    const [error,setError]=useState()

    useEffect(()=>{
        async function getExpenses(){
            setIsFetching(true)
            try{
                const expenses=await  fetchExpenses();
                expenseCtx.setExpenses(expenses)
            }catch{
                setError('Could not fetch Expenses')
            }
           
            setIsFetching(false)
            
        }
        getExpenses()
       
    },[])

    function errorHandler(){
        setError(null)
    }
    

    if(error && isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }
    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);
        // console.log("Expense Date:", expense.date, "7 Days Ago:", date7daysAgo); // Debugging
        return (expense.date > date7daysAgo)&& (expense.date <= today);
    });

    if(isFetching){
        return <LoadingOverlay/>
    }

    return (
        <ExpenseOutput 
            expensesPeriod="Last 7 days" 
            expenses={recentExpenses} 
            fallbackText={'No expenses registered for the last 7 days'}
        />
    );
}
