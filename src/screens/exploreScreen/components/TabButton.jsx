import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export const TabButton = ({
  emoji,
  label,
  time,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[localStyles.tabButton, isActive && localStyles.tabButtonActive]}
      onPress={onPress}
    >
      <Text style={localStyles.tabEmoji}>{emoji}</Text>
      <Text
        style={[localStyles.tabLabel, isActive && localStyles.tabLabelActive]}
      >
        {label}
      </Text>
      <Text
        style={[localStyles.tabTime, isActive && localStyles.tabTimeActive]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  tabButton: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  tabButtonActive: {
    borderColor: '#272727',
    backgroundColor: '#272727',
  },
  tabEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111',
  },
  tabLabelActive: {
    color: '#fff',
  },
  tabTime: {
    fontSize: 9,
    color: '#9CA3AF',
    marginTop: 2,
  },
  tabTimeActive: {
    color: 'rgba(255,255,255,0.6)',
  },
});
