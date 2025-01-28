import { useContext, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";

import { ExpenseContext } from "../store/expense-context";
import Expenseform from "../components/manageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/loadingOverlay";
import ErrorOverlay from "../components/UI/iconButton";


export default function ManageExpense({route,navigation}){
    const editedExpenseId=route.params?.expenseId;

    const [error,setError]=useState()
    const [isSubmitting,setIsSubmitting]=useState(false)
    const expenseCtx=useContext(ExpenseContext)
    const isEditing=!!editedExpenseId //trick to convert a value in to a boolean

    const selectedExpense=expenseCtx.expenses.find(expense=>expense.id==editedExpenseId)
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEditing?'Edit Expense':'Add Expense'
        })
    },[navigation,isEditing])

    async function deleteExpenseHandler(){
       
       
        setIsSubmitting(true)
        try{
            expenseCtx.deleteExpense(editedExpenseId)
            await deleteExpense(editedExpenseId)
            
            navigation.goBack()
        }catch(error){
            setError('Unable to delete the expense-please tyr again later')
            setIsSubmitting(false)
        }
        
       
       
    }

    function cancelHandler(){
        navigation.goBack()
    }
    async function confirmHandler(expenseData){
        setIsSubmitting(true)

        try{
            if(isEditing){
                expenseCtx.updateExpense(editedExpenseId,expenseData)
                await updateExpense(editedExpenseId,expenseData)
            }else{
                const id=await storeExpense(expenseData)
                expenseCtx.addExpense({...expenseData,id})
            }
            navigation.goBack()
        }catch(error){
            setError('COuld not save data- Please try again later!!')
            setIsSubmitting(false)
        }

        
    }

    function errorHandler(){
        setError(null)
    }

    if (error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if(isSubmitting){
        return <LoadingOverlay />
    }
    return <View style={styles.container}>
        <Expenseform defaultValues={selectedExpense} onCancel={cancelHandler} submitButtonLabel={isEditing ?'Update':'Add'} onSubmit={confirmHandler} updateLoader={updateLoader}/>
  



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