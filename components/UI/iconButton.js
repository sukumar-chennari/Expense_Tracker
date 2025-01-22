import { Pressable, StyleSheet, View } from "react-native";
import {Ionicons} from '@expo/vector-icons'
export default  function IconButton({icon,size,color,onPress}){
    return <Pressable onPress={onPress}style={({pressed})=>pressed&&styles.pressed}>
        <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color}/>
        </View>
    </Pressable>
}

const styles=StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        marginHorizontal:8,
        padding:6
    },
    pressed:{
        opacity:0.7
    }
})