import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Tabs = ({
  tabs = [],
  activeTab,
  onTabChange,
  containerStyle,
  scrollContentStyle,
  tabStyle,
  activeTabStyle,
  inactiveTabStyle,
  textStyle,
  activeTextStyle,
  inactiveTextStyle,
  badgeStyle,
  activeBadgeStyle,
  inactiveBadgeStyle,
  badgeTextStyle,
  activeBadgeTextStyle,
  inactiveBadgeTextStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, scrollContentStyle]}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          const showBadge = tab.badge !== undefined && tab.badge !== null && tab.badge > 0;

          return (
            <TouchableOpacity
              key={tab.value}
              style={[
                styles.tab,
                tabStyle,
                isActive ? [styles.tabActive, activeTabStyle] : [styles.tabInactive, inactiveTabStyle],
              ]}
              onPress={() => onTabChange(tab.value)}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <Text
                  style={[
                    styles.tabText,
                    textStyle,
                    isActive
                      ? [styles.tabTextActive, activeTextStyle]
                      : [styles.tabTextInactive, inactiveTextStyle],
                  ]}
                >
                  {tab.label}
                </Text>
                {showBadge && (
                  <View
                    style={[
                      styles.badge,
                      badgeStyle,
                      isActive
                        ? [styles.badgeActive, activeBadgeStyle]
                        : [styles.badgeInactive, inactiveBadgeStyle],
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        badgeTextStyle,
                        isActive
                          ? [styles.badgeTextActive, activeBadgeTextStyle]
                          : [styles.badgeTextInactive, inactiveBadgeTextStyle],
                      ]}
                    >
                      {tab.badge}
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
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 8,
  },
  tabActive: {
    borderColor: '#1A1A1A',
    backgroundColor: '#1A1A1A',
  },
  tabInactive: {
    borderColor: '#EEEEEE',
    backgroundColor: '#fff',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabTextInactive: {
    color: '#555',
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: {
    backgroundColor: '#fff',
  },
  badgeInactive: {
    backgroundColor: '#1A1A1A',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  badgeTextActive: {
    color: '#1A1A1A',
  },
  badgeTextInactive: {
    color: '#fff',
  },
});

export default Tabs;
