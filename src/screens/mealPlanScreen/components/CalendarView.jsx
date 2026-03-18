import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const CalendarView = ({ activeDay, onDayChange, allMealData }) => {
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

    if (activeDay?.dateString) {
      marked[activeDay.dateString] = {
        ...marked[activeDay.dateString],
        selected: true,
        selectedColor: '#272727',
        selectedTextColor: '#fff',
      };
    }

    return marked;
  }, [activeDay, allMealData]);

  const currentMonth = activeDay?.dateString
    ? activeDay.dateString.substring(0, 7)
    : new Date().toISOString().substring(0, 7);

  return (
    <Animated.View
      style={styles.calendarContainer}
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
    >
      <Calendar
        current={currentMonth}
        onDayPress={day => {
          const date = new Date(day.dateString);
          onDayChange({
            dateString: day.dateString,
            id: date.getDate(),
            day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
              date.getDay()
            ],
          });
        }}
        markedDates={markedDates}
        hideArrows={false}
        disableArrowLeft={false}
        disableArrowRight={false}
        renderArrow={direction => {
          return (
            <View style={styles.arrow}>
              {direction === 'left' ? (
                <Text style={styles.arrowText}>‹</Text>
              ) : (
                <Text style={styles.arrowText}>›</Text>
              )}
            </View>
          );
        }}
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
  arrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#272727',
    fontWeight: 'bold',
  },
});

export default CalendarView;
