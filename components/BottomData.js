import {Text, View, StyleSheet} from "react-native";

export default function BottomData({name}){
    return(
        <View style={styles.botWrapper}>
            <Text style={styles.botName}>Gérant planète : {name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    botWrapper:{
        bottom:0,
        position:"absolute",
        height: 60,
        width:'100%',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#cce8ff',
    },
    botName:{
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingHorizontal: 20,
    },
})