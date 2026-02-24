import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Tab } from '../../../components/ui';

const FILTERS = ['All', 'Unread', 'Meals', 'Tips', 'Goals'];

const FilterTabs = ({ activeFilter, onFilterChange, unreadCount }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          const badge = filter === 'Unread' ? unreadCount : undefined;

          return (
            <Tab
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
    paddingBottom: 16,
    gap: 8,
  },
});

export default FilterTabs;
