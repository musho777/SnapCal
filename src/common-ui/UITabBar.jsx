import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const UITabBar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={localStyles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[localStyles.tab, activeTab === tab && localStyles.tabActive]}
          onPress={() => onTabChange(tab)}
        >
          <Text
            style={[
              localStyles.tabText,
              activeTab === tab && localStyles.tabTextActive,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#272727',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#272727',
  },
});
