import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInLeft,
} from 'react-native-reanimated';
import { ACTIVITY_OPTIONS } from '../constants';

const ActivityStep = ({
  selectedActivity,
  onSelectActivity,
  accentColor,
  accentLight,
}) => {
  return (
    <FlatList
      data={ACTIVITY_OPTIONS}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInLeft.delay(index * 100)}>
          <ActivityOption
            option={item}
            isSelected={selectedActivity === item.id}
            onPress={() => onSelectActivity(item.id)}
            accentColor={accentColor}
            accentLight={accentLight}
          />
        </Animated.View>
      )}
    />
  );
};

const ActivityOption = ({
  option,
  isSelected,
  onPress,
  accentColor,
  accentLight,
}) => {
  const radioScale = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    radioScale.value = withSpring(isSelected ? 1 : 0, {
      damping: 12,
      stiffness: 200,
    });
  }, [isSelected]);

  const radioAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: radioScale.value }],
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
              shadowOpacity: 0.25,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 4 },
            },
            android: {
              elevation: 4,
            },
          }),
        },
      ]}
    >
      {/* Icon Box */}
      <View
        style={[
          styles.iconBox,
          {
            backgroundColor: isSelected ? accentColor : '#F0F0F0',
          },
        ]}
      >
        <Text style={styles.icon}>{option.icon}</Text>
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{option.title}</Text>
        <Text style={styles.subtitle}>{option.subtitle}</Text>
      </View>

      {/* Radio Circle */}
      <View
        style={[
          styles.radioOuter,
          {
            borderColor: isSelected ? accentColor : '#E0E0E0',
            backgroundColor: isSelected ? accentColor : 'transparent',
          },
        ]}
      >
        <Animated.View
          style={[styles.radioDot, radioAnimatedStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 8,
  },
  separator: {
    height: 10,
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
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
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
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default ActivityStep;
