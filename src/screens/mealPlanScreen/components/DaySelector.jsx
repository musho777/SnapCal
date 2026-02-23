import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DaySelector = ({ weeklyData, activeDay, onDayChange }) => {
  return (
    <View style={styles.daySelectorContainer}>
      <View style={styles.daySelector}>
        {weeklyData.map(day => {
          const isActive = activeDay === day.id;
          const hasData = day.calories > 0;
          return (
            <TouchableOpacity
              key={day.id}
              style={[styles.dayButton, isActive && styles.dayButtonActive]}
              onPress={() => onDayChange(day.id)}
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
  );
};

const styles = StyleSheet.create({
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
});

export default DaySelector;
