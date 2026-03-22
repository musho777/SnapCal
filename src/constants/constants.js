// Meal Types
export const mealTypes = [
  { id: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️' },
  { id: 'dinner', label: 'Dinner', emoji: '🌙' },
  { id: 'snack', label: 'Snacks', emoji: '🍎' },
];

// Macro Configuration
export const macroConfig = [
  { type: 'Carbs', color: '#4CAF50', icon: '🌾' },
  { type: 'Protein', color: '#2196F3', icon: '🥩' },
  { type: 'Fat', color: '#FF9800', icon: '🥑' },
];

// Notification Types
export const NOTIFICATION_TYPES = {
  MEAL_REMINDER: 'meal_reminder',
  WATER: 'water',
  GOAL: 'goal',
  TIP: 'tip',
  AI: 'ai',
};

// Notification Channels
export const NOTIFICATION_CHANNELS = {
  DEFAULT: {
    id: 'snapcal_default_channel',
    name: 'Default Notifications',
    description: 'General notifications',
    importance: 4,
  },
  MEAL_REMINDERS: {
    id: 'meal_reminders',
    name: 'Meal Reminders',
    description: 'Notifications for meal times',
    importance: 4,
    sound: 'default',
    vibration: true,
  },
  WATER_REMINDERS: {
    id: 'water_reminders',
    name: 'Water Reminders',
    description: 'Stay hydrated reminders',
    importance: 3,
    sound: 'default',
    vibration: true,
  },
  TIPS: {
    id: 'tips_notifications',
    name: 'Tips & Insights',
    description: 'Nutrition tips and AI insights',
    importance: 3,
  },
  GOALS: {
    id: 'goals_notifications',
    name: 'Goals & Achievements',
    description: 'Goal progress and achievements',
    importance: 4,
  },
};
