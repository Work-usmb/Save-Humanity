import {View, StyleSheet, Image, Text} from "react-native";

export default function Data({icon, text, children}) {
    return (
        <View style={styles.dataWrapper}>
            <Image source={icon} style={styles.icon}/>
            <Text style={styles.text}>&nbsp;{text}{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    dataWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,

    },
    icon: {
        height: 35,
        width: 35,

    },
    text: {
        fontSize: 25,
    }
});