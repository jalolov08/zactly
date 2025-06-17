import React from 'react';
import { Typography } from '@/components/Typography/typography.component';
import { colors } from '@/constants/colors.constant';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Icon, { Icons, IconType } from '@/components/Icon/icon.component';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  loading?: boolean;
  iconType?: IconType;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  iconStyle?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  color = colors.white,
  backgroundColor = colors.teal,
  disabled = false,
  style,
  labelStyle,
  loading = false,
  iconType = Icons.Feather,
  iconName,
  iconColor = colors.white,
  iconSize = 20,
  iconStyle,
}) => {
  const buttonBackgroundColor = disabled ? colors.lightBlueGrey : backgroundColor;
  const buttonTextColor = disabled ? colors.lightGrey : color;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: buttonBackgroundColor }, style]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={buttonTextColor} />
      ) : (
        <>
          {iconName && (
            <Icon
              type={iconType}
              name={iconName}
              color={iconColor}
              size={iconSize}
              style={iconStyle}
            />
          )}
          <Typography variant="bigText" style={[{ color: buttonTextColor }, labelStyle]}>
            {label}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    gap: 10,
  },
});
