import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors.constant';
import Icon, { Icons } from '@/components/Icon/icon.component';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Icon type={Icons.Feather} name="chevron-left" size={24} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.teal,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
});
