import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./button";

export default function ErrorOverlay({message,onConfirm}){
    return <View style={styles.container}> 
        <Text>{message}</Text>
        <Button onPress={onConfirm}>Okay</Button>
    </View>
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    }
})