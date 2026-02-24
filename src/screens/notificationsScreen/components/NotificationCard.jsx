import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const NotificationCard = ({ notification, onPress, onDelete }) => {
  const swipeableRef = useRef(null);

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        swipeableRef.current?.close();
        setTimeout(() => onDelete(), 200);
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      rightThreshold={40}
    >
      <TouchableOpacity
        style={[
          styles.card,
          notification.read ? styles.cardRead : styles.cardUnread,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Icon */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: notification.iconBg },
            { borderColor: `${notification.iconColor}22`, borderWidth: 1 },
          ]}
        >
          <Text style={styles.iconEmoji}>{notification.icon}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text
              style={[
                styles.title,
                notification.read ? styles.titleRead : styles.titleUnread,
              ]}
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            <Text style={styles.time}>{notification.time}</Text>
          </View>
          <Text
            style={[
              styles.message,
              notification.read ? styles.messageRead : styles.messageUnread,
            ]}
            numberOfLines={2}
          >
            {notification.message}
          </Text>
        </View>

        {/* Unread dot */}
        {!notification.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
    position: 'relative',
  },
  cardRead: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  cardUnread: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  title: {
    fontSize: 13,
    flex: 1,
    color: '#1A1A1A',
  },
  titleRead: {
    fontWeight: '600',
  },
  titleUnread: {
    fontWeight: '800',
  },
  time: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  message: {
    fontSize: 12,
    lineHeight: 18,
  },
  messageRead: {
    color: '#9CA3AF',
  },
  messageUnread: {
    color: '#6B7280',
  },
  unreadDot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1A1A1A',
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginBottom: 10,
  },
  deleteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
});

export default NotificationCard;
