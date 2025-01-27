import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/button";
import { ExpenseContext } from "../store/expense-context";
import Expenseform from "../components/manageExpense/ExpenseForm";

export default function ManageExpense({route,navigation}){
    const editedExpenseId=route.params?.expenseId;

    const expenseCtx=useContext(ExpenseContext)
    const isEditing=!!editedExpenseId //trick to convert a value in to a boolean

    const selectedExpense=expenseCtx.expenses.find(expense=>expense.id==editedExpenseId)
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEditing?'Edit Expense':'Add Expense'
        })
    },[navigation,isEditing])

    function deleteExpenseHandler(){
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
       
    }

    function cancelHandler(){
        navigation.goBack()
    }
    function confirmHandler(expenseData){
        if(isEditing){
            expenseCtx.updateExpense(editedExpenseId,expenseData)
        }else{
            expenseCtx.addExpense(expenseData)
        }
        navigation.goBack()
    }

    return <View style={styles.container}>
        <Expenseform defaultValues={selectedExpense} onCancel={cancelHandler} submitButtonLabel={isEditing ?'Update':'Add'} onSubmit={confirmHandler}/>
  



        <View style={styles.deleteContainer}>
        {isEditing && <IconButton icon={'trash'} color={GlobalStyles.colors.error500}   size={36} onPress={deleteExpenseHandler}/>}
        </View>
        
    </View>
}

const styles=StyleSheet.create({
    container:{
     flex:1,
     padding:24,
     backgroundColor:GlobalStyles.colors.primary800
    },

    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center'
    }
})