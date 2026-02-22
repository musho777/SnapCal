import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UIInput from '../../../common-ui/uIInput';

export const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={localStyles.header}>
      <View style={localStyles.headerTop}>
        <View style={localStyles.titleBlock}>
          <Text style={localStyles.title}>Explore</Text>
          <Text style={localStyles.subtitle}>Discover meals for your day</Text>
        </View>
      </View>
      <View style={localStyles.searchContainer}>
        <UIInput showSearchIcon />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#272727',
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#272727',
  },
  clearIcon: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 8,
  },
});
