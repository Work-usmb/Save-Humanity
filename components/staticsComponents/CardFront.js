import {View, StyleSheet, Image} from "react-native";

export default function CardFront ({image}) {
    return (
        <>
            <View style={styles.cardWrapper}>
                <Image
                    source={image}
                    style={styles.cardImage}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        flex : 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cardImage: {
        width: '80%',
        height: '80%',
    }
});