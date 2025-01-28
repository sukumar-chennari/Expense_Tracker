import { createContext, useReducer } from "react";

export const ExpenseContext=createContext({
    expenses:[],
    addExpense:({description,amount,date})=>{},
    deleteExpense:(id)=>{},
    updateExpense:(id,{description,amount,date})=>{},
    setExpenses:(expenses)=>{}
})

function expensesReducer(state,action){
    switch (action.type){
        case 'ADD':
            // const id=new Date().toString()+Math.random().toString()
            return [{...action.payload,id:id},...state]
        case 'DELETE':
            return state.filter((expense)=>expense.id !=action.payload)
        case 'UPDATE':
            const updatableExpenseIndex=state.findIndex((expense)=>expense.id===action.payload.id)


            const updatableExpense=state[updatableExpenseIndex]
            const updatedItem={...updatableExpense,...action.payload.data}
            const updatedExpenses=[...state]
            updatedExpenses[updatableExpenseIndex]=updatedItem

            return updatedExpenses
        case 'SET':
            const inverted=action.payload.reverse()
            return inverted

        default:
            return state
    }
}

const DUMMY_EXPENSES=[
    {
        id:'e1',
        description:'A pair of shoes',
        amount:59.99,
        date:new Date('2025-1-19')
    },
    {
        id:'e2',
        description:'A pair of trousers',
        amount:80.99,
        date:new Date('2021-1-21')
    },
    {
        id:'e3',
        description:'A pair of socks',
        amount:79.99,
        date:new Date('2021-1-16')
    },
    {
        id:'e4',
        description:'A pair of bananas',
        amount:5,
        date:new Date('2025-2-28')
    },
    {
        id:'e5',
        description:'A book',
        amount:59.99,
        date:new Date('2025-1-21')
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
export default function ExpenseContextProvider({children}){
    const[expenseState,dispatch] =useReducer(expensesReducer,[]);

    function addExpense(expenseData){
        dispatch({type:'ADD',payload:expenseData})
    }

    function deleteExpense(id){
        dispatch({type:'DELETE',payload:id})
    }

    function updateExpense(id,expenseData){
        dispatch({type:'UPDATE',payload:{id:id,data:expenseData}})
    }

    function setExpenses(expenses){
        dispatch({type:'SET',payload:expenses})
    }

    const value={expenses:expenseState,
        addExpense:addExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense,
        setExpenses:setExpenses,
    }
    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
} 