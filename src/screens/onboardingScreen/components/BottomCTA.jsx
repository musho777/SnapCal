import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BottomCTA = ({ onPress, disabled, isLastStep, accentColor }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['transparent', '#ffffff']}
        style={styles.gradient}
      >
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.9}
          style={[
            styles.button,
            {
              backgroundColor: disabled ? '#E0E0E0' : accentColor,
              shadowColor: accentColor,
              shadowOpacity: disabled ? 0 : 0.45,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: disabled ? '#9CA3AF' : '#fff' },
            ]}
          >
            {isLastStep ? 'Finish Setup 🎉' : 'Continue →'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  gradient: {
    paddingTop: 20,
  },
  button: {
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowRadius: 28,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
});

export default BottomCTA;
