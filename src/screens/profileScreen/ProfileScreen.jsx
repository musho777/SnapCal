import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, SavedTab, MyRecipesTab, SettingsTab } from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getPreferences } from '../../features/notifications/notificationsAction';
import { useDispatch } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Settings');
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  const handleAddRecipe = () => {
    navigation.navigate('CreateMeal');
  };

  const getUserData = async () => {
    const response = await AsyncStorage.getItem('user');
    const data = JSON.parse(response);
    setWeight(+data.profile.current_weight_kg);
    setHeight(+data.profile.height_cm);
    setUser(data);
  };

  useEffect(() => {
    dispatch(getPreferences());
    getUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActiveTab('Settings');
    }, []),
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Saved':
        return <SavedTab />;
      case 'My Recipes':
        return <MyRecipesTab onAdd={handleAddRecipe} />;
      case 'Settings':
        return (
          <SettingsTab
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            language={language}
            setLanguage={setLanguage}
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={localStyles.container}>
      <Header
        userName={`${user.profile?.first_name} ${user.profile?.last_name}`}
        userEmail={user.email}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {renderTabContent()}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
});

export default ProfileScreen;
