import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const CalendarView = ({ weeklyData, activeDay, onDayChange, allMealData }) => {
  const markedDates = useMemo(() => {
    const marked = {};

    if (allMealData && Array.isArray(allMealData)) {
      allMealData.forEach(dayData => {
        if (dayData.log_date && dayData.calories_consumed > 0) {
          marked[dayData.log_date] = {
            marked: true,
            dotColor: '#F59E0B',
          };
        }
      });
    }

    const selectedDay = weeklyData.find(day => day.date === activeDay);
    if (selectedDay?.fullDate) {
      marked[selectedDay.fullDate] = {
        ...marked[selectedDay.fullDate],
        selected: true,
        selectedColor: '#272727',
        selectedTextColor: '#fff',
      };
    }

    return marked;
  }, [weeklyData, activeDay, allMealData]);

  const handleDayPress = day => {
    const matchingDay = weeklyData.find(d => d.fullDate === day.dateString);
    if (matchingDay) {
      onDayChange(matchingDay.date);
    } else {
      const dateObj = new Date(day.dateString);
      onDayChange(dateObj.getDate());
    }
  };

  const selectedDay = weeklyData.find(day => day.date === activeDay);
  const currentMonth = selectedDay?.fullDate
    ? selectedDay.fullDate.substring(0, 7)
    : new Date().toISOString().substring(0, 7);

  return (
    <Animated.View
      style={styles.calendarContainer}
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
    >
      <Calendar
        current={currentMonth}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#9CA3AF',
          selectedDayBackgroundColor: '#272727',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#272727',
          dayTextColor: '#272727',
          textDisabledColor: '#D1D5DB',
          dotColor: '#F59E0B',
          selectedDotColor: '#ffffff',
          arrowColor: '#272727',
          monthTextColor: '#272727',
          textDayFontWeight: '500',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 14,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 12,
        }}
        enableSwipeMonths={true}
        hideExtraDays={false}
        style={styles.calendar}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  calendar: {
    borderRadius: 12,
  },
});

export default CalendarView;
