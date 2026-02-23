import { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TrackScreen from '../screens/trackScreen';
import MealPlanScreen from '../screens/mealPlanScreen';
import ProfileScreen from '../screens/profileScreen';
import CustomTabBar from '../components/customTabBar';
import HomeStack from './homeStack';
import ExploreStack from './exploreStack';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
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
