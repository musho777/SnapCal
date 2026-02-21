import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExploreIcon } from '../../assets/Icons';

const ExploreScreen = () => {
  return (
    <View style={localStyles.container}>
      <View style={localStyles.content}>
        <ExploreIcon color="#272727" size={64} />
        <Text style={localStyles.title}>Explore</Text>
        <Text style={localStyles.subtitle}>
          Discover new recipes and meal ideas
        </Text>
      </View>
    </View>
  );
};

export default ExploreScreen;

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
