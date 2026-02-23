import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Header,
  DaySelector,
  SummaryCard,
  MealSection,
  WeeklyChart,
} from './components';

const MealPlanScreen = ({ navigation }) => {
  const [activeDay, setActiveDay] = useState('mon');
  const [expandedSections, setExpandedSections] = useState({
    breakfast: true,
    lunch: false,
    dinner: false,
    snacks: false,
  });

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

  const activeDayPlan = plan[activeDay] || {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  };
  const allFoods = Object.values(activeDayPlan).flat();
  const totalKcal = allFoods.reduce((sum, food) => sum + food.kcal, 0);
  const totalProtein = allFoods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = Math.round((totalKcal * 0.5) / 4);
  const totalFat = Math.round((totalKcal * 0.3) / 9);

  const goalKcal = 2000;

  const toggleSection = sectionId => {
    const newExpanded = !expandedSections[sectionId];
    setExpandedSections({ ...expandedSections, [sectionId]: newExpanded });
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
    navigation.navigate('Explore', {
      screen: 'Search',
      params: { mealType },
    });
  };

  return (
    <View style={styles.container}>
      <Header />

      <DaySelector
        weeklyData={weeklyData}
        activeDay={activeDay}
        onDayChange={setActiveDay}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <SummaryCard
          totalKcal={totalKcal}
          goalKcal={goalKcal}
          totalCarbs={totalCarbs}
          totalProtein={totalProtein}
          totalFat={totalFat}
        />

        {mealSections.map(section => {
          const foods = activeDayPlan[section.id] || [];
          const isExpanded = expandedSections[section.id];

          return (
            <MealSection
              key={section.id}
              section={section}
              foods={foods}
              isExpanded={isExpanded}
              onToggle={() => toggleSection(section.id)}
              onDeleteFood={foodId => deleteFood(section.id, foodId)}
              onAddFood={() => handleAddFood(section.id)}
            />
          );
        })}

        <WeeklyChart
          weeklyData={weeklyData}
          activeDay={activeDay}
          goalKcal={goalKcal}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
});

export default MealPlanScreen;
