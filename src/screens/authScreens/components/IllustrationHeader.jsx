import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const IllustrationHeader = ({ meta }) => {
  const blob1Scale = useSharedValue(1);
  const blob2Scale = useSharedValue(1);
  const blob3Scale = useSharedValue(1);
  const blob1Opacity = useSharedValue(1);
  const blob2Opacity = useSharedValue(1);
  const blob3Opacity = useSharedValue(1);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    width: '100%',
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
    width: 280,
    height: 280,
    top: -100,
    right: -80,
  },
  blob2: {
    width: 180,
    height: 180,
    top: -60,
    leftr: 40,
  },
  blob3: {
    width: 180,
    height: 180,
    top: 120,
    left: -40,
  },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  emoji: {
    fontSize: 44,
  },
});

export default IllustrationHeader;
