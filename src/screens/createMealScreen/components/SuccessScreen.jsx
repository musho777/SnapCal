import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

export const SuccessScreen = ({ mealName, onCreateAnother, onClose }) => {
  return (
    <View style={localStyles.container}>
      {/* Decorative Circles */}
      <View style={localStyles.circle1} />
      <View style={localStyles.circle2} />
      <View style={localStyles.circle3} />
      <View style={localStyles.circle4} />

      <View style={localStyles.content}>
        {/* Success Icon */}
        <View style={localStyles.successIconContainer}>
          <View style={localStyles.successIconOuter}>
            <View style={localStyles.successIconInner}>
              <Text style={localStyles.checkmark}>✓</Text>
            </View>
          </View>
        </View>

        {/* Celebration */}
        <View style={localStyles.celebrationRow}>
          <Text style={localStyles.sparkle}>✨</Text>
          <Text style={localStyles.mainTitle}>Success!</Text>
          <Text style={localStyles.sparkle}>✨</Text>
        </View>

        {/* Meal Name Card */}
        <View style={localStyles.mealCard}>
          <Text style={localStyles.mealLabel}>Your new meal</Text>
          <Text style={localStyles.mealName}>{mealName}</Text>
          <Text style={localStyles.mealSubtitle}>has been created successfully</Text>
        </View>

        {/* Stats */}
        <View style={localStyles.statsContainer}>
          <View style={localStyles.statItem}>
            <View style={localStyles.statIconCircle}>
              <Text style={localStyles.statEmoji}>🎉</Text>
            </View>
            <Text style={localStyles.statLabel}>Created</Text>
          </View>
          <View style={localStyles.divider} />
          <View style={localStyles.statItem}>
            <View style={localStyles.statIconCircle}>
              <Text style={localStyles.statEmoji}>💪</Text>
            </View>
            <Text style={localStyles.statLabel}>Nutritious</Text>
          </View>
          <View style={localStyles.divider} />
          <View style={localStyles.statItem}>
            <View style={localStyles.statIconCircle}>
              <Text style={localStyles.statEmoji}>🍴</Text>
            </View>
            <Text style={localStyles.statLabel}>Ready</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={localStyles.buttonContainer}>
          <TouchableOpacity
            style={localStyles.primaryButton}
            onPress={onCreateAnother}
            activeOpacity={0.8}
          >
            <Text style={localStyles.primaryButtonText}>+ Create Another</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localStyles.secondaryButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={localStyles.secondaryButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  // Decorative circles
  circle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#6B39F4',
    opacity: 0.05,
  },
  circle2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#FF6B9D',
    opacity: 0.05,
  },
  circle3: {
    position: 'absolute',
    top: 100,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFC107',
    opacity: 0.08,
  },
  circle4: {
    position: 'absolute',
    bottom: 150,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    opacity: 0.08,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
  // Success Icon
  successIconContainer: {
    marginBottom: 32,
  },
  successIconOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  successIconInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    marginTop: -4,
  },
  // Celebration
  celebrationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  sparkle: {
    fontSize: 24,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#272727',
    letterSpacing: -0.5,
  },
  // Meal Card
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  mealLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: 'center',
  },
  mealName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#272727',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
  },
  mealSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statEmoji: {
    fontSize: 22,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E8E8E8',
  },
  // Buttons
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#272727',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#272727',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  secondaryButtonText: {
    color: '#272727',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
