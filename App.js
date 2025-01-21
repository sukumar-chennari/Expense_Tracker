import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ManageExpense from './screens/manageExpense';
import RecentExpenses from './screens/recentExpenses';
import AllExpenses from './screens/allExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons'

const Stack=createNativeStackNavigator()
const BottomTabs=createBottomTabNavigator()

function ExpensesOverview(){
  return <BottomTabs.Navigator screenOptions={{
    headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
    headerTintColor:'white',
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor:GlobalStyles.colors.accent500
  }}>
    <BottomTabs.Screen name=' recentExpenses' component={RecentExpenses}
    options={{
      title:'Recent Expenses',
      tabBarLabel:'Recent',
      tabBarIcon:({color,size})=>(
        <Ionicons name='hourglass' size={size} color={color}/>
      )
    }}/>
    <BottomTabs.Screen name='allExpenses' component={AllExpenses}
        options={{
          title:'All Expenses',
          tabBarLabel:'All Expenses',
          tabBarIcon:({color,size})=>(
            <Ionicons name='calendar' size={size} color={color}/>
          )
        }}/>
  </BottomTabs.Navigator>
}
export default function App() {
  return (
      
    <>
      <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='expensesOverview' component={ExpensesOverview} options={{headerShown:false}}/>
        <Stack.Screen name='manageExpense' component={ManageExpense}/>

      </Stack.Navigator>

    </NavigationContainer>
    </>
      
  );
}

