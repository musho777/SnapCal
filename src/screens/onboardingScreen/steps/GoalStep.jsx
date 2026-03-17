import { useEffect } from 'react';
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
import { GOAL_OPTIONS } from '../constants';
import { styles } from '../../../themes';

const GoalStep = ({ selectedGoal, onSelectGoal, accentColor, accentLight }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={localStyles.scrollContent}
    >
      <View style={localStyles.container}>
        {GOAL_OPTIONS.map((option, index) => (
          <Animated.View
            key={option.id}
            entering={FadeInLeft.delay(index * 100)}
          >
            <GoalOption
              option={option}
              isSelected={selectedGoal === option.id}
              onPress={() => onSelectGoal(option.id)}
              accentColor={accentColor}
              accentLight={accentLight}
            />
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const GoalOption = ({
  option,
  isSelected,
  onPress,
  accentColor,
  accentLight,
}) => {
  const radioScale = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    radioScale.value = withSpring(isSelected ? 1 : 0, {
      damping: 12,
      stiffness: 200,
    });
  }, [isSelected, radioScale]);

  const radioAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: radioScale.value }],
  }));

  const optionColorStyle = isSelected
    ? { borderColor: accentColor, backgroundColor: accentLight }
    : null;

  const optionShadowColorStyle =
    isSelected && Platform.OS === 'ios' ? { shadowColor: accentColor } : null;

  const iconBoxStyle = isSelected
    ? [localStyles.iconBox]
    : [localStyles.iconBox, localStyles.iconBoxUnselected];

  const iconBoxColorStyle = isSelected
    ? { backgroundColor: accentColor }
    : null;

  const radioOuterStyle = isSelected
    ? [localStyles.radioOuter]
    : [localStyles.radioOuter, localStyles.radioOuterUnselected];

  const radioOuterColorStyle = isSelected
    ? { borderColor: accentColor, backgroundColor: accentColor }
    : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[localStyles.option, optionColorStyle, optionShadowColorStyle]}
    >
      <View style={[iconBoxStyle, iconBoxColorStyle]}>
        <Text style={localStyles.icon}>{option.icon}</Text>
      </View>

      <View style={styles.flex}>
        <Text style={localStyles.title}>{option.title}</Text>
        <Text style={localStyles.subtitle}>{option.subtitle}</Text>
      </View>

      <View style={[radioOuterStyle, radioOuterColorStyle]}>
        <Animated.View style={[localStyles.radioDot, radioAnimatedStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
  },
  container: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    backgroundColor: '#fff',
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxUnselected: {
    backgroundColor: '#F0F0F0',
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterUnselected: {
    borderColor: '#E0E0E0',
    backgroundColor: 'transparent',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default GoalStep;
