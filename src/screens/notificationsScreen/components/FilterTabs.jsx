import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

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
          const showBadge = filter === 'Unread' && unreadCount > 0;

          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.pill,
                isActive ? styles.pillActive : styles.pillInactive,
              ]}
              onPress={() => onFilterChange(filter)}
              activeOpacity={0.7}
            >
              <View style={styles.pillContent}>
                <Text
                  style={[
                    styles.pillText,
                    isActive ? styles.pillTextActive : styles.pillTextInactive,
                  ]}
                >
                  {filter}
                </Text>
                {showBadge && (
                  <View
                    style={[
                      styles.pillBadge,
                      isActive ? styles.pillBadgeActive : styles.pillBadgeInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillBadgeText,
                        isActive
                          ? styles.pillBadgeTextActive
                          : styles.pillBadgeTextInactive,
                      ]}
                    >
                      {unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 8,
  },
  pillActive: {
    borderColor: '#1A1A1A',
    backgroundColor: '#1A1A1A',
  },
  pillInactive: {
    borderColor: '#EEEEEE',
    backgroundColor: '#fff',
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pillTextActive: {
    color: '#fff',
  },
  pillTextInactive: {
    color: '#555',
  },
  pillBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillBadgeActive: {
    backgroundColor: '#fff',
  },
  pillBadgeInactive: {
    backgroundColor: '#1A1A1A',
  },
  pillBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  pillBadgeTextActive: {
    color: '#1A1A1A',
  },
  pillBadgeTextInactive: {
    color: '#fff',
  },
});

export default FilterTabs;
