import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {Text, StyleSheet} from "react-native";

export default function Question({text, showQuestion}){
    const animatedQuestion = useAnimatedStyle(() => {
        return {
            opacity: withTiming(showQuestion ? 1 : 0),
            transform: [{translateY: withTiming(showQuestion ? 0 : 10)}],
        };
    });

    return (
        <Animated.View style={[animatedQuestion, styles.questionWrapper]}>
            <Text style={styles.text}>{text}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    questionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 20,
    }
});