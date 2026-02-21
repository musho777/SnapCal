import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MealPlanIcon } from '../../assets/Icons';

const MealPlanScreen = () => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.content}>
        <MealPlanIcon color="#272727" size={64} />
        <Text style={localStyles.title}>Meal Plan</Text>
        <Text style={localStyles.subtitle}>
          Plan your meals for the week ahead
        </Text>
      </View>
    </View>
  );
};

export default MealPlanScreen;

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
