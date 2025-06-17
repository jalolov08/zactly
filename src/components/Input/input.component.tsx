import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@/constants/colors.constant';
import Icon, { Icons, IconType } from '@/components/Icon/icon.component';

interface InputProps extends TextInputProps {
  iconName: string;
  iconType?: IconType;
  iconColor?: string;
  iconSize?: number;
}

export const Input: React.FC<InputProps> = ({
  iconName,
  iconType = Icons.Feather,
  iconColor = colors.teal,
  iconSize = 20,
  style,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <Icon type={iconType} name={iconName} size={iconSize} color={iconColor} />
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.lightBlueGrey}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.black,
  },
});
