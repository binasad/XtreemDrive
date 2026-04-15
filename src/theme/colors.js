// Xtreem Drive design tokens for light and dark themes.
// Dark theme is cinematic (red accent), light theme is teal-first.

export const darkColors = {
  mode: 'dark',
  background: '#0A0A0C',
  surface: '#111115',
  surfaceAlt: '#17171C',
  surfaceElevated: '#1E1E24',
  surfaceHigh: '#2A2A32',
  border: '#2E2E36',
  text: '#F5F3F2',
  textMuted: '#B8B5B3',
  textDim: '#7A7876',
  primary: '#FF4D3D',
  primaryDark: '#B51A0E',
  primaryMuted: 'rgba(255,77,61,0.18)',
  success: '#2ECC71',
  warning: '#F5A623',
  error: '#FF4D3D',
  gradientStart: '#B51A0E',
  gradientEnd: '#FF4D3D',
  cardTint: 'rgba(255,255,255,0.06)',
  glass: 'rgba(17,17,21,0.72)',
};

export const lightColors = {
  mode: 'light',
  background: '#ffffff',
  surface: '#ffffff',
  surfaceAlt: '#f3f4f5',
  surfaceElevated: '#e1e3e4',
  surfaceHigh: '#d9dadb',
  border: '#e1e3e4',
  text: '#0B132B',
  textMuted: '#3d4a69',
  textDim: '#667393',
  primary: '#069494',
  primaryDark: '#046f6f',
  primaryMuted: 'rgba(6,148,148,0.18)',
  success: '#27AE60',
  warning: '#FFB703',
  error: '#F25F5C',
  gradientStart: '#FFB703',
  gradientEnd: '#FFB703',
  cardTint: 'rgba(0,0,0,0.03)',
  glass: 'rgba(255,255,255,0.75)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '800' },
  h2: { fontSize: 24, fontWeight: '700' },
  h3: { fontSize: 20, fontWeight: '700' },
  body: { fontSize: 15, fontWeight: '400' },
  small: { fontSize: 13, fontWeight: '400' },
  caption: { fontSize: 11, fontWeight: '600', letterSpacing: 1.2 },
};
