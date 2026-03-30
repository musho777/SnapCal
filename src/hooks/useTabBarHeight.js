import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Tab bar content height calculation:
// - paddingVertical: 8px (top) + 8px (bottom) = 16px
// - Icon container: 32px
// - Label margin top: 4px
// - Label height: ~13px (font size 11 + line height)
// - Border radius visual space: ~10px
// Total: ~75px
const TAB_BAR_CONTENT_HEIGHT = 60;

/**
 * Hook to calculate the bottom padding needed for screens with bottom tab navigation.
 * Takes into account the tab bar height and Android navigation bar (safe area insets).
 *
 * @returns {number} The total bottom padding needed in pixels
 */
export const useTabBarHeight = () => {
  const insets = useSafeAreaInsets();

  const bottomPadding = useMemo(() => {
    // Tab bar uses Math.max(insets.bottom, 24) for its own padding
    const tabBarBottomPadding = Math.max(insets.bottom, 24);

    // Total height = tab bar content + bottom safe area
    return TAB_BAR_CONTENT_HEIGHT + tabBarBottomPadding;
  }, [insets.bottom]);

  return bottomPadding;
};
