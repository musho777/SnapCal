import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: -4 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
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
