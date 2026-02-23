import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';

export const UIToggleSwitch = ({ value, onToggle }) => {
  const translateX = useRef(new Animated.Value(value ? 23 : 3)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 23 : 3,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  return (
    <TouchableOpacity
      style={[
        localStyles.container,
        value ? localStyles.containerActive : localStyles.containerInactive,
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[localStyles.circle, { transform: [{ translateX }] }]}
      />
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  containerActive: {
    backgroundColor: '#272727',
  },
  containerInactive: {
    backgroundColor: '#E5E7EB',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
});
