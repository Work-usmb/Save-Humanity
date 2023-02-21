import {View, StyleSheet, Text, Modal, Pressable, TextInput} from "react-native";
import Card from "./Card";
import {useState} from "react";
import LoadingBackCards from "./staticsComponents/LoadingBackCards";
import StartButton from "./staticsComponents/StartButton";
import StaticBackCard from "./staticsComponents/StaticBackCard";
import {Game} from "./GameData";
import Data from "./Data";
import ImagesData from "./ImagesData";
import Question from "./Question";
import BottomData from "./BottomData";
import {API_ADDRESS} from "../App";

const game = new Game(1_800, 20_000, 0);
const api_address = API_ADDRESS + "/api/store";
let currentCard = game.cards[Math.round(Math.random() * (game.cards.length-1))];
let textFinal = '';
export default function ScreenGame(){
    //variables d'etats pour géré l'affichage des composants
    const [showData, setShowData] = useState(false);
    const [showStartButton, setShowStartButton] = useState(true);
    const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
    const [showReverseCard, setShowReverseCard] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [showBot, setShowBot] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEndVisible, setModalEndVisible] = useState(false);
    let [name, setName] = useState('');

    //variables d'etats pour la fin de partie
    const [gameRunning, setGameRunning] = useState(true);
    const [winGame, setWinGame] = useState(false);
    const [loseGame, setLoseGame] = useState(false);
    let datas = [[0],[0],[0]];

    //Fonction pour lancer la partie
    const onStartGame = () => {
        setShowBot(true);
        setShowData(true);
        setModalVisible(!modalVisible);
        setTimeout(() => {
            setShowStartButton(false);
            setShowAnimatedReverseCard(true);
        }, 100);
        setTimeout(() => {
            setShowReverseCard(true);
            setTimeout(() => {
                setShowAnimatedReverseCard(false);
            }, 100);
        }, 2000);
        datas[0] = game.resources;
        datas[1] = game.population;
        datas[2]= game.recherche;
        game.postData(api_address, datas, name);
        showNewCard(2000);
    };

    //Fonction qui vérifie si une partie est fini (perdu ou gagné)

    const testWin=() => {
        let fin=false
        if (game.resources <=0 || game.population <=0) {
            setLoseGame(true);
            setGameRunning(false);
            fin=true;
            endGame()
        }else if (game.recherche >= 100) {
            setWinGame(true);
            setGameRunning(false);
            fin=true;
            endGame()
        }
        return fin;
    };

    //Fonction qui gère la fin de partie
    const endGame= () => {
        if (!gameRunning) {
            if (winGame) {
                textFinal = "Vous avez gagné !";
                setShowCard(false);
                setShowReverseCard(false);
                setShowAnimatedReverseCard(false);
                setShowQuestion(false);
                setModalEndVisible(true);
            } else if (loseGame) {
                textFinal = "Vous avez perdu !";
                setShowCard(false);
                setShowReverseCard(false);
                setShowAnimatedReverseCard(false);
                setShowQuestion(false);
                setModalEndVisible(true);
            } else {
                setGameRunning(true)
            }
        }
    };

    const restartGame = () => {
        game.population = 1_800_000_000;
        game.recherche = 0;
        game.resources = 2_000_000;
        setGameRunning(true);
        setModalEndVisible(false);
        setShowStartButton(true);

    }

    //Fonction qui gère la génération de la nouvelle carte
    const createNewCard = () => {
        setShowQuestion(false);
        datas[0].push(game.resources);
        datas[1].push(game.population);
        datas[2].push(game.recherche);
        game.postData(api_address,datas,name);
        if (true) {
            setTimeout(() => {
                currentCard = game.cards[Math.round(Math.random() * (game.cards.length-1))];
                setShowCard(false);
            }, 300);
            showNewCard(700);
        }
    };

    //Fonction qui gère l'affichage de la nouvelle carte
    const showNewCard = (timeout) => {
        setTimeout(() => {
            setShowCard(true);
            setTimeout(() => {
                setShowQuestion(true);
            },700);
        }, timeout);
    };

    //Fonction qui gère la réponse gauche à la question
    const onChooseLeftAnswer = () => {
        game.postData(api_address,name)
        setTimeout(()=>{
            game.modifyData(currentCard.onLeft.population, currentCard.onLeft.resource, currentCard.onLeft.recherche);
        }, 200);
        createNewCard();
    };

    //Fonction qui gère la réponse droite à la question
    const onChooseRightAnswer = () => {
        setTimeout(()=>{
            game.modifyData(currentCard.onRight.population, currentCard.onRight.resource, currentCard.onRight.recherche);
        }, 200);
        createNewCard();
    };

    //Fonction qui gère la réponse du bas à la question
    const onChooseBotAnswer = () => {
        setTimeout(()=>{
            game.modifyData(currentCard.onBot.population, currentCard.onBot.resource, currentCard.onBot.recherche);
        }, 200);
        createNewCard();
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.gameData}>
                <Text style={styles.title}>Save Humanity</Text>
                {showData && <View style={styles.textDataWrapper}>
                    <Data text={game.population} icon={ImagesData.icons.icon_population}>&nbsp;M</Data>
                    <Data text={game.recherche} icon={ImagesData.icons.icon_research}>%</Data>
                </View>
                }
            </View>
            <View style={styles.questionWrapper}>
                <Question text={currentCard.question} showQuestion={showQuestion}/>
            </View>
            {showStartButton && <StartButton onPress={() => setModalVisible(true)} />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Entrer votre nom ici"
                        onChangeText={newName => setName(newName)}
                        defaultValue={name}
                    />
                    <Pressable style={styles.pressableWrapper} onPress={onStartGame}>
                        <Text style={styles.pressableText}>S'enregistrer</Text>
                    </Pressable>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalEndVisible(!modalEndVisible);
                }}>
                <View style={styles.modalWrapper}>
                    <Text style={styles.finalText}>{textFinal}</Text>
                    <Pressable style={styles.pressableWrapper} onPress={restartGame}>
                        <Text style={styles.pressableText}>Recommencez à zéro</Text>
                    </Pressable>
                </View>
            </Modal>
            {showAnimatedReverseCard && <LoadingBackCards />}
            {showReverseCard && <StaticBackCard />}
            {showCard && (
                <Card
                    onChooseLeftAnswer={onChooseLeftAnswer}
                    onChooseRightAnswer={onChooseRightAnswer}
                    onChooseBotAnswer={onChooseBotAnswer}
                    leftText={currentCard.leftText}
                    rightText={currentCard.rightText}
                    botText={currentCard.botText}
                    image={currentCard.image}
                    background={currentCard.background}
                />
            )}
            {showBot && <BottomData name={name}></BottomData>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
        paddingTop:20,
        paddingBottom: 0,
    },
    gameData:{
        position:'absolute',
        top:0,
        backgroundColor: '#cce8ff',
        height: 120,
        width: '100%',
    },
    title:{
        fontSize: 30,
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
        fontVariant: ['small-caps'],
    },
    textDataWrapper:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textData: {
        padding: 20,
        fontSize: 25,
    },
    questionWrapper:{
        top: -150,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card:{
        position: 'absolute',
    },
    modalWrapper: {
        top : 200,
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        height: 300,
        width: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    pressableWrapper: {
        marginTop: 50,
        height: 50,
        width: 180,
        borderRadius: 15,
        backgroundColor: '#aaa',

    },
    pressableText: {
        padding: 10,
        fontSize: 25,
        textAlign: 'center',
        color: '#000',
    },
    textInput:{
        height:50,
        fontSize:35,
    },
    finalText:{
        fontSize: 30,
        textAlign: 'center',
        marginTop: 30,
    }
});