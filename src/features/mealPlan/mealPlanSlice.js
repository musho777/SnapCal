import { createSlice } from '@reduxjs/toolkit';
import {
  getMainPlanRange,
  deleteMealDish,
  updateDailyLog,
  burnCalory,
} from './mealPlanAction';

const initialState = {
  login: {
    mealPlan: true,
  },
  data: {
    mealPlan: [],
  },
  error: {},
};

const mealPlanSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    // Optimistic update: immediately toggle burned status
    toggleBurnedDishOptimistic: (state, { payload }) => {
      const { date, mealDishId } = payload;

      state.data.mealPlan = state.data.mealPlan.map(dayPlan => {
        if (dayPlan.log_date === date) {
          const burnedDishes = dayPlan.burned_dishes || [];

          // Find the meal_dish using mealDishId
          let dish = null;

          for (const meal of dayPlan.meals || []) {
            const foundDish = meal.meal_dishes?.find(d => d.id === mealDishId);
            if (foundDish) {
              dish = foundDish;
              break;
            }
          }

          if (!dish) return dayPlan;

          // Check if already burned using meal_dish_id
          const existingIndex = burnedDishes.findIndex(
            burned => burned.meal_dish_id === mealDishId,
          );

          let newBurnedDishes;
          let caloriesDiff = 0;

          if (existingIndex >= 0) {
            // Remove from burned (untrack)
            const removed = burnedDishes[existingIndex];
            caloriesDiff = -(removed.calories_burned || 0);
            newBurnedDishes = burnedDishes.filter(
              (_, idx) => idx !== existingIndex,
            );
          } else {
            // Add to burned (track)
            const calories = dish?.calories_at_time || 0;
            caloriesDiff = calories;

            newBurnedDishes = [
              ...burnedDishes,
              {
                id: `temp-${Date.now()}`, // Temporary ID
                meal_dish_id: mealDishId,
                daily_log_id: dayPlan.id,
                calories_burned: calories,
                dish: dish?.dish,
              },
            ];
          }

          return {
            ...dayPlan,
            burned_dishes: newBurnedDishes,
            calories_burned: (dayPlan.calories_burned || 0) + caloriesDiff,
          };
        }
        return dayPlan;
      });
    },
    // Revert optimistic update on error
    revertBurnedDishOptimistic: (state, { payload }) => {
      const { date, mealDishId } = payload;

      // Just toggle again to revert
      state.data.mealPlan = state.data.mealPlan.map(dayPlan => {
        if (dayPlan.log_date === date) {
          const burnedDishes = dayPlan.burned_dishes || [];

          // Find the meal_dish using mealDishId
          let dish = null;

          for (const meal of dayPlan.meals || []) {
            const foundDish = meal.meal_dishes?.find(d => d.id === mealDishId);
            if (foundDish) {
              dish = foundDish;
              break;
            }
          }

          if (!dish) return dayPlan;

          // Check if already burned using meal_dish_id
          const existingIndex = burnedDishes.findIndex(
            burned => burned.meal_dish_id === mealDishId,
          );

          let newBurnedDishes;
          let caloriesDiff = 0;

          if (existingIndex >= 0) {
            const removed = burnedDishes[existingIndex];
            caloriesDiff = -(removed.calories_burned || 0);
            newBurnedDishes = burnedDishes.filter(
              (_, idx) => idx !== existingIndex,
            );
          } else {
            const calories = dish?.calories_at_time || 0;
            caloriesDiff = calories;

            newBurnedDishes = [
              ...burnedDishes,
              {
                id: `temp-${Date.now()}`,
                meal_dish_id: mealDishId,
                daily_log_id: dayPlan.id,
                calories_burned: calories,
                dish: dish?.dish,
              },
            ];
          }

          return {
            ...dayPlan,
            burned_dishes: newBurnedDishes,
            calories_burned: (dayPlan.calories_burned || 0) + caloriesDiff,
          };
        }
        return dayPlan;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMainPlanRange.pending, state => {
        state.login.mealPlan = true;
      })
      .addCase(getMainPlanRange.fulfilled, (state, { payload }) => {
        state.login.mealPlan = false;
        state.data.mealPlan = payload;
      })
      .addCase(getMainPlanRange.rejected, (state, { payload }) => {
        state.login.mealPlan = false;
        state.error = payload;
      })
      .addCase(deleteMealDish.pending, state => {
        state.login.mealPlan = true;
      })
      .addCase(deleteMealDish.fulfilled, (state, { payload }) => {
        state.login.mealPlan = false;
        const { mealDishId } = payload;

        state.data.mealPlan = state.data.mealPlan.map(dayPlan => {
          // Check if the deleted dish was burned
          let caloriesDiff = 0;
          let newBurnedDishes = dayPlan.burned_dishes || [];

          // Check if the deleted dish was burned using meal_dish_id
          const burnedIndex = newBurnedDishes.findIndex(
            burned => burned.meal_dish_id === mealDishId,
          );

          if (burnedIndex >= 0) {
            // Dish was burned, subtract its calories
            const burnedDish = newBurnedDishes[burnedIndex];
            caloriesDiff = -(burnedDish.calories_burned || 0);
            newBurnedDishes = newBurnedDishes.filter(
              (_, idx) => idx !== burnedIndex,
            );
          }

          // Update meals and recalculate total_calories
          const updatedMeals = dayPlan.meals.map(meal => {
            const filteredDishes = meal.meal_dishes.filter(
              dish => dish.id !== mealDishId,
            );

            // Recalculate total_calories for this meal
            const totalCalories = filteredDishes.reduce(
              (sum, dish) => sum + (dish.calories_at_time || 0),
              0,
            );

            return {
              ...meal,
              meal_dishes: filteredDishes,
              total_calories: totalCalories,
            };
          });

          return {
            ...dayPlan,
            meals: updatedMeals,
            burned_dishes: newBurnedDishes,
            calories_burned: (dayPlan.calories_burned || 0) + caloriesDiff,
          };
        });
      })
      .addCase(deleteMealDish.rejected, (state, { payload }) => {
        state.login.mealPlan = false;
        state.error = payload;
      })
      .addCase(updateDailyLog.pending, state => {
        state.login.mealPlan = true;
      })
      .addCase(updateDailyLog.fulfilled, (state, { payload }) => {
        state.login.mealPlan = false;
      })
      .addCase(updateDailyLog.rejected, (state, { payload }) => {
        state.login.mealPlan = false;
        state.error = payload;
      })
      .addCase(burnCalory.pending, state => {
        state.login.mealPlan = false;
      })
      .addCase(burnCalory.fulfilled, (state, { payload }) => {
        state.login.mealPlan = false;
        if (payload.burned_dishes || payload.calories_burned !== undefined) {
          state.data.mealPlan = state.data.mealPlan.map(dayPlan => {
            if (dayPlan.log_date === payload.requestParams?.date) {
              return {
                ...dayPlan,
                burned_dishes: payload.burned_dishes || [],
                calories_burned: payload.calories_burned ?? 0,
              };
            }
            return dayPlan;
          });
        }
      })
      .addCase(burnCalory.rejected, (state, { payload }) => {
        state.login.mealPlan = false;
        state.error = payload;
      });
  },
});
export const { toggleBurnedDishOptimistic, revertBurnedDishOptimistic } =
  mealPlanSlice.actions;

export const selectLoading = state => state?.mealPlan?.login.mealPlan;
export const selectMainPlan = state => state?.mealPlan?.data?.mealPlan;

export default mealPlanSlice.reducer;
