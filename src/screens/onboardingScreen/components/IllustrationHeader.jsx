import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import ProgressDots from './ProgressDots';

const IllustrationHeader = ({
  meta,
  currentStep,
  totalSteps,
}) => {
  const blob1Scale = useSharedValue(1);
  const blob2Scale = useSharedValue(1);
  const blob3Scale = useSharedValue(1);
  const blob1Opacity = useSharedValue(1);
  const blob2Opacity = useSharedValue(1);
  const blob3Opacity = useSharedValue(1);

  useEffect(() => {
    // Animate blobs when step changes
    blob1Scale.value = withSpring(0.9, {}, () => {
      blob1Scale.value = withSpring(1);
    });
    blob2Scale.value = withSpring(0.8, {}, () => {
      blob2Scale.value = withSpring(1);
    });
    blob3Scale.value = withSpring(0.85, {}, () => {
      blob3Scale.value = withSpring(1);
    });

    blob1Opacity.value = withSpring(0.7, {}, () => {
      blob1Opacity.value = withSpring(1);
    });
    blob2Opacity.value = withSpring(0.6, {}, () => {
      blob2Opacity.value = withSpring(1);
    });
    blob3Opacity.value = withSpring(0.65, {}, () => {
      blob3Opacity.value = withSpring(1);
    });
  }, [currentStep]);

  const blob1Style = useAnimatedStyle(() => ({
    transform: [{ scale: blob1Scale.value }],
    opacity: blob1Opacity.value,
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [{ scale: blob2Scale.value }],
    opacity: blob2Opacity.value,
  }));

  const blob3Style = useAnimatedStyle(() => ({
    transform: [{ scale: blob3Scale.value }],
    opacity: blob3Opacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: meta.bg }]}>
      {/* Decorative Blobs */}
      <Animated.View
        style={[
          styles.blob,
          styles.blob1,
          { backgroundColor: meta.shapes[0] },
          blob1Style,
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blob2,
          { backgroundColor: meta.shapes[1] },
          blob2Style,
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blob3,
          { backgroundColor: meta.shapes[2] },
          blob3Style,
        ]}
      />

      {/* Center Illustration Circle */}
      <LinearGradient
        colors={meta.illustrationBg}
        style={[
          styles.illustrationCircle,
          {
            shadowColor: meta.accent,
            ...Platform.select({
              ios: {
                shadowOpacity: 0.3,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 12 },
              },
              android: {
                elevation: 12,
              },
            }),
          },
        ]}
      >
        <Text style={styles.emoji}>{meta.illustration}</Text>
      </LinearGradient>

      {/* Progress Dots */}
      <ProgressDots
        currentStep={currentStep}
        totalSteps={totalSteps}
        accentColor={meta.accent}
        accentLight={meta.accentLight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blob1: {
    width: 320,
    height: 320,
    top: -100,
    right: -80,
  },
  blob2: {
    width: 200,
    height: 200,
    top: -60,
    right: 40,
  },
  blob3: {
    width: 180,
    height: 180,
    top: 120,
    right: -40,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  emoji: {
    fontSize: 64,
  },
});

export default IllustrationHeader;
