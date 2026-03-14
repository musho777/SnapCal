import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FoodCard } from '../../../components/cards/FoodCard';

const SavedTab = ({ onUnsave, onNavigate }) => {
  const handleToggleSave = id => {
    onUnsave(parseInt(id, 10));
  };

  const renderRecipeCard = ({ item }) => {
    return (
      <FoodCard
        item={item}
        isSaved={true}
        onToggleSave={handleToggleSave}
        onRecipePress={() => onNavigate(item)}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={localStyles.emptyContainer}>
      <Text style={localStyles.emptyEmoji}>🤍</Text>
      <Text style={localStyles.emptyTitle}>No saved recipes yet</Text>
      <Text style={localStyles.emptySubtitle}>
        Start exploring and save your favorite meals!
      </Text>
    </View>
  );

  return (
    <FlatList
      data={[]}
      renderItem={renderRecipeCard}
      keyExtractor={item => item?.id.toString()}
      numColumns={2}
      columnWrapperStyle={localStyles.columnWrapper}
      contentContainerStyle={localStyles.listContent}
      ListEmptyComponent={renderEmptyState}
      showsVerticalScrollIndicator={false}
    />
  );
};

const localStyles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 12,
  },
  columnWrapper: {
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default SavedTab;
