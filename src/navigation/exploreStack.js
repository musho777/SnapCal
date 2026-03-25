import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeScreen from '../screens/recipeScreen';
import ExploreScreen from '../screens/exploreScreen';
import FoodScanScreen from '../screens/foodScanScreen';

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
      <Stack.Screen name="FoodScan" component={FoodScanScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
