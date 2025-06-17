import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/Button/button.component';
import { colors } from '@/constants/colors.constant';
import { Icons } from '@/components/Icon/icon.component';

interface SocialButtonsProps {
  onGooglePress: () => void;
  onApplePress: () => void;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({ onGooglePress, onApplePress }) => {
  return (
    <View style={styles.container}>
      <Button
        label="Google"
        onPress={onGooglePress}
        backgroundColor={colors.white}
        color={colors.black}
        iconName="google"
        iconType={Icons.FontAwesome}
        iconColor={colors.black}
        style={styles.button}
      />
      <Button
        label="Apple"
        onPress={onApplePress}
        backgroundColor={colors.black}
        iconName="apple"
        iconType={Icons.FontAwesome}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
