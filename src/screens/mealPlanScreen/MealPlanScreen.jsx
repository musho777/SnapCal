import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { DownAndUpIcon } from '../../assets/Icons';

const MealPlanScreen = ({ navigation }) => {
  const [activeDay, setActiveDay] = useState('mon');
  const [expandedSections, setExpandedSections] = useState({
    breakfast: true,
    lunch: false,
    dinner: false,
    snacks: false,
  });

  // Sample meal plan data
  const [plan, setPlan] = useState({
    mon: {
      breakfast: [
        {
          id: 1,
          emoji: '🥞',
          name: 'Protein Pancakes',
          portion: '3 pieces',
          kcal: 320,
          protein: 24,
        },
        {
          id: 2,
          emoji: '🍌',
          name: 'Banana',
          portion: '1 medium',
          kcal: 105,
          protein: 1,
        },
      ],
      lunch: [
        {
          id: 3,
          emoji: '🥗',
          name: 'Caesar Salad',
          portion: '1 bowl',
          kcal: 380,
          protein: 32,
        },
        {
          id: 4,
          emoji: '🍗',
          name: 'Grilled Chicken',
          portion: '150g',
          kcal: 248,
          protein: 46,
        },
      ],
      dinner: [
        {
          id: 5,
          emoji: '🍝',
          name: 'Pasta Carbonara',
          portion: '1 plate',
          kcal: 520,
          protein: 28,
        },
      ],
      snacks: [
        {
          id: 6,
          emoji: '🥜',
          name: 'Almonds',
          portion: '30g',
          kcal: 172,
          protein: 6,
        },
      ],
    },
    tue: {
      breakfast: [
        {
          id: 7,
          emoji: '🥚',
          name: 'Scrambled Eggs',
          portion: '3 eggs',
          kcal: 270,
          protein: 18,
        },
      ],
      lunch: [],
      dinner: [
        {
          id: 8,
          emoji: '🍕',
          name: 'Margherita Pizza',
          portion: '2 slices',
          kcal: 580,
          protein: 22,
        },
      ],
      snacks: [],
    },
    wed: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    thu: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    fri: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    sat: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    sun: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  });

  // Weekly data for chart
  const weeklyData = [
    { day: 'Mon', date: 17, calories: 1745, id: 'mon' },
    { day: 'Tue', date: 18, calories: 850, id: 'tue' },
    { day: 'Wed', date: 19, calories: 0, id: 'wed' },
    { day: 'Thu', date: 20, calories: 0, id: 'thu' },
    { day: 'Fri', date: 21, calories: 0, id: 'fri' },
    { day: 'Sat', date: 22, calories: 0, id: 'sat' },
    { day: 'Sun', date: 23, calories: 0, id: 'sun' },
  ];

  const mealSections = [
    {
      id: 'breakfast',
      label: 'Breakfast',
      emoji: '🌅',
      time: '7–10 AM',
      color: '#FFF8E7',
      accent: '#F59E0B',
    },
    {
      id: 'lunch',
      label: 'Lunch',
      emoji: '🌞',
      time: '12–2 PM',
      color: '#F0FFF4',
      accent: '#22C55E',
    },
    {
      id: 'dinner',
      label: 'Dinner',
      emoji: '🌙',
      time: '6–9 PM',
      color: '#F0F4FF',
      accent: '#6366F1',
    },
    {
      id: 'snacks',
      label: 'Snacks',
      emoji: '🍿',
      time: 'Anytime',
      color: '#FFF0F0',
      accent: '#EF4444',
    },
  ];

  // Calculate totals for active day
  const activeDayPlan = plan[activeDay] || {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  };
  const allFoods = Object.values(activeDayPlan).flat();
  const totalKcal = allFoods.reduce((sum, food) => sum + food.kcal, 0);
  const totalProtein = allFoods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = Math.round((totalKcal * 0.5) / 4); // Estimated from calories
  const totalFat = Math.round((totalKcal * 0.3) / 9); // Estimated from calories

  const goalKcal = 2000;
  const percentComplete = Math.min(
    Math.round((totalKcal / goalKcal) * 100),
    100,
  );
  const kcalLeft = Math.max(goalKcal - totalKcal, 0);

  // Animated values
  const progressAnim = useRef(new Animated.Value(0)).current;
  const rotationAnims = useRef(
    mealSections.reduce((acc, section) => {
      acc[section.id] = new Animated.Value(
        expandedSections[section.id] ? 1 : 0,
      );
      return acc;
    }, {}),
  ).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: totalKcal,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [totalKcal]);

  const toggleSection = sectionId => {
    const newExpanded = !expandedSections[sectionId];
    setExpandedSections({ ...expandedSections, [sectionId]: newExpanded });

    Animated.timing(rotationAnims[sectionId], {
      toValue: newExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const deleteFood = (sectionId, foodId) => {
    setPlan({
      ...plan,
      [activeDay]: {
        ...plan[activeDay],
        [sectionId]: plan[activeDay][sectionId].filter(
          food => food.id !== foodId,
        ),
      },
    });
  };

  const handleAddFood = mealType => {
    // Navigate to Explore screen with meal type filter
    navigation.navigate('Explore', {
      screen: 'Search',
      params: { mealType },
    });
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, goalKcal],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Meal Plan</Text>
          <Text style={styles.headerSubtitle}>February 2026</Text>
        </View>
        <TouchableOpacity style={styles.newPlanButton}>
          <Text style={styles.newPlanButtonText}>+ New Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Day Selector */}
      <View style={styles.daySelectorContainer}>
        <View style={styles.daySelector}>
          {weeklyData.map(day => {
            const isActive = activeDay === day.id;
            const hasData = day.calories > 0;
            return (
              <TouchableOpacity
                key={day.id}
                style={[styles.dayButton, isActive && styles.dayButtonActive]}
                onPress={() => setActiveDay(day.id)}
              >
                <Text
                  style={[styles.dayLabel, isActive && styles.dayLabelActive]}
                >
                  {day.day}
                </Text>
                <Text
                  style={[styles.dateLabel, isActive && styles.dateLabelActive]}
                >
                  {day.date}
                </Text>
                {hasData && <View style={styles.dateDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          {/* Decorative circles */}
          <View
            style={[
              styles.decorativeCircle,
              { width: 120, height: 120, top: -20, right: -20 },
            ]}
          />
          <View
            style={[
              styles.decorativeCircle,
              { width: 80, height: 80, bottom: 20, left: -10 },
            ]}
          />

          {/* Top Row */}
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>TODAY'S CALORIES</Text>
              <View style={styles.summaryCalorieRow}>
                <Text style={styles.summaryCalories}>{totalKcal}</Text>
                <Text style={styles.summaryGoal}> / {goalKcal} Kcal</Text>
              </View>
            </View>
            <View style={styles.summaryIcon}>
              <Text style={styles.summaryEmoji}>🔥</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressBar, { width: progressWidth }]}
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>
                {percentComplete}% of daily goal
              </Text>
              <Text style={styles.progressLabel}>{kcalLeft} Kcal left</Text>
            </View>
          </View>

          {/* Macro Pills */}
          <View style={styles.macroPills}>
            <View style={styles.macroPill}>
              <Text style={styles.macroPillValue}>{totalCarbs}g</Text>
              <Text style={styles.macroPillLabel}>CARBS</Text>
              <View style={styles.macroPillProgress}>
                <View
                  style={[
                    styles.macroPillProgressBar,
                    { width: '65%', backgroundColor: '#F59E0B' },
                  ]}
                />
              </View>
            </View>
            <View style={styles.macroPill}>
              <Text style={styles.macroPillValue}>{totalProtein}g</Text>
              <Text style={styles.macroPillLabel}>PROTEIN</Text>
              <View style={styles.macroPillProgress}>
                <View
                  style={[
                    styles.macroPillProgressBar,
                    { width: '78%', backgroundColor: '#6366F1' },
                  ]}
                />
              </View>
            </View>
            <View style={styles.macroPill}>
              <Text style={styles.macroPillValue}>{totalFat}g</Text>
              <Text style={styles.macroPillLabel}>FAT</Text>
              <View style={styles.macroPillProgress}>
                <View
                  style={[
                    styles.macroPillProgressBar,
                    { width: '52%', backgroundColor: '#22C55E' },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Meal Sections */}
        {mealSections.map(section => {
          const foods = activeDayPlan[section.id] || [];
          const sectionKcal = foods.reduce((sum, food) => sum + food.kcal, 0);
          const isExpanded = expandedSections[section.id];
          const rotation = rotationAnims[section.id].interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          });

          return (
            <View key={section.id} style={styles.mealSection}>
              {/* Section Header */}
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.sectionIcon,
                    { backgroundColor: section.color },
                  ]}
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
                  style={[
                    styles.sectionChevron,
                    { transform: [{ rotate: rotation }] },
                  ]}
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
                            <Text style={styles.foodPortion}>
                              {food.portion}
                            </Text>
                            <Text style={styles.foodDot}>•</Text>
                            <Text style={styles.foodKcal}>
                              {food.kcal} Kcal
                            </Text>
                          </View>
                        </View>
                        <View style={styles.proteinBadge}>
                          <Text style={styles.proteinBadgeText}>
                            {food.protein}g
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => deleteFood(section.id, food.id)}
                        >
                          <Text style={styles.deleteIcon}>×</Text>
                        </TouchableOpacity>
                      </View>
                    ))
                  )}

                  {/* Add Food Button */}
                  <TouchableOpacity
                    style={[
                      styles.addFoodButton,
                      { borderColor: section.accent },
                    ]}
                    onPress={() => handleAddFood(section.id)}
                  >
                    <Text
                      style={[styles.addFoodText, { color: section.accent }]}
                    >
                      + Add Food
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        {/* Weekly Bar Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Overview</Text>
            <View style={styles.chartDateBadge}>
              <Text style={styles.chartDateText}>Feb 17 - Feb 23</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            {/* Goal Line */}
            <View
              style={[styles.goalLine, { top: (1 - goalKcal / 2500) * 72 }]}
            >
              <Text style={styles.goalLabel}>Goal</Text>
            </View>

            {/* Bars */}
            <View style={styles.chartBars}>
              {weeklyData.map(day => {
                const barHeight = Math.max((day.calories / 2500) * 72, 4);
                const isActive = activeDay === day.id;
                const hasData = day.calories > 0;

                return (
                  <View key={day.id} style={styles.chartColumn}>
                    {day.calories > 0 && (
                      <Text style={styles.barCalories}>{day.calories}</Text>
                    )}
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          { height: barHeight },
                          isActive && styles.barActive,
                          hasData && !isActive && styles.barHasData,
                        ]}
                      />
                    </View>
                    <Text
                      style={[styles.barDay, isActive && styles.barDayActive]}
                    >
                      {day.day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#272727',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  newPlanButton: {
    backgroundColor: '#272727',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  newPlanButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  daySelectorContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  daySelector: {
    flexDirection: 'row',
    gap: 6,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    gap: 4,
  },
  dayButtonActive: {
    backgroundColor: '#272727',
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  dayLabelActive: {
    color: '#fff',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#272727',
  },
  dateLabelActive: {
    color: '#fff',
  },
  dateDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F59E0B',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: '#272727',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  summaryCalorieRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  summaryCalories: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  summaryGoal: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryEmoji: {
    fontSize: 24,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
  },
  macroPills: {
    flexDirection: 'row',
    gap: 8,
  },
  macroPill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 4,
  },
  macroPillValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  macroPillLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  macroPillProgress: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  macroPillProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
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
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#272727',
  },
  chartDateBadge: {
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chartDateText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  chartContainer: {
    position: 'relative',
  },
  goalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#EF4444',
    zIndex: 1,
  },
  goalLabel: {
    fontSize: 9,
    color: '#EF4444',
    fontWeight: '600',
    backgroundColor: '#fff',
    paddingRight: 4,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barCalories: {
    fontSize: 9,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 4,
  },
  barContainer: {
    width: '100%',
    height: 72,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 8,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
  },
  barActive: {
    width: 10,
    backgroundColor: '#272727',
  },
  barHasData: {
    backgroundColor: '#E5E7EB',
  },
  barDay: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 8,
  },
  barDayActive: {
    color: '#272727',
  },
});

export default MealPlanScreen;
