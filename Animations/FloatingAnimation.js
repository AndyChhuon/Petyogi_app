import React, { useEffect } from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
} from "react-native-reanimated";
import useAuth from "../hooks/useAuth";
import ScaleInOut from "../Animations/ScaleInOut";
import * as Haptics from "expo-haptics";

const FloatingAnimation = ({
  children,
  style,
  height = 10,
  duration = 1500,
}) => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(height, {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export default FloatingAnimation;
