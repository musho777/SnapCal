import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainScreen from './src/screens/mainScreen';
function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MainScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
