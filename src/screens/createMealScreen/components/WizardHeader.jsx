import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const stepInfo = [
  { icon: '📝', label: 'Basic Info' },
  { icon: '🔥', label: 'Nutrition' },
  { icon: '⏱', label: 'Recipe Info' },
  { icon: '🥦', label: 'Ingredients' },
  { icon: '👨‍🍳', label: 'Cooking Steps' },
  { icon: '✅', label: 'Review' },
];

export const WizardHeader = ({ currentStep, onBack, totalSteps = 6 }) => {
  const renderProgressDots = () => {
    return Array.from({ length: totalSteps }, (_, index) => {
      const stepNumber = index + 1;
      const isActive = stepNumber === currentStep;
      const isPast = stepNumber < currentStep;

      return (
        <Animated.View
          key={stepNumber}
          style={[
            localStyles.dot,
            {
              width: isActive ? 20 : 8,
              backgroundColor: isActive || isPast ? '#272727' : '#E8E8E8',
            },
          ]}
        />
      );
    });
  };

  const currentStepInfo = stepInfo[currentStep - 1];

  return (
    <View style={localStyles.container}>
      <View style={localStyles.headerRow}>
        <TouchableOpacity
          style={[
            localStyles.backButton,
            currentStep === 1 && localStyles.backButtonDisabled,
          ]}
          onPress={onBack}
          disabled={currentStep === 1}
        >
          <Text
            style={[
              localStyles.backText,
              currentStep === 1 && localStyles.backTextDisabled,
            ]}
          >
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={localStyles.title}>Create Meal</Text>

        <Text style={localStyles.stepCounter}>
          {currentStep}/{totalSteps}
        </Text>
      </View>

      <View style={localStyles.dotsRow}>{renderProgressDots()}</View>

      <View style={localStyles.stepLabelRow}>
        <View style={localStyles.iconContainer}>
          <Text style={localStyles.iconText}>{currentStepInfo.icon}</Text>
        </View>
        <Text style={localStyles.stepLabel}>{currentStepInfo.label}</Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonDisabled: {
    opacity: 0.3,
  },
  backText: {
    fontSize: 20,
    color: '#272727',
    fontWeight: '600',
  },
  backTextDisabled: {
    color: '#999',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    flex: 1,
  },
  stepCounter: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    width: 36,
    textAlign: 'right',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  stepLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 14,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1A1A',
  },
});
