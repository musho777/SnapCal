import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FOOD_DATA from '../../data/recipes.json';
import { Header, SavedTab, MyRecipesTab, SettingsTab } from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Settings');
  const [user, setUser] = useState({});
  const recipes = FOOD_DATA.recipes || [];
  const [savedList, setSavedList] = useState(
    [recipes[0], recipes[1], recipes[2], recipes[3]].filter(Boolean),
  );
  const [myRecipesList, setMyRecipesList] = useState(
    [recipes[4], recipes[5]].filter(Boolean),
  );

  const [userName, setUserName] = useState('John Doe');
  const userEmail = 'john.doe@example.com';

  const [darkMode, setDarkMode] = useState(false);
  const [notifMeals, setNotifMeals] = useState(true);
  const [notifWater, setNotifWater] = useState(false);
  const [notifTips, setNotifTips] = useState(true);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [language, setLanguage] = useState('English');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  const handleUnsave = id => {
    setSavedList(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteRecipe = id => {
    setMyRecipesList(prev => prev.filter(item => item.id !== id));
  };

  const handleAddRecipe = () => {};

  const handleNavigateToRecipe = recipe => {
    navigation.navigate('Recipe', { recipeData: recipe });
  };

  const getUserData = async () => {
    const response = await AsyncStorage.getItem('user');
    const data = JSON.parse(response);
    setWeight(+data.profile.current_weight_kg);
    setHeight(+data.profile.height_cm);
    setUser(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Saved':
        return (
          <SavedTab
            savedList={savedList}
            onUnsave={handleUnsave}
            onNavigate={handleNavigateToRecipe}
          />
        );
      case 'My Recipes':
        return (
          <MyRecipesTab
            myRecipesList={myRecipesList}
            onDelete={handleDeleteRecipe}
            onAdd={handleAddRecipe}
            onNavigate={handleNavigateToRecipe}
          />
        );
      case 'Settings':
        return (
          <SettingsTab
            userName={userName}
            userEmail={userEmail}
            onNameChange={setUserName}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            notifMeals={notifMeals}
            setNotifMeals={setNotifMeals}
            notifWater={notifWater}
            setNotifWater={setNotifWater}
            notifTips={notifTips}
            setNotifTips={setNotifTips}
            weightUnit={weightUnit}
            setWeightUnit={setWeightUnit}
            heightUnit={heightUnit}
            setHeightUnit={setHeightUnit}
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
        savedCount={savedList.length}
        myRecipesCount={myRecipesList.length}
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
