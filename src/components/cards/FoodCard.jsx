import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { UIButton } from '../../common-ui/uIButton';
import { styles } from '../../themes';

export const FoodCard = ({
  item,
  isSaved = false,
  onToggleSave,
  onRecipePress,
  flex = true,
}) => {
  const getHealthBarColor = score => {
    if (score >= 8) return '#22C55E';
    if (score >= 6) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[localStyles.foodCard, flex && styles.flex]}>
      <View style={[localStyles.imageArea, { backgroundColor: item.bgColor }]}>
        <View style={localStyles.tagBadge}>
          <Text style={localStyles.tagText}>{item.tag}</Text>
        </View>
        <TouchableOpacity
          style={localStyles.heartButton}
          onPress={() => onToggleSave(item.id)}
        >
          <Text style={localStyles.heartIcon}>{isSaved ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <Image
          source={item.image}
          style={localStyles.foodImage}
          resizeMode="contain"
        />
      </View>
      <View style={localStyles.infoArea}>
        <View style={localStyles.foodNameWrapper}>
          <Text numberOfLines={2} style={localStyles.foodName}>
            {item.name}
          </Text>
        </View>
        <Text style={localStyles.calorieText}>🔥 {item.kcal} kcal</Text>
        <View style={localStyles.healthBarContainer}>
          <View
            style={[
              localStyles.healthBar,
              {
                width: `${item.health * 10}%`,
                backgroundColor: getHealthBarColor(item.health),
              },
            ]}
          />
        </View>
        <UIButton
          variant="card"
          backgroundColor={'#272727'}
          color={'white'}
          onPress={onRecipePress}
          title={'Tell me Recipe'}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  foodCard: {
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

  foodImage: {
    width: 90,
    height: 90,
  },
  infoArea: {
    padding: 12,
    paddingBottom: 14,
  },
  foodNameWrapper: {
    height: 35,
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
});
