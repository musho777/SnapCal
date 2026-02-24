import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInLeft,
} from 'react-native-reanimated';
import { DIET_OPTIONS } from '../constants';

const DietStep = ({ selectedDiet, onSelectDiet, accentColor, accentLight }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        {DIET_OPTIONS.map((option, index) => (
          <Animated.View
            key={option.id}
            entering={FadeInLeft.delay(index * 100)}
            style={styles.width}
          >
            <DietOption
              option={option}
              isSelected={selectedDiet === option.id}
              onPress={() => onSelectDiet(option.id)}
              accentColor={accentColor}
              accentLight={accentLight}
            />
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const DietOption = ({
  option,
  isSelected,
  onPress,
  accentColor,
  accentLight,
}) => {
  const checkScale = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    checkScale.value = withSpring(isSelected ? 1 : 0, {
      damping: 10,
      stiffness: 150,
    });
  }, [checkScale, isSelected]);

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.option,
        isSelected && {
          borderColor: accentColor,
          backgroundColor: accentLight,
          ...Platform.select({
            ios: {
              shadowColor: accentColor,
              shadowOpacity: 0.2,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 4 },
            },
            android: {
              elevation: 4,
            },
          }),
        },
      ]}
    >
      <Text style={styles.icon}>{option.icon}</Text>
      <Text style={styles.title}>{option.title}</Text>

      {isSelected && (
        <Animated.View
          style={[
            styles.checkBadge,
            { backgroundColor: accentColor },
            checkAnimatedStyle,
          ]}
        >
          <Text style={styles.checkIcon}>✓</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  width: {
    width: '48%',
  },
  option: {
    padding: 18,
    paddingVertical: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    position: 'relative',
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff',
  },
});

export default DietStep;
