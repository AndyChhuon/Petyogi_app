import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import * as Haptics from "expo-haptics";
import ButtonTooltip from "../../components/buttonTooltip";
import useAuth from "../../hooks/useAuth";
import AwesomeButton from "react-native-really-awesome-button";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [dayMode, setDayMode] = useState(false);

  const [showButton, setShowButton] = useState(false);

  const [contentHeight, setContentHeight] = useState(0);

  const [pressedButton, setPressedButton] = useState(null);

  const { userValues } = useAuth();

  const currentMeditation = userValues.numMeditations;

  const scrollViewRef = useRef();
  const buttonsViewRef = useRef();

  const onModeChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDayMode(!dayMode);
  };

  const tooltipOverlayPress = () => {
    removeClickedButton();
  };

  useEffect(() => {
    setButtonTooltips(
      Array.from({ length: currentMeditation }, (_, i) => i + 1).map((i) =>
        currentMeditation === i ? (
          <ButtonTooltip
            dayMode={dayMode}
            number={i}
            key={i}
            currentMeditation={currentMeditation}
            scrollViewRef={scrollViewRef}
            buttonsViewRef={buttonsViewRef}
            onButtonpress={setPressedButton}
            showTooltip={pressedButton === i}
            showTopTooltip={pressedButton === null}
          />
        ) : (
          <ButtonTooltip
            dayMode={dayMode}
            number={i}
            key={i}
            currentMeditation={currentMeditation}
            scrollViewRef={scrollViewRef}
            buttonsViewRef={buttonsViewRef}
            onButtonpress={setPressedButton}
            showTooltip={pressedButton === i}
          />
        )
      )
    );
  }, [pressedButton]);

  const removeClickedButton = () => {
    setButtonTooltips((buttonTooltips) => {
      const newArray = [...buttonTooltips];
      newArray[pressedButton - 1] = (
        <ButtonTooltip
          dayMode={dayMode}
          number={pressedButton}
          key={pressedButton}
          currentMeditation={currentMeditation}
          scrollViewRef={scrollViewRef}
          buttonsViewRef={buttonsViewRef}
          onButtonpress={setPressedButton}
          showTooltip={false}
        />
      );
      return newArray;
    });
    setPressedButton(null);
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const scrollPosition = contentOffset.y;
    const contentHeight = contentSize.height;
    const screenHeight = layoutMeasurement.height;

    if (scrollPosition + screenHeight <= contentHeight - 220 && !showButton) {
      // Perform your desired action here
      setShowButton(true);
    } else if (
      scrollPosition + screenHeight > contentHeight - 220 &&
      showButton
    ) {
      setShowButton(false);
    }
  };

  const handleLayout = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.measure((x, y, width, height) => {
        setContentHeight(height);
      });
    }
  };

  const initTooltip = useMemo(
    () =>
      Array.from({ length: currentMeditation }, (_, i) => i + 1).map((i) =>
        currentMeditation === i ? (
          <ButtonTooltip
            dayMode={dayMode}
            number={i}
            key={i}
            currentMeditation={currentMeditation}
            scrollViewRef={scrollViewRef}
            buttonsViewRef={buttonsViewRef}
            onButtonpress={setPressedButton}
            showTooltip={pressedButton === i}
            showTopTooltip={pressedButton === null}
          />
        ) : (
          <ButtonTooltip
            dayMode={dayMode}
            number={i}
            key={i}
            currentMeditation={currentMeditation}
            scrollViewRef={scrollViewRef}
            buttonsViewRef={buttonsViewRef}
            onButtonpress={setPressedButton}
            showTooltip={pressedButton === i}
          />
        )
      ),
    [dayMode, userValues.numMeditations]
  );

  const [buttonTooltips, setButtonTooltips] = useState(initTooltip);

  useEffect(() => {
    setButtonTooltips(initTooltip);
  }, [initTooltip]);

  useEffect(() => {
    if (scrollViewRef.current) {
      bringToBottom();
    }
  }, [contentHeight]);

  const bringToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <TouchableWithoutFeedback onPressIn={tooltipOverlayPress}>
      <SafeAreaView
        style={
          dayMode
            ? { flex: 1, backgroundColor: "#f9cb70" }
            : { flex: 1, backgroundColor: "#5760b5" }
        }
      >
        <ImageBackground
          source={
            dayMode
              ? require("../../assets/Day_Background.png")
              : require("../../assets/Night_Background.png")
          }
          style={styles.BackgroundImage}
          backgroundColor="none"
        >
          <StatusBar
            translucent={false}
            backgroundColor={dayMode ? "#f9cb70" : "#5760b5"}
          />
          {userInfo()}
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={1}
          >
            <View
              style={{ flex: 1 }}
              onLayout={handleLayout}
              onStartShouldSetResponder={() => {
                // Allow scroll unless button is pressed
                return pressedButton === null;
              }}
            >
              <View
                style={{
                  marginTop: (10 * width) / 414,
                  marginBottom: 180,
                }}
                ref={buttonsViewRef}
              >
                {buttonTooltips}
              </View>
            </View>
          </ScrollView>
          <View
            style={
              showButton
                ? {
                    position: "absolute",
                    bottom: (25 * width) / 414,
                    right: (15 * width) / 414,
                  }
                : { display: "none" }
            }
          >
            <AwesomeButton
              backgroundColor={Colors.bodyBackColor}
              borderColor="#3b464e"
              backgroundDarker="#3b464e"
              borderWidth={2}
              paddingHorizontal={0}
              borderRadius={15}
              raiseLevel={2}
              onPress={bringToBottom}
              width={(60 * width) / 414}
              height={(60 * width) / 414}
            >
              <Image
                source={require("../../assets/images/icons/downArrow.png")}
                style={{
                  width: (30.0 * width) / 414,
                  height: (30.0 * width) / 414,
                  resizeMode: "contain",
                  tintColor: dayMode ? "#7f76d7" : "#fbb855",
                }}
              />
            </AwesomeButton>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );

  function userInfo() {
    return (
      <View style={styles.userInfoWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              marginLeft: ((Sizes.fixPadding + 5.0) * width) / 414,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/icons/streak.png")}
                  style={{
                    width: (20.0 * width) / 414,
                    height: (20.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginLeft: ((Sizes.fixPadding - 5.0) * width) / 414,
                    ...Fonts.whiteColor20Bold,
                    fontSize: (20.0 * width) / 414,
                  }}
                >
                  {userValues.streak}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/icons/gem.png")}
                  style={{
                    width: (20.0 * width) / 414,
                    height: (20.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginLeft: ((Sizes.fixPadding - 2.0) * width) / 414,
                    ...Fonts.whiteColor20Bold,
                    fontSize: (20.0 * width) / 414,
                  }}
                >
                  {userValues.coins}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/icons/meditation.png")}
                  style={{
                    width: (28.0 * width) / 414,
                    height: (28.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginLeft: ((Sizes.fixPadding - 5.0) * width) / 414,
                    ...Fonts.whiteColor20Bold,
                    fontSize: (20.0 * width) / 414,
                  }}
                >
                  {userValues.remainingCredits}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onModeChange()}
                style={styles.notificationIconWrapStyle}
              >
                <Image
                  source={
                    dayMode
                      ? require("../../assets/images/icons/sun.png")
                      : require("../../assets/images/icons/moon.png")
                  }
                  style={{
                    width: (22.0 * width) / 414,
                    height: (22.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  notificationIconWrapStyle: {
    borderRadius: (Sizes.fixPadding * width) / 414,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: (40.0 * width) / 414,
    height: (40.0 * width) / 414,
  },
  userImageStyle: {
    width: (50.0 * width) / 414,
    height: (50.0 * width) / 414,
    borderRadius: (25.0 * width) / 414,
    borderColor: Colors.primaryColor,
    borderWidth: (1.5 * width) / 414,
  },
  userInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: (Sizes.fixPadding * 1.5 * width) / 414,
    paddingTop: 3,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default HomeScreen;
