import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const ToggleSwitch = ({ value, onToggle }) => {
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
        { backgroundColor: value ? '#272727' : '#E5E7EB' },
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          localStyles.circle,
          {
            transform: [{ translateX }],
          },
        ]}
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
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
});

export default ToggleSwitch;
