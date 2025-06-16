import React, { useEffect } from 'react';
import { Pressable, StyleProp, ViewStyle, TextStyle, ColorValue } from 'react-native';
import Icon, { Icons } from '@/components/Icon/icon.component';
import { Typography } from '@/components/Typography/typography.component';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  icon: string;
  color: ColorValue;
  label: string | React.ReactNode;
  style: StyleProp<ViewStyle>;
  labelStyle: StyleProp<TextStyle>;
}

export const TabBarButton: React.FC<TabBarButtonProps> = ({
  onPress,
  onLongPress,
  isFocused,
  icon,
  color,
  label,
  style,
  labelStyle,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 400,
    });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
    };
  });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={style}>
      <Animated.View style={animatedIconStyle}>
        <Icon type={Icons.Feather} name={icon} color={color} size={20} />
      </Animated.View>
      {isFocused && (
        <Typography style={labelStyle}>
          {typeof label === 'string'
            ? label.toLocaleLowerCase()
            : String(label).toLocaleLowerCase()}
        </Typography>
      )}
    </Pressable>
  );
};
