import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES=[
    {
        id:'e1',
        description:'A pair of shoes',
        amount:59.99,
        date:new Date('2021-12-19')
    },
    {
        id:'e2',
        description:'A pair of trousers',
        amount:80.99,
        date:new Date('2021-12-1')
    },
    {
        id:'e3',
        description:'A pair of socks',
        amount:79.99,
        date:new Date('2021-9-1')
    },
    {
        id:'e4',
        description:'A pair of bananas',
        amount:5,
        date:new Date('2022-2-28')
    },
    {
        id:'e5',
        description:'A book',
        amount:59.99,
        date:new Date('2023-1-24')
    },
    {
        id:'e6',
        description:'A pair of trousers',
        amount:80.99,
        date:new Date('2021-12-1')
    },
    {
        id:'e7',
        description:'A pair of socks',
        amount:79.99,
        date:new Date('2021-9-1')
    },
    {
        id:'e8',
        description:'A pair of bananas',
        amount:5,
        date:new Date('2022-2-28')
    },
 
]
export default function ExpenseOutput({expenses,expensesPeriod}){
    return <View style={styles.container}>
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
        <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        paddingBottom:0,
        backgroundColor:GlobalStyles.colors.primary700
    }
})