import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationHeader = ({
  unreadCount,
  onMarkAllRead,
  onClearAll,
  showActions,
}) => {
  return (
    <View style={localStyles.header}>
      <View style={localStyles.topRow}>
        <View style={localStyles.leftSide}>
          <View style={localStyles.titleRow}>
            <Text style={localStyles.title}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={localStyles.badge}>
                <Text style={localStyles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <View style={localStyles.row}>
            <Text style={localStyles.subtitle}>
              {unreadCount > 0
                ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
                : 'All caught up!'}
            </Text>
            {showActions && (
              <View style={localStyles.rightSide}>
                {unreadCount > 0 && (
                  <TouchableOpacity
                    style={localStyles.markAllButton}
                    onPress={onMarkAllRead}
                    activeOpacity={0.7}
                  >
                    <Text style={localStyles.markAllText}>Mark all read</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={localStyles.clearAllButton}
                  onPress={onClearAll}
                  activeOpacity={0.7}
                >
                  <Text style={localStyles.clearAllText}>Clear all</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
  },
  leftSide: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  rightSide: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  markAllButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  markAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  clearAllButton: {
    backgroundColor: '#FFF0F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  clearAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default NotificationHeader;
