import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import UITab from '../../../common-ui/uITab';

const FILTERS = ['All', 'Unread', 'Meals', 'Tips', 'Goals'];

const FilterTabs = ({ activeFilter, onFilterChange, unreadCount }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter;
          const badge = filter === 'Unread' ? unreadCount : undefined;

          return (
            <UITab
              key={filter}
              label={filter}
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
