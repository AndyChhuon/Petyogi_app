import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";

const ScaleInOut = ({
  visible,
  delayIn = 0,
  delayOut = 0,
  children,
  style,
}) => {
  const scale = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  useEffect(() => {
    scale.value = visible
      ? withDelay(
          delayIn,
          withTiming(1, {
            duration: 150,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      : withDelay(
          delayOut,
          withTiming(0, {
            duration: 100,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        );
  }, [visible]);
  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export default ScaleInOut;
