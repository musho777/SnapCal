import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Header,
  DaySelector,
  SummaryCard,
  MealSection,
  WeeklyChart,
} from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainPlan } from '../../features/mealPlan/mealPlanSlice';
import { getMainPlanRange } from '../../features/mealPlan/mealPlanAction';

const MealPlanScreen = ({ navigation }) => {
  const [activeDay, setActiveDay] = useState(6);
  const data = useSelector(selectMainPlan);
  const dispatch = useDispatch();
  const [expandedSections, setExpandedSections] = useState({
    breakfast: true,
    lunch: false,
    dinner: false,
    snacks: false,
  });
  const weeklyData = [
    { day: 'Mon', date: 6, id: 6, calories: 1745 },
    { day: 'Tue', date: 7, id: 7 },
    { day: 'Wed', date: 8, id: 8 },
    { day: 'Thu', date: 9, id: 9 },
    { day: 'Fri', date: 10, id: 10 },
    { day: 'Sat', date: 11, id: 11 },
    { day: 'Sun', date: 12, id: 12 },
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

  const toggleSection = sectionId => {
    const newExpanded = !expandedSections[sectionId];
    setExpandedSections({ ...expandedSections, [sectionId]: newExpanded });
  };

  const deleteFood = (sectionId, foodId) => {
    // setPlan();
  };

  const handleAddFood = mealType => {
    navigation.navigate('Explore', {
      screen: 'Search',
      params: { mealType },
    });
  };

  useEffect(() => {
    dispatch(
      getMainPlanRange({ start_date: '2026-03-05', end_date: '2026-03-07' }),
    );
  }, [dispatch]);
  if (data.length === 0) {
    return;
  }

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
          totalKcal={data[0]?.calories_burned}
          goalKcal={data[0]?.calories_consumed || null}
          totalCarbs={data[0]?.carbs_consumed_g}
          totalProtein={data[0]?.protein_consumed_g}
          totalFat={data[0]?.fats_consumed_g}
        />

        {mealSections.map(section => {
          const foods =
            data[0]?.meals.filter(e => e.meal_type === section.id) || [];
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

        <WeeklyChart weeklyData={weeklyData} activeDay={activeDay} />
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
