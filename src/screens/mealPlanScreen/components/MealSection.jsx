import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { DownAndUpIcon } from '../../../assets/Icons';

const MealSection = ({
  section,
  foods,
  isExpanded,
  onToggle,
  onDeleteFood,
  onAddFood,
}) => {
  const sectionKcal = foods.reduce((sum, food) => sum + food.kcal, 0);
  const rotationAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.mealSection}>
      {/* Section Header */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View
          style={[styles.sectionIcon, { backgroundColor: section.color }]}
        >
          <Text style={styles.sectionEmoji}>{section.emoji}</Text>
        </View>
        <View style={styles.sectionInfo}>
          <Text style={styles.sectionLabel}>{section.label}</Text>
          <Text style={styles.sectionTime}>{section.time}</Text>
        </View>
        <View style={styles.sectionStats}>
          <Text style={styles.sectionKcal}>{sectionKcal} Kcal</Text>
          <Text style={styles.sectionCount}>{foods.length} items</Text>
        </View>
        <Animated.View
          style={[styles.sectionChevron, { transform: [{ rotate: rotation }] }]}
        >
          <DownAndUpIcon />
        </Animated.View>
      </TouchableOpacity>

      {/* Food Items */}
      {isExpanded && (
        <View style={styles.sectionContent}>
          {foods.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🍽</Text>
              <Text style={styles.emptyText}>No meals added yet</Text>
            </View>
          ) : (
            foods.map(food => (
              <View key={food.id} style={styles.foodItem}>
                <View style={styles.foodThumbnail}>
                  <Text style={styles.foodEmoji}>{food.emoji}</Text>
                </View>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <View style={styles.foodMeta}>
                    <Text style={styles.foodPortion}>{food.portion}</Text>
                    <Text style={styles.foodDot}>•</Text>
                    <Text style={styles.foodKcal}>{food.kcal} Kcal</Text>
                  </View>
                </View>
                <View style={styles.proteinBadge}>
                  <Text style={styles.proteinBadgeText}>{food.protein}g</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onDeleteFood(food.id)}
                >
                  <Text style={styles.deleteIcon}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          {/* Add Food Button */}
          <TouchableOpacity
            style={[styles.addFoodButton, { borderColor: section.accent }]}
            onPress={onAddFood}
          >
            <Text style={[styles.addFoodText, { color: section.accent }]}>
              + Add Food
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mealSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  sectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionEmoji: {
    fontSize: 18,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#272727',
  },
  sectionTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  sectionStats: {
    alignItems: 'flex-end',
  },
  sectionKcal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#272727',
  },
  sectionCount: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  sectionChevron: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  sectionContent: {
    padding: 14,
    paddingTop: 0,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 2,
  },
  foodThumbnail: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodEmoji: {
    fontSize: 20,
  },
  foodInfo: {
    flex: 1,
    marginLeft: 10,
  },
  foodName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#272727',
  },
  foodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  foodPortion: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  foodDot: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  foodKcal: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  proteinBadge: {
    backgroundColor: '#F0F4FF',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 8,
  },
  proteinBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6366F1',
  },
  deleteButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 18,
    color: '#EF4444',
    fontWeight: '600',
  },
  addFoodButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  addFoodText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default MealSection;
