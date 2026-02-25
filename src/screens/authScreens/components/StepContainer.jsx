import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const StepContainer = ({ title, subtitle, children }) => {
  return (
    <View>
      <View style={styles.header}>
        <Animated.Text entering={FadeInUp.delay(0)} style={styles.title}>
          {title}
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(100)} style={styles.subtitle}>
          {subtitle}
        </Animated.Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default StepContainer;
