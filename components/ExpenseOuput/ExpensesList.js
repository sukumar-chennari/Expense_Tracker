import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";


function renderExpenseItem(itemData){
    // console.log(itemData.item.description)
    return <ExpenseItem {...itemData.item}/>
}
export default function  ExpensesList({expenses}){
    return <FlatList
    data={expenses}
    renderItem={renderExpenseItem}
    keyExtractor={(item)=>item.id}/>
}

