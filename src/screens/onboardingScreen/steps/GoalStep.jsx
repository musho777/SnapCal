import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInLeft,
} from 'react-native-reanimated';
import { GOAL_OPTIONS } from '../constants';

const GoalStep = ({ selectedGoal, onSelectGoal, accentColor, accentLight }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        {GOAL_OPTIONS.map((option, index) => (
          <Animated.View
            key={option.id}
            entering={FadeInLeft.delay(index * 100)}
          >
            <GoalOption
              option={option}
              isSelected={selectedGoal === option.id}
              onPress={() => onSelectGoal(option.id)}
              accentColor={accentColor}
              accentLight={accentLight}
            />
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const GoalOption = ({
  option,
  isSelected,
  onPress,
  accentColor,
  accentLight,
}) => {
  const radioScale = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    radioScale.value = withSpring(isSelected ? 1 : 0, {
      damping: 12,
      stiffness: 200,
    });
  }, [isSelected]);

  const radioAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: radioScale.value }],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.option,
        isSelected && {
          borderColor: accentColor,
          backgroundColor: accentLight,
          ...Platform.select({
            ios: {
              shadowColor: accentColor,
              shadowOpacity: 0.25,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 4 },
            },
            android: {
              elevation: 4,
            },
          }),
        },
      ]}
    >
      <View
        style={[
          styles.iconBox,
          {
            backgroundColor: isSelected ? accentColor : '#F0F0F0',
          },
        ]}
      >
        <Text style={styles.icon}>{option.icon}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{option.title}</Text>
        <Text style={styles.subtitle}>{option.subtitle}</Text>
      </View>

      <View
        style={[
          styles.radioOuter,
          {
            borderColor: isSelected ? accentColor : '#E0E0E0',
            backgroundColor: isSelected ? accentColor : 'transparent',
          },
        ]}
      >
        <Animated.View style={[styles.radioDot, radioAnimatedStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
  },
  container: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default GoalStep;
