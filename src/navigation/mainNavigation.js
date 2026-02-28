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
import CreateMealScreen from '../screens/createMealScreen';
import OnboardingFlow from '../screens/onboardingScreen';
import LoginScreen from '../screens/authScreens/login/LoginScreen.jsx';
import RegisterScreen from '../screens/authScreens/register/RegisterScreen.jsx';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const TabNavigator = () => {
  const renderTabBar = useCallback(props => <CustomTabBar {...props} />, []);

  return (
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
  );
};

export const MainNavigation = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );
        console.log('Onboarding completed:', onboardingCompleted);
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

  if (!isReady) {
    return null;
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
      <RootStack.Screen
        name="CreateMeal"
        component={CreateMealScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </RootStack.Navigator>
  );
};
