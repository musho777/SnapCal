import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const WeeklyChart = ({ weeklyData, activeDay, goalKcal }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 100; // Account for card padding (16*2) + container padding (20*2)

  // Calculate spacing to fill full width
  const barWidth = 8;
  const numberOfBars = weeklyData.length;
  const totalBarsWidth = barWidth * numberOfBars;
  const availableSpace = chartWidth - totalBarsWidth - 20; // 20 for initial spacing
  const spacing = availableSpace / (numberOfBars - 1);

  // Transform data for BarChart
  const barData = weeklyData.map(day => {
    const isActive = activeDay === day.id;
    const hasData = day.calories > 0;

    return {
      value: hasData ? day.calories : 0,
      label: day.day,
      frontColor: isActive ? '#272727' : hasData ? '#E5E7EB' : '#F3F4F6',
      labelTextStyle: {
        fontSize: 12,
        fontWeight: '600',
        color: isActive ? '#272727' : '#9CA3AF',
      },
    };
  });

  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Weekly Overview</Text>
        <View style={styles.chartDateBadge}>
          <Text style={styles.chartDateText}>Feb 17 - Feb 23</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <BarChart
          data={barData}
          barWidth={barWidth}
          width={chartWidth - 35}
          barBorderRadius={4}
          noOfSections={4}
          maxValue={2500}
          yAxisThickness={1}
          yAxisColor="#F3F4F6"
          xAxisThickness={0}
          hideRules={false}
          rulesColor="#F3F4F6"
          rulesType="solid"
          hideYAxisText={false}
          yAxisTextStyle={{
            fontSize: 9,
            color: '#9CA3AF',
            fontWeight: '600',
          }}
          yAxisLabelWidth={35}
          initialSpacing={10}
          spacing={spacing}
          height={120}
          isAnimated
          animationDuration={300}
        />
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
    width: '100%',
    paddingTop: 20,
  },
  goalLine: {
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  goalLabel: {
    fontSize: 9,
    color: '#EF4444',
    fontWeight: '600',
    backgroundColor: '#fff',
    paddingRight: 4,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#EF4444',
  },
  barCalories: {
    fontSize: 9,
    fontWeight: '700',
    color: '#272727',
  },
  topLabelContainer: {
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WeeklyChart;
