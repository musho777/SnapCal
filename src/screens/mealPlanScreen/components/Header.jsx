import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Meal Plan</Text>
        <Text style={styles.headerSubtitle}>February 2026</Text>
      </View>
      <TouchableOpacity style={styles.newPlanButton}>
        <Text style={styles.newPlanButtonText}>+ New Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#272727',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  newPlanButton: {
    backgroundColor: '#272727',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  newPlanButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
});

export default Header;
