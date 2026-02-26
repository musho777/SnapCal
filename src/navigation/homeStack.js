import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/mainScreen';
import RecipeScreen from '../screens/recipeScreen';
import CategoryScreen from '../screens/categoryScreen';
import AllCategoriesScreen from '../screens/allCategoriesScreen';
import NotificationsScreen from '../screens/notificationsScreen';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Recipient" component={RecipeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
