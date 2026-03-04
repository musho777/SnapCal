import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { CountdownModal } from './CountdownModal';

const StepItem = ({ step, index, isCompleted, onToggle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isCompleted) {
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 0,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isCompleted]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`Step ${index + 1}: ${step}`}
        accessibilityState={{ checked: isCompleted }}
        style={localStyles.stepItem}
      >
        <View
          style={[
            localStyles.stepNumber,
            isCompleted && localStyles.stepNumberCompleted,
          ]}
        >
          {!isCompleted ? (
            <Text style={localStyles.stepNumberText}>{index + 1}</Text>
          ) : (
            <Animated.View
              style={{
                transform: [{ scale: checkmarkScale }],
              }}
            >
              <Text style={localStyles.checkmark}>✓</Text>
            </Animated.View>
          )}
        </View>
        <Animated.View
          style={[
            localStyles.stepContent,
            isCompleted && localStyles.stepContentCompleted,
            { opacity: fadeAnim },
          ]}
        >
          <Text
            style={[
              localStyles.stepText,
              isCompleted && localStyles.stepTextCompleted,
            ]}
          >
            {step}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export const CookingSteps = ({ steps, cookTime }) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showClock, setShowClock] = useState(false);

  const toggleStep = index => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);

        if (newSet.size === steps.length) {
          setShowClock(true);
        }
      }
      return newSet;
    });
  };

  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <Text style={localStyles.icon}>👨‍🍳</Text>
        <Text style={localStyles.sectionTitle}>Cooking Instructions</Text>
        {completedSteps.size > 0 && (
          <View style={localStyles.progressBadge}>
            <Text style={localStyles.progressText}>
              {completedSteps.size}/{steps.length}
            </Text>
          </View>
        )}
      </View>

      <View style={localStyles.stepsList}>
        {steps.map((step, index) => (
          <StepItem
            key={index}
            step={step}
            index={index}
            isCompleted={completedSteps.has(index)}
            onToggle={() => toggleStep(index)}
          />
        ))}
      </View>

      <CountdownModal
        visible={showClock}
        onClose={() => setShowClock(false)}
        cookTime={cookTime}
        stepText={
          'All steps completed! Time to cook for ' + cookTime + ' minutes.'
        }
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  icon: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    flex: 1,
  },
  progressBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#272727',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberCompleted: {
    backgroundColor: '#10B981',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkmark: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  stepContentCompleted: {
    backgroundColor: '#ECFDF5',
  },
  stepText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#171717',
  },
  stepTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
});
