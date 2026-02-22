import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const FoodCard = ({
  item,
  isSaved = false,
  onToggleSave,
  onPress,
  onRecipePress,
}) => {
  const getHealthBarColor = score => {
    if (score >= 8) return '#22C55E';
    if (score >= 6) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <TouchableOpacity style={localStyled.foodCard} onPress={onPress}>
      <View style={[localStyled.imageArea, { backgroundColor: item.bgColor }]}>
        <View style={localStyled.tagBadge}>
          <Text style={localStyled.tagText}>{item.tag}</Text>
        </View>
        <TouchableOpacity
          style={localStyled.heartButton}
          onPress={() => onToggleSave(item.id)}
        >
          <Text style={localStyled.heartIcon}>{isSaved ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <Text style={localStyled.foodEmoji}>{item.emoji}</Text>
      </View>
      <View style={localStyled.infoArea}>
        <Text style={localStyled.foodName}>{item.name}</Text>
        <Text style={localStyled.calorieText}>🔥 {item.kcal} kcal</Text>
        <View style={localStyled.healthBarContainer}>
          <View
            style={[
              localStyled.healthBar,
              {
                width: `${item.health * 10}%`,
                backgroundColor: getHealthBarColor(item.health),
              },
            ]}
          />
        </View>
        <TouchableOpacity
          style={localStyled.recipeButton}
          onPress={onRecipePress}
        >
          <Text style={localStyled.recipeButtonText}>Tell me Recipe</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const localStyled = StyleSheet.create({
  foodCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  imageArea: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tagBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#272727',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 14,
  },
  foodEmoji: {
    fontSize: 52,
  },
  infoArea: {
    padding: 12,
    paddingBottom: 14,
  },
  foodName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#272727',
    marginBottom: 4,
  },
  calorieText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  healthBarContainer: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    marginBottom: 10,
  },
  healthBar: {
    height: '100%',
    borderRadius: 2,
  },
  recipeButton: {
    backgroundColor: '#272727',
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: 'center',
  },
  recipeButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
});
