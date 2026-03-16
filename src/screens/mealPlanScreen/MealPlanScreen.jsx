import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Header,
  DaySelector,
  SummaryCard,
  MealSection,
  WeeklyChart,
} from './components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMainPlan,
  toggleBurnedDishOptimistic,
  revertBurnedDishOptimistic,
  selectLoading,
} from '../../features/mealPlan/mealPlanSlice';
import {
  getMainPlanRange,
  deleteMealDish,
  burnCalory,
} from '../../features/mealPlan/mealPlanAction';
import Loading from '../../components/loading/Loading';

const MealPlanScreen = ({ navigation }) => {
  const data = useSelector(selectMainPlan);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const weeklyData = useMemo(() => {
    const newData = [];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(yesterday);
      currentDate.setDate(yesterday.getDate() + i);

      const dayName = dayNames[currentDate.getDay()];
      const date = currentDate.getDate();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      const dayData = data.find(d => d.log_date === dateString);

      newData.push({
        day: dayName,
        date: date,
        id: date,
        calories: dayData?.calories_consumed || undefined,
        fullDate: dateString,
      });
    }

    return newData;
  }, [data]);

  const [activeDay, setActiveDay] = useState(
    weeklyData[1]?.date || new Date().getDate(),
  );
  const [expandedSections, setExpandedSections] = useState({
    breakfast: true,
    lunch: false,
    dinner: false,
    snacks: false,
  });

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
      id: 'snack',
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

  const deleteFood = mealDishId => {
    dispatch(deleteMealDish(mealDishId));
  };

  const handleFoodPress = async food => {
    const selectedDay = weeklyData.find(day => day.date === activeDay);
    if (!selectedDay) return;

    const params = {
      date: selectedDay.fullDate,
      dishId: food.dish_id,
      mealId: food.meal_id,
    };

    dispatch(toggleBurnedDishOptimistic(params));
    try {
      await dispatch(burnCalory(params)).unwrap();
    } catch (error) {
      dispatch(revertBurnedDishOptimistic(params));
    }
  };

  const handleAddFood = mealType => {
    navigation.navigate('Explore', {
      screen: 'Search',
      params: { mealType },
    });
  };

  useEffect(() => {
    dispatch(getMainPlanRange({}));
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const selectedDay = weeklyData.find(day => day.date === activeDay);
  const activeDayData = data.find(
    dayData => dayData.log_date === selectedDay?.fullDate,
  );

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
          totalKcal={activeDayData?.calories_burned || null}
          goalKcal={activeDayData?.target_calories || null}
          totalCarbs={activeDayData?.carbs_consumed_g || 0}
          totalProtein={activeDayData?.protein_consumed_g || 0}
          totalFat={activeDayData?.fats_consumed_g || 0}
        />
        {console.log(activeDayData)}
        {mealSections.map(section => {
          const foods =
            activeDayData?.meals.find(e => e.meal_type === section.id) || {};
          const isExpanded = expandedSections[section.id];
          return (
            <MealSection
              key={section.id}
              section={section}
              foods={foods || null}
              burnedDishes={activeDayData?.burned_dishes || []}
              isExpanded={isExpanded}
              onToggle={() => toggleSection(section.id)}
              onDeleteFood={mealDishId => deleteFood(mealDishId)}
              onFoodPress={food => handleFoodPress(food)}
              onAddFood={() => handleAddFood(section.id)}
              activeDate={selectedDay?.fullDate}
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
