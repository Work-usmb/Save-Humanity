import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Pressable, View, StyleSheet, Image, Text} from "react-native";
import ImagesData from "../ImagesData";

export default function StartButton({onPress}){
    const openAnimation = useSharedValue(1);

    const animatedWrapper = useAnimatedStyle(() => {
        return {
            opacity: openAnimation.value,
        };
    });

    const onPressCard = () => {
        openAnimation.value = withTiming(0);
        onPress();
    };
    return (
        <Pressable style={styles.cardWrapper} onPress={onPressCard}>
            <Animated.View style={[animatedWrapper, styles.wrapperBack]}>
                <View style={styles.wrapper}>
                    <Image
                        source={ImagesData.images.image_start}
                        style={styles.reverseIcon}
                    />
                    <Text style={styles.text}>Play</Text>
                </View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapperBack: {
        position: 'absolute',
        height: 200,
        width: 200,
        backgroundColor: '#aaa',
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardWrapper: {
        height: 200,
        width: 200,
        position: 'absolute',
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cce8ff',
    },
    reverseIcon: {
        height: '70%',
        width: '70%',
    },
    shadow: {
        position: 'absolute',
        zIndex: 100,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
    },
    text: {
        paddingTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
});