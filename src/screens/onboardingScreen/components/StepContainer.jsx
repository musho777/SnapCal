import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const StepContainer = ({ title, subtitle, children }) => {
  return (
    <View style={styles.container}>
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
  container: {
    backgroundColor: '#fff',

    flex: 1,
  },
  header: {
    paddingBottom: 26,
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
    marginTop: 7,
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
});

export default StepContainer;
