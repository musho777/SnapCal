import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Animated, { FadeIn } from 'react-native-reanimated';

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
            <Text style={styles.icon}>‹</Text>
          </BlurView>
        ) : (
          <AndroidBackButton />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Android fallback without blur
const AndroidBackButton = () => (
  <View style={styles.androidContainer}>
    <Text style={styles.icon}>‹</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 52,
    left: 20,
    zIndex: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
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
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },
  icon: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});

export default BackButton;
