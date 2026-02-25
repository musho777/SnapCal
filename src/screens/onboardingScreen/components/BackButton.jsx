import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { GoBackIcon } from '../../../assets/Icons';

const BackButton = ({ onPress }) => {
  return (
    <Animated.View entering={FadeIn.delay(100)}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        activeOpacity={0.8}
      >
        <View style={styles.androidContainer}>
          <GoBackIcon />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 30,
    left: 10,
    zIndex: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
  },
  blurView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
