import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from "react-native-reanimated";
import {useEffect} from "react";
import CardBack from "./CardBack";
import {View, StyleSheet} from "react-native";
import {times} from "lodash";

const LoadingBackCards=()=>{
    const openAnimation = useSharedValue(-2);

    useEffect(() => {
        openAnimation.value =0;
    }, [openAnimation]);
    function cardTransform(index) {
        return ()=>{
            'worklet';
            const localTranslateX = withDelay(
                250 - index * 50,
                withTiming(openAnimation.value * 200, {duration: 500}),
            );

            const localTranslateY = withDelay(
                250 - index * 50,
                withTiming(openAnimation.value * 200, {duration: 500}),
            );

            return {
                transform: [
                    {translateX: localTranslateX},
                    {translateY: localTranslateY},
                    {rotateY: '180deg'},
                ],
                zIndex: index,
            };
        };
    }

    const Card = ({index}) => {
        return (
            <Animated.View
                style={[useAnimatedStyle(cardTransform(index)), styles.cardWrapper]}>
                <CardBack shadowOpacity={0.2 -index * 0.05} />
            </Animated.View>
        );
    };

    return (
        <View style={styles.wrapper}>
            {times(5, (index) => {
                return <Card key={`card_${index}`} index={index} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        position: 'absolute',
        alignItems: 'center',
    },
    cardWrapper: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#aaa',
        borderColor: '#000',
        borderWidth: 2,
    }
});
export default LoadingBackCards;