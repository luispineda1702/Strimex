// src/presentation/theme/globalStyles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { FONTS } from './fonts';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  screenPaddingTop: {
    paddingTop: 16,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.text,
  },
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
