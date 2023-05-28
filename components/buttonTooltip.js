import AwesomeButton from "react-native-really-awesome-button";
import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../constants/styles";

const { width } = Dimensions.get("window");

function Button(props) {
  const { number, buttonIsPressed, setButtonIsPressed } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!buttonIsPressed) {
      setShowTooltip(false);
    }
  }, [buttonIsPressed]);

  const onPress = () => {
    if (!buttonIsPressed) {
      setButtonIsPressed(true);
      setShowTooltip(true);
    } else {
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
          <View
            style={showTooltip ? styles.tooltipTip : { display: "none" }}
          ></View>
        </View>
      </View>
      <View
        style={showTooltip ? styles.tooltipDisplay : { display: "none" }}
        onPress={onPress}
      >
        <Text
          style={styles.tooltipText}
          onPress={(e) => {
            e.preventDefault();
          }}
        ></Text>
      </View>
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
    marginTop: 3,
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
