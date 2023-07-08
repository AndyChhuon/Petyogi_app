import AwesomeButton from "react-native-really-awesome-button";
import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Text, Image } from "react-native";
import { Colors, Fonts } from "../constants/styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
  ColorSpace,
} from "react-native-reanimated";

const ScaleInOut = ({
  visible,
  delayIn = 0,
  delayOut = 50,
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
            duration: 250,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      : withDelay(
          delayOut,
          withTiming(0, {
            duration: 200,
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
  const {
    number,
    buttonIsPressed,
    setButtonIsPressed,
    dayMode,
    currentMeditation,
  } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const leftMargin =
    number % 6 < 4 ? (number % 6) * 18 : (6 - (number % 6)) * 18;

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
    <View
      style={{
        position: "relative",
        zIndex: 90 - number,
        display: "flex",
        alignItems: "center",
      }}
    >
      <View style={styles.buttonMarginStyle}>
        <View
          width={width / 6}
          style={{
            ...styles.buttonContainerStyle,
            marginLeft: `${leftMargin}%`,
          }}
        >
          <AwesomeButton
            backgroundColor={
              currentMeditation > number
                ? dayMode
                  ? "#ffd27d"
                  : Colors.bodyBackColor
                : dayMode
                ? Colors.bodyBackColor
                : "#ffd27d"
            }
            borderRadius={100}
            raiseLevel={(8 * width) / 414}
            width={width / 6}
            height={width / 6}
            onPressOut={onPress}
            style={{ marginBottom: 10 }}
          >
            {currentMeditation > number ? (
              <Image
                source={require("../assets/images/icons/checkmark.png")}
                style={{
                  width: width / 10,
                  height: width / 10,
                  resizeMode: "contain",
                  tintColor: dayMode ? Colors.bodyBackColor : "#fffefe",
                }}
              />
            ) : (
              <Text
                style={{
                  ...Fonts.blackMicroma,
                  color: dayMode ? "#fffefe" : "#B99B92",
                  fontSize: (25 * width) / 414,
                }}
              >
                {number}
              </Text>
            )}
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
        style={
          showTooltip
            ? styles.tooltipDisplay
            : { ...styles.tooltipDisplay, display: "none" }
        }
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
    width: (45 * width) / 100,
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
    marginTop: 8,
    marginLeft: (40 * width) / 414,
    marginRight: (40 * width) / 414,
    width: width - (2 * (40 * width)) / 414,
    height: 120,
    position: "absolute",
    zIndex: 2,
    backgroundColor: "red",
    top: width / 6 + 12,
    borderRadius: 10,
  },
  tooltipText: {
    width: "100%",
    height: "100%",
  },
});

export default Button;
