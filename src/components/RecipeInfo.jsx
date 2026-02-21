import { StyleSheet, Text, View } from 'react-native';

export const RecipeInfo = ({ description, prepTime, cookTime, servings }) => {
  return (
    <View style={localStyles.container}>
      <Text style={localStyles.sectionTitle}>About this Recipe</Text>
      <Text style={localStyles.description}>{description}</Text>

      <View style={localStyles.infoRow}>
        <View style={localStyles.infoCard}>
          <Text style={localStyles.infoIcon}>⏱️</Text>
          <Text style={localStyles.infoLabel}>Prep Time</Text>
          <Text style={localStyles.infoValue}>{prepTime}</Text>
        </View>

        <View style={localStyles.infoCard}>
          <Text style={localStyles.infoIcon}>🍳</Text>
          <Text style={localStyles.infoLabel}>Cook Time</Text>
          <Text style={localStyles.infoValue}>{cookTime}</Text>
        </View>

        <View style={localStyles.infoCard}>
          <Text style={localStyles.infoIcon}>👥</Text>
          <Text style={localStyles.infoLabel}>Servings</Text>
          <Text style={localStyles.infoValue}>{servings}</Text>
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#525252',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 11,
    color: '#A3A3A3',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },
});
