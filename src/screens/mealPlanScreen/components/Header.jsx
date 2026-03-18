import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Calendar, CalendarDays } from 'lucide-react-native';
import UIViewToggle from '../../../common-ui/UIViewToggle';

const Header = ({ viewMode, onViewModeChange, currentMonth }) => {
  const viewOptions = [
    {
      value: 'week',
      label: 'Week',
      icon: <CalendarDays />,
    },
    {
      value: 'month',
      label: 'Month',
      icon: <Calendar />,
    },
  ];

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Meal Plan</Text>
        <Text style={styles.headerSubtitle}>{currentMonth}</Text>
      </View>
      <UIViewToggle
        options={viewOptions}
        activeValue={viewMode}
        onChange={onViewModeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 50,

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
});

export default Header;
