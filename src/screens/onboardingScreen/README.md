# Premium Onboarding Flow

A beautiful, soft & premium onboarding flow with 7 screens: Splash → 5 setup steps → Done.

## Features

- ✨ Smooth slide transitions between steps using react-native-reanimated
- 🎨 Unique pastel color themes for each step
- 📱 Full-screen illustration headers with animated decorative shapes
- 🔄 Progress indicators with animated dots
- 💫 Spring animations for interactive elements
- 📊 Real-time BMI calculation and display
- 🔥 Automatic TDEE (Total Daily Energy Expenditure) calculation
- 🎯 Smart calorie goal suggestions based on user profile

## Architecture

### File Structure

```
onboardingScreen/
├── OnboardingFlow.jsx          # Main container component with state management
├── SplashScreen.jsx             # Initial splash screen
├── DoneScreen.jsx               # Completion screen with summary
├── constants.js                 # All constants, metadata, and utility functions
├── index.js                     # Export file
├── components/                  # Shared UI components
│   ├── BackButton.jsx          # Glass-morphism back button
│   ├── BottomCTA.jsx           # Fixed bottom CTA button with gradient
│   ├── IllustrationHeader.jsx  # Animated header with emoji illustration
│   ├── ProgressDots.jsx        # Animated progress indicators
│   └── StepContainer.jsx       # White rounded card container
└── steps/                       # Individual step screens
    ├── GoalStep.jsx            # Step 1: Goal selection
    ├── StatsStep.jsx           # Step 2: Body stats input
    ├── DietStep.jsx            # Step 3: Diet preferences
    ├── ActivityStep.jsx        # Step 4: Activity level
    └── CaloriesStep.jsx        # Step 5: Calorie goal
```

## Step Color Themes

Each step has a unique pastel color palette:

1. **Goal** (Orange): `#FFF8F0` background, `#FF8C42` accent
2. **Stats** (Blue): `#F0F7FF` background, `#4A90D9` accent
3. **Diet** (Green): `#F0FFF6` background, `#3DBE7A` accent
4. **Activity** (Purple): `#F5F0FF` background, `#8B5CF6` accent
5. **Calories** (Pink): `#FFF0F5` background, `#E91E8C` accent

## Usage

### Basic Implementation

The onboarding flow is already integrated into the navigation system. It will automatically show on first launch.

```jsx
import OnboardingFlow from './screens/onboardingScreen';

<OnboardingFlow
  onComplete={(userData) => {
    // Handle completion
    console.log('User data:', userData);
    // Save to AsyncStorage, navigate to main app, etc.
  }}
/>
```

### Data Structure

When the onboarding is completed, the `onComplete` callback receives the following data:

```javascript
{
  goal: 'lose' | 'maintain' | 'gain' | 'healthy',
  gender: 'male' | 'female',
  age: string,
  weight: string,    // in kg
  height: string,    // in cm
  diet: string,      // diet preference ID
  activity: string,  // activity level ID
  calorieGoal: string,
  customCalories: number | null,
}
```

## Customization

### Adding/Modifying Steps

To add or modify steps, update `constants.js`:

```javascript
export const STEPS_META = [
  {
    id: 'your-step',
    bg: '#F0F0F0',           // Background color
    accent: '#6B39F4',        // Accent color
    accentLight: '#E5DEFF',   // Light accent for highlights
    illustrationBg: ['#E5DEFF', '#D5CEFF'],  // Gradient colors
    shapes: ['#D5CEFF', '#C5BEFF', '#E5DEFF'], // Decorative blob colors
    illustration: '🎯',       // Emoji for illustration
    title: 'Step Title',
    subtitle: 'Step description',
  },
  // ...
];
```

### Styling

All styling follows React Native best practices with StyleSheet.create(). Key design values:

- Card border radius: 32px (top corners only)
- Illustration height: 280px
- Button border radius: 22px
- Input border radius: 16px
- Transition duration: 350ms
- Easing: `Easing.out(Easing.cubic)`

## Dependencies

Required packages (already installed):
- `react-native-reanimated` - For smooth animations
- `react-native-linear-gradient` - For gradient backgrounds
- `@react-native-community/blur` - For glass-morphism effects (iOS)

## Persistence

To persist onboarding completion:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save completion status
await AsyncStorage.setItem('onboarding_completed', 'true');
await AsyncStorage.setItem('user_profile', JSON.stringify(userData));

// Check on app launch
const completed = await AsyncStorage.getItem('onboarding_completed');
```

Update `mainNavigation.js` to check this on mount:

```javascript
const [onboardingCompleted, setOnboardingCompleted] = useState(null);

useEffect(() => {
  AsyncStorage.getItem('onboarding_completed').then((value) => {
    setOnboardingCompleted(value === 'true');
  });
}, []);

if (onboardingCompleted === null) {
  return <LoadingScreen />; // Show loading while checking
}
```

## Calculations

### BMI (Body Mass Index)

```javascript
BMI = weight (kg) / height (m)²
```

Categories:
- Underweight: BMI < 18.5
- Normal: 18.5 ≤ BMI < 25
- Overweight: 25 ≤ BMI < 30
- Obese: BMI ≥ 30

### BMR (Basal Metabolic Rate)

Using the Mifflin-St Jeor Equation:

**Male:**
```
BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
```

**Female:**
```
BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
```

### TDEE (Total Daily Energy Expenditure)

```
TDEE = BMR × Activity Multiplier
```

Activity multipliers:
- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725
- Extra Active: 1.9

### Calorie Goals

- **Lose Weight**: TDEE - 500 cal/day (1 lb/week loss)
- **Maintain Weight**: TDEE
- **Gain Weight**: TDEE + 300 cal/day
- **Eat Healthy**: TDEE

## Testing

To test the onboarding flow:

1. Reset the app state by clearing AsyncStorage
2. Reload the app
3. The onboarding should appear as the initial screen
4. Complete all 5 steps
5. Verify data is passed to `onComplete` callback

## Best Practices

1. **State Management**: Currently uses local state. For production, consider integrating with Redux, Zustand, or Context API.

2. **Data Validation**: All inputs are validated before allowing progression to the next step.

3. **Animations**: All animations use `react-native-reanimated` for 60fps performance.

4. **Accessibility**: Add accessibility labels and hints for screen readers:
   ```jsx
   <TouchableOpacity
     accessible={true}
     accessibilityLabel="Continue to next step"
     accessibilityHint="Double tap to proceed"
   >
   ```

5. **Error Handling**: Add try-catch blocks when saving to AsyncStorage:
   ```javascript
   try {
     await AsyncStorage.setItem('user_profile', JSON.stringify(userData));
   } catch (error) {
     console.error('Failed to save user data:', error);
   }
   ```

## Platform-Specific Notes

### iOS
- Blur effects work natively with `@react-native-community/blur`
- Shadows use `shadowColor`, `shadowOpacity`, `shadowRadius`, `shadowOffset`

### Android
- Blur effects fallback to semi-transparent background
- Shadows use `elevation` property
- Test performance on lower-end devices

## Future Enhancements

- [ ] Add skip option for returning users
- [ ] Implement progress save (resume onboarding)
- [ ] Add social login integration
- [ ] Include profile photo upload
- [ ] Add unit conversion (kg ↔ lbs, cm ↔ inches)
- [ ] Implement A/B testing for different flows
- [ ] Add analytics tracking for step completion rates
- [ ] Support for right-to-left (RTL) languages

## Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Test on both iOS and Android
4. Verify all dependencies are installed
