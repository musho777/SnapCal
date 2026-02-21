import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlusIcon } from '../../assets/Icons';

const TrackScreen = () => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.content}>
        <View style={localStyles.iconContainer}>
          <PlusIcon color="#fff" size={48} />
        </View>
        <Text style={localStyles.title}>Track Your Meal</Text>
        <Text style={localStyles.subtitle}>
          Log your meals and track your nutrition
        </Text>
      </View>
    </View>
  );
};

export default TrackScreen;

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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
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
