import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeeklyChart = ({ weeklyData, activeDay, goalKcal }) => {
  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Weekly Overview</Text>
        <View style={styles.chartDateBadge}>
          <Text style={styles.chartDateText}>Feb 17 - Feb 23</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {/* Goal Line */}
        <View style={[styles.goalLine, { top: (1 - goalKcal / 2500) * 72 }]}>
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
                <Text style={[styles.barDay, isActive && styles.barDayActive]}>
                  {day.day}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default WeeklyChart;
