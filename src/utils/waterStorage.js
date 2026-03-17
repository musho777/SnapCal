import AsyncStorage from '@react-native-async-storage/async-storage';

const WATER_STORAGE_KEY = '@water_intake';
const WATER_DATE_KEY = '@water_date';

/**
 * Get today's date in YYYY-MM-DD format
 */
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Load water intake from AsyncStorage
 * Resets to 0 if it's a new day
 * @returns {Promise<number>} - Water intake for today
 */
export const loadWaterIntake = async () => {
  try {
    const [savedWater, savedDate] = await Promise.all([
      AsyncStorage.getItem(WATER_STORAGE_KEY),
      AsyncStorage.getItem(WATER_DATE_KEY),
    ]);

    const today = getTodayDate();

    // If the date has changed or doesn't exist, reset to 0
    if (savedDate !== today) {
      await saveWaterIntake(0);
      return 0;
    }

    // Return saved water intake for today
    return savedWater ? parseInt(savedWater, 10) : 0;
  } catch (error) {
    console.error('Error loading water data:', error);
    return 0;
  }
};

/**
 * Save water intake to AsyncStorage with today's date
 * @param {number} waterIntake - Current water intake count
 */
export const saveWaterIntake = async waterIntake => {
  try {
    const today = getTodayDate();
    await Promise.all([
      AsyncStorage.setItem(WATER_STORAGE_KEY, waterIntake.toString()),
      AsyncStorage.setItem(WATER_DATE_KEY, today),
    ]);
  } catch (error) {
    console.error('Error saving water data:', error);
  }
};

/**
 * Check if water data needs to be reset (new day)
 * @returns {Promise<boolean>} - True if it's a new day and data was reset
 */
export const checkAndResetWaterData = async () => {
  try {
    const savedDate = await AsyncStorage.getItem(WATER_DATE_KEY);
    const today = getTodayDate();

    if (savedDate !== today) {
      await saveWaterIntake(0);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking water reset:', error);
    return false;
  }
};
