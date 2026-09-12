import { useMemo } from 'react';
import { Appearance, StyleSheet, useColorScheme } from 'react-native';

// Clean daylight. All app colors and type tokens live here.
const light = {
  surface: '#F8F9FB', onSurface: '#16181D',
  surfaceSecondary: '#FFFFFF', onSurfaceSecondary: '#16181D',
  surfaceTertiary: '#F0F2F6', onSurfaceTertiary: '#5B6270',
  surfaceInverse: '#16181D', onSurfaceInverse: '#FFFFFF',
  muted: '#5B6270',
  brand: '#3A66C4', onBrand: '#FFFFFF',
  brandPrimary: '#3A66C4', onBrandPrimary: '#FFFFFF',
  brandSecondary: '#E7ECF9', onBrandSecondary: '#3A66C4',
  brandTertiary: '#E7ECF9', onBrandTertiary: '#3A66C4',
  pressed: '#2F55AA',
  success: '#1F8E5A', onSuccess: '#FFFFFF', successSoft: '#ECF5EF',
  warning: '#C77D28', onWarning: '#FFFFFF', warningSoft: '#FBF2E5',
  error: '#C0492F', onError: '#FFFFFF', errorSoft: '#FAEEE9',
  info: '#3A66C4', onInfo: '#FFFFFF',
  border: '#E7E9EE', borderStrong: '#CFD5E1', divider: '#E7E9EE',
  shadow: 'rgba(22, 24, 29, 0.025)',
  transparent: 'transparent',
};
export const fonts = { regular: 'HankenRegular', medium: 'HankenMedium', semibold: 'HankenSemibold', bold: 'HankenBold', mono: 'IBMPlexMono' };
export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof light;
export const defaultScheme: ColorScheme = 'light';
export const themes: { light: ThemeColors; dark?: ThemeColors } = { light };
export const colors = light;
export function setColorScheme(scheme: ColorScheme | null) { Appearance.setColorScheme?.(scheme ?? 'unspecified'); }
setColorScheme('light');
export function useTheme(): { scheme: ColorScheme; colors: ThemeColors } {
  const system = useColorScheme();
  const scheme: ColorScheme = system === 'dark' && themes.dark ? 'dark' : defaultScheme;
  return { scheme, colors: themes[scheme] ?? themes.light };
}
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(factory: (theme: ThemeColors) => T): () => T {
  return function useStyles() {
    const { colors: palette } = useTheme();
    return useMemo(() => StyleSheet.create(factory(palette)), [palette]);
  };
}