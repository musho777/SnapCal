import { useCallback, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  const [onboardingCompleted, setOnboardingCompleted] = useState(true);

  const handleOnboardingComplete = userData => {
    console.log('Onboarding completed with data:', userData);
    setOnboardingCompleted(true);
  };

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingCompleted ? (
        <RootStack.Screen name="Onboarding">
          {props => (
            <OnboardingFlow {...props} onComplete={handleOnboardingComplete} />
          )}
        </RootStack.Screen>
      ) : (
        <>
          <RootStack.Screen name="MainApp" component={TabNavigator} />
          <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen
            name="CreateMeal"
            component={CreateMealScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};
