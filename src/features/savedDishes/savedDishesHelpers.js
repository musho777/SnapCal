import { saveDish, unSaveDish } from './savedDishesAction';

/**
 * Reusable helper to add save/unsave handlers to any slice
 * This updates the is_saved field in the dishes array with optimistic updates
 *
 * Usage in your slice:
 * extraReducers: builder => {
 *   addSavedDishHandlers(builder, state => state.data.explore.dishes);
 * }
 */
export const addSavedDishHandlers = (builder, getDishesArray) => {
  builder
    // Optimistic update - immediately when user clicks
    .addCase(saveDish.pending, (state, { meta }) => {
      const dishId = meta.arg?.id;
      const dishes = getDishesArray(state);
      if (dishId && dishes) {
        const dish = dishes.find(d => d.id === dishId);
        if (dish) {
          dish.is_saved = true;
        }
      }
    })
    .addCase(saveDish.rejected, (state, { meta }) => {
      // Revert if API fails
      const dishId = meta.arg?.id;
      const dishes = getDishesArray(state);
      if (dishId && dishes) {
        const dish = dishes.find(d => d.id === dishId);
        if (dish) {
          dish.is_saved = false;
        }
      }
    })
    // Optimistic update - immediately when user clicks
    .addCase(unSaveDish.pending, (state, { meta }) => {
      const dishId = meta.arg?.id;
      const dishes = getDishesArray(state);
      if (dishId && dishes) {
        const dish = dishes.find(d => d.id === dishId);
        if (dish) {
          dish.is_saved = false;
        }
      }
    })
    .addCase(unSaveDish.rejected, (state, { meta }) => {
      // Revert if API fails
      const dishId = meta.arg?.id;
      const dishes = getDishesArray(state);
      if (dishId && dishes) {
        const dish = dishes.find(d => d.id === dishId);
        if (dish) {
          dish.is_saved = true;
        }
      }
    });
};
