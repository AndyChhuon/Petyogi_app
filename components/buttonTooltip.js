import AwesomeButton from "react-native-really-awesome-button";
import React, { useState, useEffect, useRef } from "react";
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
import { set } from "firebase/database";

const ScaleInOut = ({
  visible,
  delayIn = 0,
  delayOut = 30,
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
    dayMode,
    currentMeditation,
    scrollViewRef,
    buttonsViewRef,
    onButtonpress,
    showTooltip,
  } = props;

  const buttonRef = useRef();

  const leftMargin =
    (number - 1) % 6 < 4
      ? ((number - 1) % 6) * 18
      : (6 - ((number - 1) % 6)) * 18;

  const buttonBackgroundColor =
    currentMeditation > number
      ? dayMode
        ? "#faac4d"
        : Colors.bodyBackColor
      : dayMode
      ? Colors.bodyBackColor
      : "#ffd27d";

  const tooltipBackgroundColor =
    currentMeditation > number
      ? dayMode
        ? "#f95b2b"
        : Colors.bodyBackColor
      : dayMode
      ? Colors.bodyBackColor
      : "#ffd27d";

  const onPress = () => {
    onButtonpress(number);

    console.log(number);

    buttonsViewRef.current.measure((fx, fy, width, height, px, py) => {
      buttonRef.current.measure(
        (fxButton, fyButton, widthButton, heightButton, pxButton, pyButton) => {
          scrollViewRef.current.scrollTo({
            x: 0,
            y: pyButton - py - (180 * width) / 414,
            animated: true,
          });
        }
      );
    });
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
            backgroundColor={buttonBackgroundColor}
            borderRadius={100}
            raiseLevel={(8 * width) / 414}
            width={width / 6}
            height={width / 6}
            onPress={onPress}
            progressLoadingTime={100}
            style={{ marginBottom: 10 }}
          >
            {currentMeditation > number ? (
              <Image
                source={require("../assets/images/icons/checkmark.png")}
                style={{
                  width: width / 12,
                  height: width / 12,
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
            style={{
              ...styles.tooltipTip,
              borderBottomColor: tooltipBackgroundColor,
            }}
          ></ScaleInOut>
        </View>
      </View>
      <ScaleInOut
        visible={showTooltip}
        style={
          showTooltip
            ? {
                ...styles.tooltipDisplay,
                backgroundColor: tooltipBackgroundColor,
              }
            : { ...styles.tooltipDisplay, display: "none" }
        }
        onPress={onPress}
      >
        <View
          style={styles.tooltipText}
          onPress={(e) => {
            e.preventDefault();
          }}
        >
          <Text ref={buttonRef}>test</Text>
        </View>
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
  },
  tooltipDisplay: {
    marginTop: 8,
    marginLeft: (40 * width) / 414,
    marginRight: (40 * width) / 414,
    width: width - (2 * (40 * width)) / 414,
    height: 150 * (width / 414),
    position: "absolute",
    zIndex: 2,
    top: width / 6 + 12,
    borderRadius: 10,
  },
  tooltipText: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
});

export default React.memo(Button);
