import {View, StyleSheet, Image} from "react-native";
import ImagesData from "../ImagesData";
export default function CardBack({
                                     isMirrored,
                                     shadowOpacity = 0
                                 }) {
    return (
            <View style={styles.cardWrapper}>
                <View style={[styles.cardShadow, {opacity: shadowOpacity}]} />
                <Image
                    style={styles.cardImage}
                    source={ImagesData.images.image_cardBack}
                />
            </View>
    )
}
const styles = StyleSheet.create({
    cardWrapper: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    cardImage: {
        width: '70%',
        height: '70%',
    },
    cardShadow: {
        position: 'absolute',
        zIndex: 100,
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
    }
});