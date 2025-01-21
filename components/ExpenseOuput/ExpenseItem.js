import { Pressable, Text, View } from "react-native";

export default function ExpenseItem(){
    return <Pressable>
        <View>
            <View>
                <Text>DESCRIPTION</Text>
                <Text>DATE</Text>
            </View>
            <View>
            <Text>AMOUNT</Text>
            </View>
           
        </View>
    </Pressable>
}