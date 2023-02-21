import {View, StyleSheet, Image} from "react-native";


export default function StaticBackCard() {
    return (
        <View style={styles.cardWrapper}>
                <Image
                style={styles.cardImage}
                source={require('../../assets/images/cardBack.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cardWrapper:{
        width: 200,
        height: 200,
        borderRadius: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 2,
        flex : 1,
        backgroundColor: '#ccc',
        transform: [{rotateY: '180deg'}],
    },
    cardImage: {
        width: '70%',
        height: '70%',
    },
})