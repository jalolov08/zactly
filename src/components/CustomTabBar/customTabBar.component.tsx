import React from 'react';
import { TabBarButton } from '@/components/TabBarButton/tabBarButton.component';
import { colors } from '@/constants/colors.constant';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [buttonWidth, setButtonWidth] = useState(0);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: width,
    });

    setButtonWidth(width / state.routes.length);
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const selectIcon = (routeName: string) => {
    switch (routeName) {
      case 'главная':
        return 'home';
      case 'категории':
        return 'search';
      case 'профиль':
        return 'user';
      default:
        return 'home';
    }
  };

  return (
    <View style={styles.tabBar} onLayout={onTabBarLayout}>
      <Animated.View
        style={[
          animatedStyle,
          styles.anView,
          {
            width: buttonWidth - 10,
            height: dimensions.height - 10,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            icon={selectIcon(route.name)}
            color={isFocused ? colors.black : '#064246'}
            label={
              typeof label === 'string'
                ? label.toLocaleLowerCase()
                : String(label).toLocaleLowerCase()
            }
            style={styles.tabBarItem}
            labelStyle={styles.labelStyle}
          />
        );
      })}
    </View>
  );
}

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 15 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.teal,
    marginHorizontal: 90,
    borderRadius: 20,
    paddingVertical: 4,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 4,
    gap: 3,
  },
  labelStyle: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.black,
  },
  anView: {
    position: 'absolute',
    backgroundColor: colors.smokeWhite,
    borderRadius: 16,
    margin: 5,
  },
});
