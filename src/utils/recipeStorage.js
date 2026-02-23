import AsyncStorage from '@react-native-async-storage/async-storage';
import recipesData from '../data/recipes.json';

const USER_RECIPES_KEY = '@user_recipes';

/**
 * Save a new user-created recipe to AsyncStorage
 * @param {Object} recipe - The recipe object to save
 * @returns {Promise<Object>} The saved recipe with assigned ID
 */
export const saveRecipe = async recipe => {
  try {
    const existing = await getUserRecipes();
    const maxId = Math.max(
      ...recipesData.recipes.map(r => r.id),
      ...existing.map(r => r.id),
      0,
    );
    const newRecipe = {
      ...recipe,
      id: maxId + 1,
      rating: '0',
    };

    const updated = [...existing, newRecipe];
    await AsyncStorage.setItem(USER_RECIPES_KEY, JSON.stringify(updated));
    return newRecipe;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
};

/**
 * Get all user-created recipes from AsyncStorage
 * @returns {Promise<Array>} Array of user-created recipes
 */
export const getUserRecipes = async () => {
  try {
    const json = await AsyncStorage.getItem(USER_RECIPES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error getting user recipes:', error);
    return [];
  }
};

/**
 * Get all recipes (static + user-created)
 * @returns {Promise<Array>} Array of all recipes
 */
export const getAllRecipes = async () => {
  const userRecipes = await getUserRecipes();
  return [...recipesData.recipes, ...userRecipes];
};

/**
 * Delete a user-created recipe by ID
 * @param {number} recipeId - The ID of the recipe to delete
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteUserRecipe = async recipeId => {
  try {
    const existing = await getUserRecipes();
    const updated = existing.filter(r => r.id !== recipeId);
    await AsyncStorage.setItem(USER_RECIPES_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return false;
  }
};

/**
 * Clear all user-created recipes (for testing/debugging)
 * @returns {Promise<boolean>} True if cleared successfully
 */
export const clearUserRecipes = async () => {
  try {
    await AsyncStorage.removeItem(USER_RECIPES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing user recipes:', error);
    return false;
  }
};
