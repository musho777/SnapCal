import { StyleSheet, Text, View } from 'react-native';

export const Ingredients = ({ ingredients }) => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <Text style={localStyles.icon}>🥗</Text>
        <Text style={localStyles.sectionTitle}>Ingredients</Text>
      </View>

      <View style={localStyles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={localStyles.ingredientItem}>
            <View style={localStyles.bullet} />
            <View style={localStyles.ingredientContent}>
              <Text style={localStyles.ingredientName}>{ingredient.name}</Text>
              <Text style={localStyles.ingredientAmount}>{ingredient.amount}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  icon: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1DCE5C',
  },
  ingredientContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientName: {
    fontSize: 14,
    color: '#171717',
    fontWeight: '500',
    flex: 1,
  },
  ingredientAmount: {
    fontSize: 14,
    color: '#6B39F4',
    fontWeight: '700',
  },
});
