import { useTheme } from '../theme/ThemeContext';

/**
 * Returns a consistent card style object driven by theme.
 * Pass `featured` to light up dark-mode cards with a subtle primary glow.
 */
export function useCardStyle({ featured = false } = {}) {
  const { mode, colors } = useTheme();
  const isLight = mode === 'light';

  return {
    backgroundColor: isLight ? '#ffffff' : colors.surfaceAlt,
    borderWidth: 1,
    borderColor: isLight
      ? 'rgba(0,0,0,0.08)'
      : featured
      ? 'rgba(255,77,61,0.25)'
      : colors.border,
    shadowColor: isLight ? '#000' : featured ? colors.primary : 'transparent',
    shadowOpacity: isLight ? 0.1 : featured ? 0.35 : 0,
    shadowRadius: isLight ? 8 : featured ? 16 : 0,
    shadowOffset: isLight
      ? { width: 0, height: 3 }
      : featured
      ? { width: 0, height: 6 }
      : { width: 0, height: 0 },
    elevation: isLight ? 3 : featured ? 8 : 0,
  };
}
