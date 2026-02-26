import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import UIInput from '../../../common-ui/uIInput';

export const Header = () => {
  return (
    <View style={localStyles.header}>
      <View style={localStyles.headerTop}>
        <View style={localStyles.titleBlock}>
          <Text style={localStyles.title}>Explore</Text>
          <Text style={localStyles.subtitle}>Discover meals for your day</Text>
        </View>
      </View>
      <View style={localStyles.searchContainer}>
        <UIInput style={localStyles.input} showSearchIcon />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
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
  input: {
    width: '100%',
  },
});
