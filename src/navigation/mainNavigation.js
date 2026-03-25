import { useCallback, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TrackScreen from '../screens/trackScreen';
import MealPlanScreen from '../screens/mealPlanScreen';
import ProfileScreen from '../screens/profileScreen';
import CustomTabBar from '../components/customTabBar';
import HomeStack from './homeStack';
import ExploreStack from './exploreStack';
import CreateMealStack from './createMealStack';
import OnboardingFlow from '../screens/onboardingScreen';
import LoginScreen from '../screens/authScreens/login/LoginScreen.jsx';
import RegisterScreen from '../screens/authScreens/register/RegisterScreen.jsx';
import Loading from '../components/loading/Loading.jsx';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../features/auth/authActions.js';
import RecipeScreen from '../screens/recipeScreen/RecipeScreen.jsx';
import WeightProgressScreen from '../screens/weightProgressScreen';
import FoodScanScreen from '../screens/foodScanScreen/FoodScanScreen.jsx';
import { View } from 'react-native';
import DraggableAIButton from '../common-ui/uIButton/DraggableAIButton.jsx';
import { styles } from '../themes/index.js';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const TabNavigator = () => {
  const renderTabBar = useCallback(props => <CustomTabBar {...props} />, []);
  const navigation = useNavigation();

  const handleAIButtonPress = () => {
    navigation.navigate('FoodScan');
  };

  return (
    <View style={styles.flex}>
      <Tab.Navigator
        tabBar={renderTabBar}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Explore" component={ExploreStack} />
        <Tab.Screen name="Track" component={TrackScreen} />
        <Tab.Screen name="MealPlan" component={MealPlanScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <DraggableAIButton onPress={handleAIButtonPress} />
    </View>
  );
};

export const MainNavigation = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Onboarding');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );
        if (onboardingCompleted === 'true') {
          setInitialRoute('MainApp');
        } else {
          setInitialRoute('Onboarding');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsReady(true);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRoute}
    >
      <RootStack.Screen name="Onboarding" component={OnboardingFlow} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RootStack.Screen name="MainApp" component={TabNavigator} />
      <RootStack.Screen name="Recipient" component={RecipeScreen} />
      <RootStack.Screen
        name="WeightProgress"
        component={WeightProgressScreen}
      />
      <RootStack.Screen
        name="FoodScan"
        component={FoodScanScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <RootStack.Screen
        name="CreateMeal"
        component={CreateMealStack}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </RootStack.Navigator>
  );
};
