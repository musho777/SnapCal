/**
 * Calculate health score from nutrition data
 * @param {Array} nutritionData - Array of objects with weight and type
 * @returns {Object} - Health score (0-10) and breakdown
 */
export const calculateHealthScore = nutritionData => {
  // Extract macro weights
  const carbs =
    nutritionData.find(item => item.type === 'Carbs')?.weight || 0;
  const protein =
    nutritionData.find(item => item.type === 'Protein')?.weight || 0;
  const fat = nutritionData.find(item => item.type === 'Fat')?.weight || 0;

  // Calculate calories (Carbs: 4 cal/g, Protein: 4 cal/g, Fat: 9 cal/g)
  const carbCalories = carbs * 4;
  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;
  const totalCalories = carbCalories + proteinCalories + fatCalories;

  if (totalCalories === 0) {
    return { score: 0, breakdown: {}, totalCalories: 0 };
  }

  // Calculate percentages
  const carbPercent = (carbCalories / totalCalories) * 100;
  const proteinPercent = (proteinCalories / totalCalories) * 100;
  const fatPercent = (fatCalories / totalCalories) * 100;

  // Ideal ranges for a balanced meal
  // Carbs: 45-65%, Protein: 10-35%, Fat: 20-35%
  const idealRanges = {
    carbs: { min: 45, max: 65, optimal: 55 },
    protein: { min: 10, max: 35, optimal: 25 },
    fat: { min: 20, max: 35, optimal: 25 },
  };

  // Calculate individual scores (0-10 for each macro)
  const carbScore = calculateMacroScore(
    carbPercent,
    idealRanges.carbs.min,
    idealRanges.carbs.max,
    idealRanges.carbs.optimal,
  );
  const proteinScore = calculateMacroScore(
    proteinPercent,
    idealRanges.protein.min,
    idealRanges.protein.max,
    idealRanges.protein.optimal,
  );
  const fatScore = calculateMacroScore(
    fatPercent,
    idealRanges.fat.min,
    idealRanges.fat.max,
    idealRanges.fat.optimal,
  );

  // Calculate overall health score (weighted average)
  // Higher weight on protein for health benefits
  const overallScore =
    (carbScore * 0.3 + proteinScore * 0.4 + fatScore * 0.3).toFixed(1);

  return {
    score: parseFloat(overallScore),
    breakdown: {
      carbs: { score: carbScore, percent: carbPercent.toFixed(1), weight: carbs },
      protein: { score: proteinScore, percent: proteinPercent.toFixed(1), weight: protein },
      fat: { score: fatScore, percent: fatPercent.toFixed(1), weight: fat },
    },
    totalCalories: Math.round(totalCalories),
  };
};

/**
 * Calculate score for individual macro based on percentage
 * @param {number} percent - Current percentage
 * @param {number} min - Minimum healthy range
 * @param {number} max - Maximum healthy range
 * @param {number} optimal - Optimal value
 * @returns {number} - Score from 0-10
 */
const calculateMacroScore = (percent, min, max, optimal) => {
  // Perfect score if at optimal value
  if (percent === optimal) return 10;

  // Within healthy range
  if (percent >= min && percent <= max) {
    // Calculate how close to optimal (closer = higher score)
    const distanceFromOptimal = Math.abs(percent - optimal);
    const maxDistance = Math.max(optimal - min, max - optimal);
    const score = 10 - (distanceFromOptimal / maxDistance) * 3;
    return Math.max(7, Math.round(score * 10) / 10);
  }

  // Outside healthy range
  if (percent < min) {
    const deficit = min - percent;
    const score = Math.max(0, 7 - (deficit / min) * 7);
    return Math.round(score * 10) / 10;
  }

  if (percent > max) {
    const excess = percent - max;
    const score = Math.max(0, 7 - (excess / max) * 7);
    return Math.round(score * 10) / 10;
  }

  return 5;
};

/**
 * Get health status label based on score
 * @param {number} score - Health score (0-10)
 * @returns {Object} - Status label and color
 */
export const getHealthStatus = score => {
  if (score >= 9) {
    return { label: 'Excellent', color: '#1DCE5C', emoji: '🌟' };
  } else if (score >= 7.5) {
    return { label: 'Very Good', color: '#1cca09', emoji: '✅' };
  } else if (score >= 6) {
    return { label: 'Good', color: '#7AB800', emoji: '👍' };
  } else if (score >= 4.5) {
    return { label: 'Fair', color: '#FFB800', emoji: '⚠️' };
  } else if (score >= 3) {
    return { label: 'Below Average', color: '#FF8C00', emoji: '⚡' };
  } else {
    return { label: 'Needs Improvement', color: '#FF4444', emoji: '⚠️' };
  }
};
