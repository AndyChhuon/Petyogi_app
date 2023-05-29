import AwesomeButton from "react-native-really-awesome-button";
import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../constants/styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";

const ScaleInOut = ({ visible, delayIn = 0, children, style }) => {
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
            duration: 250,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      : withDelay(
          0,
          withTiming(0, {
            duration: 180,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        );
  }, [visible]);
  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

const { width } = Dimensions.get("window");

function Button(props) {
  const { number, buttonIsPressed, setButtonIsPressed } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Overlay was pressed
    if (!buttonIsPressed) {
      setShowTooltip(false);
    }
  }, [buttonIsPressed]);

  const onPress = () => {
    // No other button pressed and this button is pressed
    if (!buttonIsPressed) {
      setButtonIsPressed(true);
      setShowTooltip(true);
    } else {
      // Other button is pressed and this one too (close other one)
      setButtonIsPressed(false);
      setButtonIsPressed(true);
      setShowTooltip(true);
    }
  };

  return (
    <View style={{ position: "relative", zIndex: 90 - number }}>
      <View style={styles.buttonMarginStyle}>
        <View width={width / 6} style={styles.buttonContainerStyle}>
          <AwesomeButton
            backgroundColor={Colors.goldColor}
            borderRadius={100}
            raiseLevel={(8 * width) / 414}
            width={width / 6}
            height={width / 6}
            onPressOut={onPress}
          >
            <Text
              style={{
                ...Fonts.blackMicroma,
                fontSize: (25 * width) / 414,
              }}
            >
              {number}
            </Text>
          </AwesomeButton>
          <ScaleInOut
            delayIn={150}
            visible={showTooltip}
            style={styles.tooltipTip}
          ></ScaleInOut>
        </View>
      </View>
      <ScaleInOut
        visible={showTooltip}
        style={styles.tooltipDisplay}
        onPress={onPress}
      >
        <Text
          style={styles.tooltipText}
          onPress={(e) => {
            e.preventDefault();
          }}
        ></Text>
      </ScaleInOut>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonMarginStyle: {
    marginLeft: (80 * width) / 414,
    marginRight: (80 * width) / 414,
    position: "relative",
    zIndex: 1,
    top: 0,
  },
  buttonContainerStyle: {
    display: "flex",
    alignItems: "center",
  },
  tooltipTip: {
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "blue",
  },
  tooltipDisplay: {
    width: "100%",
    height: 100,
    position: "absolute",
    zIndex: 2,
    overflow: "hidden",
    backgroundColor: "red",
    top: width / 6 + 10,
  },
  tooltipText: {
    width: "100%",
    height: "100%",
  },
});

export default Button;
