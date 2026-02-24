import React from 'react';
import { TouchableOpacity, StyleSheet, Platform, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
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
        {Platform.OS === 'ios' ? (
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.8)"
          >
            <GoBackIcon />
          </BlurView>
        ) : (
          <AndroidBackButton />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const AndroidBackButton = () => (
  <View style={styles.androidContainer}>
    <GoBackIcon />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
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
