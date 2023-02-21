import {StyleSheet, View, Text} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
    interpolate,
    Extrapolate,
    withTiming, runOnJS, withDelay
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import CardBack from "./staticsComponents/CardBack";
import CardFront from "./staticsComponents/CardFront";
import {useEffect, useState} from "react";

export default function Card ({
                                  onChooseLeftAnswer,
                                  onChooseRightAnswer,
                                  onChooseBotAnswer,
                                  leftText,
                                  rightText,
                                  botText,
                                  background,
                                  image,
                              }){
    const [isActive, setIsActive] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const x = useSharedValue(0);
    const y = useSharedValue(0);

    //config to handle the behavior of the card when coming back to original coordinate
    const cardSpringConfig = {
        damping: 100,
        stiffness: 90,
        mass: 0.8,
    };

    //Config of the card gesture Handler and game logic handler
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
        },
        onActive: (event, ctx)=> {
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onEnd: (event)=> {
            const tossX = event.translationX + 0.2 * event.velocityX;
            const tossY = event.translationY + 0.2 * event.velocityY;
            if (tossX > 150 && tossY <50) {
                x.value = withSpring(400, {
                    velocity: event.velocityX,
                });
                y.value = withSpring(0, cardSpringConfig);
                runOnJS(onChooseRightAnswer)();
            } else if (tossX < -150 && tossY < 50) {
                x.value = withSpring(-400, {
                    velocity: event.velocityX,
                });
                y.value = withSpring(0, cardSpringConfig);
                runOnJS(onChooseLeftAnswer)();
            }else if(tossY > 150 && (tossX >-100 || tossX <100)){
                y.value = withSpring(600,{
                    velocity: event.velocityY,
                });
                x.value = withSpring(0, cardSpringConfig);
                runOnJS(onChooseBotAnswer)();
            } else {
                x.value = withSpring(0, cardSpringConfig);
                y.value = withSpring(0, cardSpringConfig);
            }
        }
    });

    //smooth transition to the next card
    useEffect(() => {
        setShowCard(true);
        flipAnimation.value = withDelay(
            200,
            withTiming(
                2,
                {duration : 1000},
                () => {
                    runOnJS(setIsActive)(true);
                },
            ),
        );
    }, []);

    //Animation
    //animated style to make the card follow the hand and rotate at the same time
    const animatedMovableCard = useAnimatedStyle(()=>{
       return{
           transform:[
               {
                   rotateZ: `${interpolate(
                       x.value,[-50,50],[-0.05,0.05], Extrapolate.EXTEND,
                   )}rad`
               },
               {translateX: x.value},
               {translateY: y.value},
           ]
       }
    });

    //animated style to make the Right top text appear and rotate
    const animatedRightTopTextWrapper = useAnimatedStyle(()=>{
        return {
            opacity: interpolate(x.value, [20, 70], [0, 1], Extrapolate.CLAMP),
            transform: [
                {
                    rotateZ: `${interpolate(
                        x.value, [0,50], [0, -0.03], Extrapolate.EXTEND,
                    )}rad`
                }
            ]
        }
    });

    //animated style to make the Right top text appear and rotate
    const animatedLeftTopTextWrapper = useAnimatedStyle(()=>{
        return {
            opacity: interpolate(x.value, [-20, -70], [0, 1], Extrapolate.CLAMP),
            transform: [
                {
                    rotateZ: `${interpolate(
                        x.value, [0,-50], [0, 0.03], Extrapolate.EXTEND,
                    )}rad`
                }
            ]
        }
    });

    const animatedBotTopTextWrapper = useAnimatedStyle(()=>{
        return {
            opacity: interpolate(y.value, [20, 70], [0, 1], Extrapolate.CLAMP),
            transform: [
                {
                    rotateZ: `${interpolate(
                        x.value, [0,-50], [0, 0.03], Extrapolate.EXTEND,
                    )}rad`
                }
            ]
        }
    });

    //var know on which side the card currently is
    const flipAnimation = useSharedValue(1);
    //animated style to make the card flip when on the front side
    const animatedFrontCard = useAnimatedStyle(()=>{
        return {
            opacity: flipAnimation.value >= 1.5 ? 1 :0,
            transform: [
                {
                    scale: interpolate(flipAnimation.value, [1,1.5,2], [1, 1.2, 1]),
                },
                {perspective: flipAnimation.value*180},
                {rotateY: `${flipAnimation.value *180}deg`},
                ],
        };
    });

    //animated style to make the card flip when on the back side
    const animatedBackCard = useAnimatedStyle(()=>{
        return {
            opacity: flipAnimation.value <= 1.5 ? 1 :0,
            transform: [
                {
                    scale: interpolate(flipAnimation.value, [1,1.5,2], [1, 1.2, 1]),
                },
                {perspective: flipAnimation.value*180},
                {rotateY: `${flipAnimation.value *180}deg`},
            ],
        };
    });

    //Shadow are used to bring a bit of depth to the card while flipping
    //function to change the shadow of the card while flipping on the back side
    const animatedBackShadow = useAnimatedStyle(()=>{
        return {
            opacity: interpolate(
                flipAnimation.value,
                [1,1.5],
                [0, 0.3],
                Extrapolate.CLAMP,
            ),
        };
    });

    //function to change the shadow of the card while flipping on the front side
    const animatedFrontShadow = useAnimatedStyle(()=>{
        return {
            opacity: interpolate(
                flipAnimation.value,
                [1.5,2],
                [0.3, 0],
                Extrapolate.CLAMP,
            ),
        };
    });

    return (
        <View style={[{opacity: showCard ? 1 : 0},styles.cardWrapper]}>
            <Animated.View style={[animatedBackCard, styles.cardWrapperBack]} >
                <Animated.View style={[animatedBackShadow, styles.cardShadow]} />
                <CardBack/>
            </Animated.View>
            <PanGestureHandler onGestureEvent={gestureHandler} enabled={isActive}>
                <Animated.View style={animatedFrontCard}>
                    <Animated.View style={[animatedMovableCard, styles.card, {backgroundColor: background}]}>
                        <Animated.View style={[animatedRightTopTextWrapper,styles.cardTopWrapper]}>
                            <Text style={styles.cardTopText}>
                                {rightText}
                            </Text>
                        </Animated.View>
                        <Animated.View style={[animatedLeftTopTextWrapper,styles.cardTopWrapper]}>
                            <Text style={styles.cardTopText}>
                                {leftText}
                            </Text>
                        </Animated.View>
                        <Animated.View style={[animatedBotTopTextWrapper,styles.cardTopWrapper]}>
                            <Text style={styles.cardTopText}>
                                {botText}
                            </Text>
                        </Animated.View>
                        <CardFront image={image}/>
                        <Animated.View style={[animatedFrontShadow, styles.cardShadow]} />
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        width: 200,
        height: 200,
        overflow: "hidden",
        borderColor: '#000',
        borderWidth: 2,
    },
    cardWrapper: {
        height: 200,
        position: "absolute",
    },
    cardTopWrapper: {
        position: 'absolute',
        width: '110%',
        left: '-5%',
        top: '-5%',
        paddingTop:'20%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 10,
    },
    cardTopText:{
        textAlign: 'center',
        fontSize: 20,
        color:'#fff',
    },
    cardWrapperBack: {
        height: 200,
        width: 200,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'absolute',
        borderColor: '#000',
        borderWidth: 2,
    },
    cardShadow: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        zIndex: 10,
    },
});