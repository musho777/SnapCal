import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProfileIcon } from '../../assets/Icons';

const ProfileScreen = () => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.content}>
        <ProfileIcon color="#272727" size={64} />
        <Text style={localStyles.title}>Profile</Text>
        <Text style={localStyles.subtitle}>
          Manage your account and preferences
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#272727',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
});
