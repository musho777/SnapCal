import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import UIInput from '../../../common-ui/uIInput';
import { Camera } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ onSearchChange }) => {
  const navigation = useNavigation();

  return (
    <View style={localStyles.header}>
      <View style={localStyles.headerTop}>
        <View style={localStyles.titleBlock}>
          <Text style={localStyles.title}>Explore</Text>
          <Text style={localStyles.subtitle}>Discover meals for your day</Text>
        </View>

        <TouchableOpacity
          style={localStyles.scanButton}
          onPress={() => navigation.navigate('FoodScan')}
        >
          <Camera size={22} color="#10B981" />
        </TouchableOpacity>
      </View>
      <View style={localStyles.searchContainer}>
        <UIInput
          onChangeText={onSearchChange}
          style={localStyles.input}
          showSearchIcon
        />
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
  scanButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
