import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { HealthScoreBar } from '../../recipeScreen/components/HealthScoreBar';
import { calculateHealthScore } from '../../../utils/healthScore';
import { CaloriesCard } from '../../../components/cards/CaloriesCard';

const categoryEmojis = {
  salad: '🥗',
  soup: '🍲',
  grill: '🍗',
  pasta: '🍝',
  bowl: '🥣',
  wrap: '🌯',
  smoothie: '🥤',
  snack: '🍿',
  dessert: '🍰',
  other: '🍽',
};

const macroConfig = [
  { type: 'Carbs', color: '#4CAF50', icon: '🌾' },
  { type: 'Protein', color: '#2196F3', icon: '🥩' },
  { type: 'Fat', color: '#FF9800', icon: '🥑' },
];

const editButtons = [
  { step: 1, icon: '✏️', label: 'Basic Info' },
  { step: 2, icon: '🔥', label: 'Nutrition' },
  { step: 3, icon: '⏱', label: 'Recipe' },
  { step: 4, icon: '🥦', label: 'Ingredients' },
  { step: 5, icon: '👨‍🍳', label: 'Steps' },
];

export const Step6Review = ({ data, onEdit }) => {
  const healthData = useMemo(() => {
    return calculateHealthScore(data.macros);
  }, [data.macros]);

  const categoryEmoji = categoryEmojis[data.category] || '🍽';

  return (
    <View style={localStyles.container}>
      <View style={localStyles.heroPreview}>
        {data.image ? (
          <Image source={{ uri: data.image }} style={localStyles.heroImage} />
        ) : (
          <Text style={localStyles.heroEmoji}>{categoryEmoji}</Text>
        )}
      </View>

      <View style={localStyles.card}>
        <View style={localStyles.headerRow}>
          <Text style={localStyles.mealName}>
            {data.name || 'Untitled Meal'}
          </Text>
          <View style={localStyles.newBadge}>
            <Text style={localStyles.newBadgeText}>New</Text>
          </View>
        </View>

        <View style={localStyles.caloriesRow}>
          <Text style={localStyles.caloriesValue}>
            {data.totalCalories || '0'}
          </Text>
          <Text style={localStyles.caloriesUnit}>Kcal 🔥</Text>
        </View>

        <View style={localStyles.macroCardsRow}>
          {macroConfig.map((macro, index) => {
            const macroData = data.macros[index];
            return (
              <CaloriesCard key={macro.type} themes="dark" data={macroData} />
            );
          })}
        </View>
      </View>

      <HealthScoreBar score={healthData.score} />

      <View style={localStyles.card}>
        <Text style={localStyles.sectionLabel}>Quick Edit</Text>
        <View style={localStyles.editButtonsWrap}>
          {editButtons.map(btn => (
            <TouchableOpacity
              key={btn.step}
              style={localStyles.editButton}
              onPress={() => onEdit(btn.step)}
            >
              <Text style={localStyles.editButtonIcon}>{btn.icon}</Text>
              <Text style={localStyles.editButtonText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    gap: 12,
  },
  heroPreview: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroEmoji: {
    fontSize: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#272727',
    flex: 1,
  },
  newBadge: {
    backgroundColor: '#6B39F4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  caloriesRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  caloriesValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#272727',
    marginRight: 8,
  },
  caloriesUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  macroCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  macroCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  macroIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 6,
  },
  macroIcon: {
    fontSize: 16,
  },
  macroWeight: {
    fontSize: 18,
    fontWeight: '900',
    color: '#272727',
    marginBottom: 2,
  },
  macroWeightUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  macroType: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  editButtonsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    backgroundColor: '#F5F5F5',
  },
  editButtonIcon: {
    fontSize: 14,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#272727',
  },
});
