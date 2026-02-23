import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const WizardFooter = ({ currentStep, onContinue, isValid }) => {
  const buttonText = currentStep < 6 ? 'Continue →' : '🎉 Create Meal';

  return (
    <LinearGradient
      colors={['rgba(245,245,245,0)', 'rgba(245,245,245,1)']}
      style={localStyles.gradient}
    >
      <TouchableOpacity
        onPress={onContinue}
        disabled={!isValid}
        style={[
          localStyles.button,
          {
            backgroundColor: isValid ? '#6B39F4' : '#E0E0E0',
          },
        ]}
      >
        <Text
          style={[
            localStyles.buttonText,
            {
              color: isValid ? '#fff' : '#999',
            },
          ]}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const localStyles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
