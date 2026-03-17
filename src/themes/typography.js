// typography.ts
import { moderateScale } from '../utils/themesUtils';
const colors = {
  primary: '#1E40AF', // blue
  secondary: '#F59E0B', // orange
  textPrimary: '#111827', // dark gray / main text
  textSecondary: '#6B7280', // lighter text
  textLight: '#9CA3AF', // captions, disabled text
  background: '#FFFFFF',
  backgroundLight: '#F3F4F6',
  success: '#10B981',
  warning: '#FBBF24',
  error: '#EF4444',
  border: '#E5E7EB',
};

const typography = {
  h1: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: colors.textPrimary,
  },
  h2: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  h3: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  h4: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  h5: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  whiteTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  body: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textSecondary,
  },
  bodyMedium: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: colors.textSecondary,
  },
  small: {
    fontSize: moderateScale(13),
    fontWeight: '400',
    color: colors.textLight,
  },
  caption: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.textLight,
  },
  captionPrimary: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  button: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: colors.textPrimary,
  },
};

export default typography;
