import { StyleSheet, Text, View } from 'react-native';

export const CookingSteps = ({ steps }) => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <Text style={localStyles.icon}>👨‍🍳</Text>
        <Text style={localStyles.sectionTitle}>Cooking Instructions</Text>
      </View>

      <View style={localStyles.stepsList}>
        {steps.map((step, index) => (
          <View key={index} style={localStyles.stepItem}>
            <View style={localStyles.stepNumber}>
              <Text style={localStyles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={localStyles.stepContent}>
              <Text style={localStyles.stepText}>{step}</Text>
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
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#272727',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#171717',
  },
});
