import { colors } from '@/constants/colors.constant';
import React, { forwardRef } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

type TypographyProps = TextProps & {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'bigText'
    | 'mediumText'
    | 'regularText'
    | 'smallText';
  color?: string;
};

export const Typography = forwardRef<Text, TypographyProps>(
  ({ variant = 'regularText', color = 'black', style, children, ...props }, ref) => {
    const getFontStyle = (): object => {
      switch (variant) {
        case 'h1':
          return styles.h1;
        case 'h2':
          return styles.h2;
        case 'h3':
          return styles.h3;
        case 'h4':
          return styles.h4;
        case 'h5':
          return styles.h5;
        case 'bigText':
          return styles.bigText;
        case 'mediumText':
          return styles.mediumText;
        case 'regularText':
          return styles.regularText;
        case 'smallText':
          return styles.smallText;
        default:
          return styles.regularText;
      }
    };

    return (
      <Text {...props} ref={ref} style={[getFontStyle(), { color }, style]}>
        {children}
      </Text>
    );
  }
);

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 32,
    color: colors.black,
  },
  h2: {
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 28,
    color: colors.black,
  },
  h3: {
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 24,
    color: colors.black,
  },
  h4: {
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 20,
    color: colors.black,
  },
  h5: {
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 18,
    color: colors.black,
  },
  bigText: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 16,
    color: colors.black,
  },
  mediumText: {
    fontFamily: 'Gilroy',
    fontWeight: '400',
    fontSize: 16,
    color: colors.black,
  },
  regularText: {
    fontFamily: 'Gilroy',
    fontWeight: '400',
    fontSize: 14,
    color: colors.black,
  },
  smallText: {
    fontFamily: 'Gilroy',
    fontWeight: '400',
    fontSize: 12,
    color: colors.black,
  },
});
