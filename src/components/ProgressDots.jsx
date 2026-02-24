import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ProgressDots = ({
  currentStep,
  totalSteps,
  accentColor,
  accentLight,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Dot
          key={index}
          isActive={index === currentStep}
          isPast={index < currentStep}
          accentColor={accentColor}
          accentLight={accentLight}
        />
      ))}
    </View>
  );
};

const Dot = ({ isActive, isPast, accentColor, accentLight }) => {
  const width = useSharedValue(6);

  useEffect(() => {
    width.value = withTiming(isActive ? 22 : 6, { duration: 300 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const backgroundColor = isPast || isActive ? accentColor : accentLight;

  return (
    <Animated.View style={[styles.dot, animatedStyle, { backgroundColor }]} />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});

export default ProgressDots;
