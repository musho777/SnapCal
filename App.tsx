import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './src/navigation/mainNavigation';
import { DraggableAIButton } from './src/common-ui/uIButton';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  const handleAIButtonPress = () => {
    console.log('AI Assistant button pressed');
    // Add your AI assistant functionality here
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Provider store={store}>
              <MainNavigation />
            </Provider>
          </View>
        </NavigationContainer>
        <DraggableAIButton onPress={handleAIButtonPress} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
