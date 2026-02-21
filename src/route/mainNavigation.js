import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/mainScreen';
import RecipeScreen from '../screens/recipeScreen';
import CategoryScreen from '../screens/categoryScreen/CategoryScreen';
import { AllCategoriesScreen } from '../screens/allCategoriesScreen/AllCategoriesScreen';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Recipient" component={RecipeScreen} />
    </Stack.Navigator>
  );
};
