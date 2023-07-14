import AwesomeButton from "react-native-really-awesome-button";
import React, { useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors, Fonts } from "../constants/styles";
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
    showTopTooltip,
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
      : "#ffc800";

  const onPress = () => {
    onButtonpress(number);

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
    <>
      {showTopTooltip ? (
        <View
          style={{
            zIndex: 9999,
            position: "relative",
            display: "flex",
            alignItems: "center",
            top: 9,
          }}
        >
          <View style={{ width: (45 * width) / 100 }}>
            <View
              width={width / 15}
              style={{
                ...styles.buttonContainerStyle,
                marginLeft: `${leftMargin}%`,
              }}
            >
              <ScaleInOut
                visible={showTopTooltip}
                style={
                  showTopTooltip
                    ? {
                        ...styles.topTooltipDisplay,
                        backgroundColor: dayMode
                          ? "#fe6435"
                          : Colors.bodyBackColor,
                        marginLeft: (45 * width) / 414,
                        borderColor: dayMode ? "#7f76d7" : "#fbb855",
                      }
                    : { ...styles.topTooltipDisplay, display: "none" }
                }
              >
                <TouchableWithoutFeedback
                  style={styles.touchableStyling}
                  onPress={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.blackTooltipTextVerySmall,
                      color: dayMode ? Colors.goldColor : "#fbb855",
                    }}
                  >
                    START
                  </Text>
                </TouchableWithoutFeedback>
              </ScaleInOut>
            </View>
          </View>
        </View>
      ) : null}
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
            {showTopTooltip ? (
              <ScaleInOut
                delayIn={150}
                visible={showTopTooltip}
                style={{
                  ...styles.topTooltipTip,
                  borderColor: dayMode ? "#7f76d7" : "#7f76d7",
                }}
              ></ScaleInOut>
            ) : null}

            <AwesomeButton
              backgroundColor={buttonBackgroundColor}
              borderRadius={100}
              raiseLevel={(8 * width) / 414}
              width={width / 6}
              height={width / 6}
              onPressIn={onPress}
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
              ? currentMeditation == number
                ? {
                    ...styles.tooltipDisplay,
                    backgroundColor: tooltipBackgroundColor,
                    top: width / 6 + 21,
                  }
                : {
                    ...styles.tooltipDisplay,
                    backgroundColor: tooltipBackgroundColor,
                    top: width / 6 + 12,
                  }
              : { ...styles.tooltipDisplay, display: "none" }
          }
        >
          <TouchableWithoutFeedback
            style={styles.touchableStyling}
            onPress={(e) => {
              e.preventDefault();
            }}
          >
            <View style={styles.tooltipText}>
              <Text
                ref={buttonRef}
                style={{
                  ...Fonts.blackTooltipText,
                  color: dayMode
                    ? currentMeditation > number
                      ? "#ffc800"
                      : "#fffefe"
                    : currentMeditation > number
                    ? "#fffefe"
                    : "#cd7900",
                }}
              >
                Meditation #{number}
              </Text>
              <AwesomeButton
                style={styles.startButtonStyle}
                width="auto"
                backgroundColor={
                  dayMode
                    ? currentMeditation > number
                      ? "#ffffff"
                      : Colors.secondaryGoldColor
                    : currentMeditation > number
                    ? Colors.secondaryGoldColor
                    : "#ffffff"
                }
                raiseLevel={3}
                borderRadius={20}
                backgroundShadow={Colors.grayColor}
              >
                <Text
                  style={{
                    ...Fonts.blackTooltipTextSmall,
                    width: "100%",
                    textAlign: "center",
                    color: dayMode
                      ? currentMeditation > number
                        ? Colors.secondaryGoldColor
                        : Colors.bodyBackColor
                      : currentMeditation > number
                      ? "#fffefe"
                      : "#ffcf1f",
                  }}
                >
                  {currentMeditation > number ? "Revisit" : "Start +100 "}
                  {currentMeditation > number ? null : (
                    <View>
                      <Image
                        source={require("../assets/images/icons/gem.png")}
                        style={{
                          position: "relative",
                          top: 2,
                          width: (20.0 * width) / 414,
                          height: (20.0 * width) / 414,
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  )}
                </Text>
              </AwesomeButton>
            </View>
          </TouchableWithoutFeedback>
        </ScaleInOut>
      </View>
    </>
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
  centerAll: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipTip: {
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  topTooltipTip: {
    position: "relative",
    bottom: -8,
    zIndex: 2,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  tooltipDisplay: {
    marginTop: 8,
    marginLeft: (40 * width) / 414,
    marginRight: (40 * width) / 414,
    width: width - (2 * (40 * width)) / 414,
    position: "absolute",
    zIndex: 2,
    borderRadius: 15,
  },
  topTooltipDisplay: {
    zIndex: 1000,
    width: 90,
    zIndex: 2,
    borderRadius: 10,
    padding: (12 * width) / 414,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  touchableStyling: {
    width: "100%",
    height: "100%",
  },
  tooltipText: {
    width: "100%",
    height: "100%",
    padding: 16,
  },
  startButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 5,
  },
});

export default React.memo(Button);
