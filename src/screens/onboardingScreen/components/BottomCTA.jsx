import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

const BottomCTA = ({ onPress, disabled, isLastStep, accentColor }) => {
  const buttonStyle = disabled
    ? [styles.button, styles.buttonDisabled]
    : styles.button;

  const buttonColorStyle = !disabled
    ? { backgroundColor: accentColor, shadowColor: accentColor }
    : null;

  const textStyle = disabled
    ? [styles.buttonText, styles.buttonTextDisabled]
    : [styles.buttonText, styles.buttonTextActive];

  return (
    <View style={styles.container}>
      <View colors={['transparent', '#ffffff']} style={styles.gradient}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.9}
          style={[buttonStyle, buttonColorStyle]}
        >
          <Text style={textStyle}>
            {isLastStep ? 'Finish Setup 🎉' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
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
        shadowOpacity: 0.45,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  buttonTextActive: {
    color: '#fff',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default BottomCTA;
