// Image mapper to handle dynamic image loading
// React Native requires static paths, so we map image names to require() calls

const recipeImages = {
  'chicken.png': require('../assets/chicken.png'),
  'snack.png': require('../assets/snack.png'),
  'steak.png': require('../assets/steak.png'),
  'apple.png': require('../assets/apple.png'),
  'drink.png': require('../assets/drink.png'),
  'carb.png': require('../assets/carb.png'),
  'protein.png': require('../assets/protein.png'),
  'avatar.png': require('../assets/avatar.png'),
};

// Helper function to get image by name
export const getRecipeImage = (imageName) => {
  if (!imageName) {
    return recipeImages['snack.png'];
  }

  // Extract just the filename from path (e.g., "../../assets/chicken.png" -> "chicken.png")
  const filename = imageName.split('/').pop();

  // Return the mapped image or default to snack.png
  const image = recipeImages[filename];

  if (!image) {
    console.warn(`Image not found: ${filename}, using default`);
    return recipeImages['snack.png'];
  }

  return image;
};
