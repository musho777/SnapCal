import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HomeIcon,
  ExploreIcon,
  MealPlanIcon,
  ProfileIcon,
} from '../../assets/Icons';
import { FloatingCenterButton } from '../../common-ui/uIButton';

const ACTIVE_COLOR = '#272727';
const INACTIVE_COLOR = '#9CA3AF';

const TabButton = ({ route, isFocused, onPress, onLongPress }) => {
  const getIcon = () => {
    const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;
    const size = 24;

    switch (route.name) {
      case 'Home':
        return <HomeIcon color={color} size={size} />;
      case 'Explore':
        return <ExploreIcon color={color} size={size} />;
      case 'MealPlan':
        return <MealPlanIcon color={color} size={size} />;
      case 'Profile':
        return <ProfileIcon color={color} size={size} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (route.name) {
      case 'Home':
        return 'Home';
      case 'Explore':
        return 'Explore';
      case 'MealPlan':
        return 'Meal Plan';
      case 'Profile':
        return 'Profile';
      default:
        return route.name;
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={localStyles.tabButton}
    >
      <View style={localStyles.tabIconContainer}>
        {isFocused && <View style={localStyles.dotIndicator} />}
        {getIcon()}
      </View>
      <Text
        style={[
          localStyles.tabLabel,
          isFocused ? localStyles.tabLabelActive : localStyles.tabLabelInactive,
        ]}
      >
        {getLabel()}
      </Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const handleCenterButtonPress = () => {
    const trackRoute = state.routes.find(route => route.name === 'Track');
    if (trackRoute) {
      const event = navigation.emit({
        type: 'tabPress',
        target: trackRoute.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(trackRoute.name);
      }
    }
  };

  return (
    <View
      style={[
        localStyles.container,
        { paddingBottom: Math.max(insets.bottom, 24) },
      ]}
    >
      <View style={localStyles.tabBar}>
        {state.routes.map((route, index) => {
          if (route.name === 'Track') {
            return (
              <View key={route.key} style={localStyles.centerPlaceholder} />
            );
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabButton
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
        <FloatingCenterButton onPress={handleCenterButtonPress} />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 36,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    position: 'relative',
  },
  dotIndicator: {
    position: 'absolute',
    top: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ACTIVE_COLOR,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  tabLabelActive: {
    color: ACTIVE_COLOR,
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: INACTIVE_COLOR,
    fontWeight: '400',
  },
  centerPlaceholder: {
    flex: 1,
  },
});
export default CustomTabBar;
