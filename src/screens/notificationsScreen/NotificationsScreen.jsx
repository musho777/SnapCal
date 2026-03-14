import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { NotificationHeader, FilterTabs, NotificationCard } from './components';
import NoResult from '../../components/noResult';
import { useFocusEffect } from '@react-navigation/native';
import notificationService from '../../services/notificationService/notificationService';
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from '../../features/notifications/notificationsAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectData,
  selectLoading,
} from '../../features/notifications/notificationsSlice';
import Loading from '../../components/loading/Loading';

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

const NotificationsScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  console.log(data);
  const loading = useSelector(selectLoading);

  const unreadCount = data.unread_count;

  const markRead = id => {
    dispatch(markNotificationRead(id));
  };

  const handleDeleteNotification = id => {
    dispatch(deleteNotification(id));
  };

  const markAllRead = () => {
    if (data?.notifications) {
      data.notifications.forEach(notification => {
        if (!notification.read) {
          dispatch(markNotificationRead(notification.id));
        }
      });
    }
  };

  const clearAll = () => {
    // setItems([]);
  };

  const filterFn = {
    All: null,
    Unread: n => !n.read,
    Meals: n => n.notification_type?.name === 'meal_reminder',
    Tips: n => n.notification_type?.name === 'tip' || n.notification_type?.name === 'ai',
    Goals: n => n.notification_type?.name === 'goal' || n.notification_type?.name === 'water',
  }[activeFilter];

  const notifications = data?.notifications || [];
  const filtered = filterFn ? notifications.filter(filterFn) : notifications;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getNotifications({}));
      notificationService.clearBadge();
    }, []),
  );

  const renderItem = ({ item, index }) => {
    const notificationIndex = index - Math.floor(index / 2);
    return (
      <Animated.View
        entering={FadeInDown.delay(notificationIndex * 40).springify()}
        layout={Layout.springify()}
      >
        <NotificationCard
          notification={item}
          onPress={() => markRead(item.id)}
          onDelete={() => handleDeleteNotification(item.id)}
        />
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={localStyles.page}>
        <Loading />
      </View>
    );
  }

  if (filtered.length === 0) {
    return (
      <View style={localStyles.page}>
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          onClearAll={clearAll}
          showActions={notifications.length > 0}
        />
        <NoResult />
      </View>
    );
  }

  return (
    <View style={localStyles.page}>
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={markAllRead}
        onClearAll={clearAll}
        showActions={notifications.length > 0}
      />
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        unreadCount={unreadCount}
      />
      <FlatList
        data={data?.notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={localStyles.scrollView}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 80,
  },
  dateHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 20,
    paddingLeft: 4,
  },
});

export default NotificationsScreen;
