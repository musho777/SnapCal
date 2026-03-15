import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import UITab from '../../../common-ui/uITab';

const FILTERS = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Unread',
    value: '',
  },
  {
    label: 'Meals',
    value: 'cfd76970-eacb-4e2d-ae75-90dcf882b9de',
  },
  {
    label: 'Water',
    value: '8b9eb6ce-d839-4f24-a217-5104f361a8cd',
  },
  {
    label: 'Tips',
    value: '6db408da-2ef4-4b5e-9b33-0c949971e43b',
  },
];

const FilterTabs = ({ activeFilter, onFilterChange, unreadCount }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter.label;
          const badge = filter.label === 'Unread' ? unreadCount : undefined;

          return (
            <UITab
              key={filter.label}
              label={filter.label}
              isActive={isActive}
              badge={badge}
              onPress={() => onFilterChange(filter)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
});

export default FilterTabs;
