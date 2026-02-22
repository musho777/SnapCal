import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeScreen from '../screens/recipeScreen';
import ExploreScreen from '../screens/exploreScreen';

const ExploreStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Search"
    >
      <Stack.Screen name="Search" component={ExploreScreen} />
      <Stack.Screen name="ExploreRecipient" component={RecipeScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
