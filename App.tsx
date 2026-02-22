import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './src/navigation/mainNavigation';
import DraggableAIButton from './src/common-ui/DraggableAIButton';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  const handleAIButtonPress = () => {
    console.log('AI Assistant button pressed');
    // Add your AI assistant functionality here
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </NavigationContainer>
      <DraggableAIButton onPress={handleAIButtonPress} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
