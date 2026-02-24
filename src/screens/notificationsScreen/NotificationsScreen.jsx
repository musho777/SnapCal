import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { NotificationHeader, FilterTabs, NotificationCard } from './components';

// Mock notification data
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'meal_reminder',
    title: 'Time for Breakfast!',
    message:
      "Don't skip your morning meal. Start your day with a nutritious breakfast to fuel your body and mind.",
    time: '8:00 AM',
    date: 'Today',
    read: false,
    icon: '🍳',
    iconBg: '#FFF8E7',
    iconColor: '#F59E0B',
  },
  {
    id: 2,
    type: 'water',
    title: 'Stay Hydrated',
    message:
      "Time to drink some water! You've been active for a while. Keep yourself hydrated.",
    time: '7:30 AM',
    date: 'Today',
    read: false,
    icon: '💧',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
  },
  {
    id: 3,
    type: 'goal',
    title: 'Daily Goal Achieved!',
    message:
      "Congratulations! You've reached your calorie goal for today. Keep up the great work!",
    time: '6:45 PM',
    date: 'Yesterday',
    read: true,
    icon: '🎯',
    iconBg: '#F0FFF4',
    iconColor: '#22C55E',
  },
  {
    id: 4,
    type: 'tip',
    title: 'Nutrition Tip',
    message:
      'Did you know? Eating protein-rich foods can help you feel fuller longer and maintain muscle mass.',
    time: '3:00 PM',
    date: 'Yesterday',
    read: true,
    icon: '💡',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
  },
  {
    id: 5,
    type: 'meal_reminder',
    title: 'Lunch Time! ☀️',
    message:
      "It's time for lunch. Make sure to include a balance of protein, carbs, and healthy fats.",
    time: '12:30 PM',
    date: 'Yesterday',
    read: true,
    icon: '☀️',
    iconBg: '#FFF8E7',
    iconColor: '#F59E0B',
  },
  {
    id: 6,
    type: 'water',
    title: 'Hydration Reminder',
    message: "You're doing great! Remember to drink water throughout the day.",
    time: '10:00 AM',
    date: 'Yesterday',
    read: true,
    icon: '💧',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
  },
  {
    id: 7,
    type: 'ai',
    title: 'AI Insight',
    message:
      'Based on your eating patterns, you might want to increase your vegetable intake for better nutrition balance.',
    time: '9:15 AM',
    date: '2 days ago',
    read: true,
    icon: '🤖',
    iconBg: '#F5F5F5',
    iconColor: '#1A1A1A',
  },
  {
    id: 8,
    type: 'goal',
    title: 'Streak Alert!',
    message:
      "Amazing! You've logged your meals for 7 days straight. Keep the momentum going!",
    time: '8:00 PM',
    date: '2 days ago',
    read: true,
    icon: '🔥',
    iconBg: '#FFF0F0',
    iconColor: '#EF4444',
  },
];

const NotificationsScreen = ({ navigation }) => {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('All');

  // Calculate unread count
  const unreadCount = items.filter(n => !n.read).length;

  // State handlers
  const markRead = id => {
    setItems(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotif = id => {
    setItems(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  // Filter logic
  const filterFn = {
    All: null,
    Unread: n => !n.read,
    Meals: n => n.type === 'meal_reminder',
    Tips: n => n.type === 'tip' || n.type === 'ai',
    Goals: n => n.type === 'goal' || n.type === 'water',
  }[activeFilter];

  const filtered = filterFn ? items.filter(filterFn) : items;

  // Group by date
  const grouped = filtered.reduce((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  // Empty state when all cleared
  if (items.length === 0) {
    return (
      <View style={localStyles.page}>
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          onClearAll={clearAll}
          showActions={items.length > 0}
        />
        <ScrollView
          contentContainerStyle={localStyles.emptyContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={localStyles.emptyEmoji}>🔔</Text>
          <Text style={localStyles.emptyTitle}>All clear!</Text>
          <Text style={localStyles.emptyMessage}>
            No notifications yet. We'll let you know when something important
            comes up.
          </Text>
        </ScrollView>
      </View>
    );
  }

  // Empty state when filter has no results
  if (filtered.length === 0) {
    return (
      <View style={localStyles.page}>
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          onClearAll={clearAll}
          showActions={items.length > 0}
        />
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          unreadCount={unreadCount}
        />
        <ScrollView
          contentContainerStyle={localStyles.emptyFilterContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={localStyles.emptyFilterEmoji}>🔍</Text>
          <Text style={localStyles.emptyFilterTitle}>
            No {activeFilter} notifications
          </Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={localStyles.page}>
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={markAllRead}
        onClearAll={clearAll}
        showActions={items.length > 0}
      />
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        unreadCount={unreadCount}
      />
      <ScrollView
        style={localStyles.scrollView}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(grouped).map(([date, notifications]) => (
          <View key={date} style={localStyles.dateGroup}>
            <Text style={localStyles.dateHeader}>{date}</Text>
            {notifications.map((notif, index) => (
              <Animated.View
                key={notif.id}
                entering={FadeInDown.delay(index * 40).springify()}
                layout={Layout.springify()}
              >
                <NotificationCard
                  notification={notif}
                  onPress={() => markRead(notif.id)}
                  onDelete={() => deleteNotif(notif.id)}
                />
              </Animated.View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 100,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    paddingLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  emptyMessage: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyFilterContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyFilterEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyFilterTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});

export default NotificationsScreen;
