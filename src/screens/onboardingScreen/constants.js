// Onboarding flow constants and metadata

export const STEPS_META = [
  {
    id: 'goal',
    bg: '#FFF8F0',
    accent: '#FF8C42',
    accentLight: '#FFE8D6',
    illustrationBg: ['#FFE8D6', '#FFD4B3'],
    shapes: ['#FFD4B3', '#FFBF8A', '#FFE8D6'],
    illustration: '🎯',
    title: "What's your main goal?",
    subtitle: "We'll build your perfect nutrition plan around it",
  },
  {
    id: 'stats',
    bg: '#F0F7FF',
    accent: '#4A90D9',
    accentLight: '#D6EAFF',
    illustrationBg: ['#D6EAFF', '#B3D4FF'],
    shapes: ['#B3D4FF', '#8FBFFF', '#D6EAFF'],
    illustration: '📏',
    title: 'Tell us about yourself',
    subtitle: 'Your stats help us calculate the perfect calorie target',
  },
  {
    id: 'diet',
    bg: '#F0FFF6',
    accent: '#3DBE7A',
    accentLight: '#C8F0DA',
    illustrationBg: ['#C8F0DA', '#A0E0BC'],
    shapes: ['#A0E0BC', '#78D09E', '#C8F0DA'],
    illustration: '🥗',
    title: 'Any dietary preferences?',
    subtitle: "We'll suggest meals that fit your lifestyle perfectly",
  },
  {
    id: 'activity',
    bg: '#F5F0FF',
    accent: '#8B5CF6',
    accentLight: '#E4D9FF',
    illustrationBg: ['#E4D9FF', '#C9B8FF'],
    shapes: ['#C9B8FF', '#AE97FF', '#E4D9FF'],
    illustration: '🏃',
    title: 'How active are you?',
    subtitle: 'Activity level impacts how many calories you need',
  },
  {
    id: 'calories',
    bg: '#FFF0F5',
    accent: '#E91E8C',
    accentLight: '#FFD6EB',
    illustrationBg: ['#FFD6EB', '#FFB3D4'],
    shapes: ['#FFB3D4', '#FF8FC0', '#FFD6EB'],
    illustration: '🔥',
    title: 'Your daily calorie goal',
    subtitle: 'Calculated just for you based on your profile',
  },
];

export const GOAL_OPTIONS = [
  {
    id: 'lose',
    icon: '📉',
    title: 'Lose Weight',
    subtitle: 'Get lean and fit',
  },
  {
    id: 'maintain',
    icon: '⚖️',
    title: 'Maintain Weight',
    subtitle: 'Stay where you are',
  },
  {
    id: 'gain',
    icon: '📈',
    title: 'Gain Weight',
    subtitle: 'Build muscle mass',
  },
  {
    id: 'healthy',
    icon: '🌱',
    title: 'Eat Healthy',
    subtitle: 'Improve nutrition',
  },
];

export const DIET_OPTIONS = [
  { id: 'none', icon: '🍽️', title: 'No Restrictions' },
  { id: 'vegetarian', icon: '🥕', title: 'Vegetarian' },
  { id: 'vegan', icon: '🌱', title: 'Vegan' },
  { id: 'pescatarian', icon: '🐟', title: 'Pescatarian' },
  { id: 'keto', icon: '🥑', title: 'Keto' },
  { id: 'paleo', icon: '🥩', title: 'Paleo' },
  { id: 'glutenfree', icon: '🌾', title: 'Gluten-Free' },
  { id: 'dairyfree', icon: '🥛', title: 'Dairy-Free' },
];

export const ACTIVITY_OPTIONS = [
  {
    id: 'sedentary',
    icon: '🛋️',
    title: 'Sedentary',
    subtitle: 'Little to no exercise',
    multiplier: 1.2,
  },
  {
    id: 'light',
    icon: '🚶',
    title: 'Lightly Active',
    subtitle: 'Exercise 1-3 days/week',
    multiplier: 1.375,
  },
  {
    id: 'moderate',
    icon: '🏃',
    title: 'Moderately Active',
    subtitle: 'Exercise 3-5 days/week',
    multiplier: 1.55,
  },
  {
    id: 'very',
    icon: '💪',
    title: 'Very Active',
    subtitle: 'Exercise 6-7 days/week',
    multiplier: 1.725,
  },
  {
    id: 'extra',
    icon: '🏋️',
    title: 'Extra Active',
    subtitle: 'Physical job + daily exercise',
    multiplier: 1.9,
  },
];

export const SPLASH_FEATURES = [
  { icon: '📸', text: 'Snap photos to track meals instantly' },
  { icon: '🎯', text: 'Hit your nutrition goals with ease' },
  { icon: '📊', text: 'See your progress with smart insights' },
];

// Helper function to calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
export const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age || !gender) return null;

  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);

  if (isNaN(w) || isNaN(h) || isNaN(a)) return null;

  if (gender === 'male') {
    return 10 * w + 6.25 * h - 5 * a + 5;
  } else {
    return 10 * w + 6.25 * h - 5 * a - 161;
  }
};

// Helper function to calculate TDEE (Total Daily Energy Expenditure)
export const calculateTDEE = (bmr, activityMultiplier) => {
  if (!bmr || !activityMultiplier) return null;
  return Math.round(bmr * activityMultiplier);
};

// Helper function to adjust calories based on goal
export const adjustCaloriesForGoal = (tdee, goal) => {
  if (!tdee) return null;

  switch (goal) {
    case 'lose':
      return Math.round(tdee - 500); // 500 calorie deficit
    case 'gain':
      return Math.round(tdee + 300); // 300 calorie surplus
    case 'maintain':
    case 'healthy':
    default:
      return tdee;
  }
};

// Helper function to calculate BMI
export const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;

  const w = parseFloat(weight);
  const h = parseFloat(height);

  if (isNaN(w) || isNaN(h) || h === 0) return null;

  // BMI = weight (kg) / height (m)^2
  const heightInMeters = h / 100;
  return (w / (heightInMeters * heightInMeters)).toFixed(1);
};

// Helper function to get BMI category
export const getBMICategory = bmi => {
  if (!bmi) return null;

  const bmiValue = parseFloat(bmi);

  if (bmiValue < 18.5) return { category: 'Underweight', color: '#4A90D9' };
  if (bmiValue < 25) return { category: 'Normal', color: '#3DBE7A' };
  if (bmiValue < 30) return { category: 'Overweight', color: '#FF8C42' };
  return { category: 'Obese', color: '#E82C81' };
};

// Helper to calculate macros (simplified)
export const calculateMacros = (calories, goal) => {
  if (!calories) return { protein: 0, carbs: 0, fat: 0 };

  let proteinPercent, carbsPercent, fatPercent;

  switch (goal) {
    case 'lose':
      proteinPercent = 0.35;
      carbsPercent = 0.35;
      fatPercent = 0.3;
      break;
    case 'gain':
      proteinPercent = 0.3;
      carbsPercent = 0.45;
      fatPercent = 0.25;
      break;
    default:
      proteinPercent = 0.3;
      carbsPercent = 0.4;
      fatPercent = 0.3;
  }

  return {
    protein: Math.round((calories * proteinPercent) / 4),
    carbs: Math.round((calories * carbsPercent) / 4),
    fat: Math.round((calories * fatPercent) / 9),
  };
};
