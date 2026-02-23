import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FOOD_DATA from '../../data/recipes.json';
import { Header, SavedTab, MyRecipesTab, SettingsTab } from './components';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Saved');
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

  const handleUnsave = id => {
    setSavedList(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteRecipe = id => {
    setMyRecipesList(prev => prev.filter(item => item.id !== id));
  };

  const handleAddRecipe = () => {
    console.log('Add recipe');
  };

  const handleNavigateToRecipe = recipe => {
    navigation.navigate('Recipe', { recipeData: recipe });
  };

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
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={localStyles.container}>
      <Header
        userName={userName}
        userEmail={userEmail}
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
