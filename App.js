import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, View} from 'react-native';
import ScreenGame from "./components/GameScreen";

const instructions = Platform.select({
  ios: 'Press cmd+R to reload\n' + 'Shake or press cmd+D for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export const API_ADDRESS = 'https://localhost:3000';

export default function App() {
  return (
    <View style={styles.container}>
      <ScreenGame></ScreenGame>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
