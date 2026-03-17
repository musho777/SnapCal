import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const SuccessScreen = ({ mealName, onCreateAnother, onViewRecipe }) => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.content}>
        <Text style={localStyles.emoji}>🎉</Text>
        <Text style={localStyles.title}>{mealName}</Text>
        <Text style={localStyles.subtitle}>
          Your meal has been created successfully!
        </Text>

        <View style={localStyles.statsRow}>
          <View style={localStyles.statBadge}>
            <Text style={localStyles.statIcon}>✅</Text>
            <Text style={localStyles.statText}>Saved</Text>
          </View>
          <View style={localStyles.statBadge}>
            <Text style={localStyles.statIcon}>🍽</Text>
            <Text style={localStyles.statText}>Ready to View</Text>
          </View>
        </View>

        <View style={localStyles.buttonContainer}>
          <TouchableOpacity
            style={[localStyles.button, localStyles.primaryButton]}
            onPress={onViewRecipe}
          >
            <Text style={localStyles.primaryButtonText}>View Recipe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[localStyles.button, localStyles.secondaryButton]}
            onPress={onCreateAnother}
          >
            <Text style={localStyles.secondaryButtonText}>
              Create Another Meal
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#272727',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    fontSize: 16,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#272727',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#6B39F4',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  secondaryButtonText: {
    color: '#272727',
    fontSize: 15,
    fontWeight: '800',
  },
});
