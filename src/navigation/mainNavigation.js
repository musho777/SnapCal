import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExploreScreen from '../screens/exploreScreen';
import TrackScreen from '../screens/trackScreen';
import MealPlanScreen from '../screens/mealPlanScreen';
import ProfileScreen from '../screens/profileScreen';
import { CustomTabBar } from './components/CustomTabBar';
import HomeStack from './homeStack';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="MealPlan" component={MealPlanScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
