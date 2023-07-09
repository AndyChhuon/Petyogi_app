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

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [dayMode, setDayMode] = useState(true);

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
    if (pressedButton !== null) {
      removeClickedButton();
    }
  };

  const onButtonpress = (number) => {
    // Not same button was pressed
    setButtonTooltips(
      Array.from({ length: currentMeditation + 1 }, (_, i) => i).map((i) => (
        <ButtonTooltip
          dayMode={dayMode}
          number={i}
          key={i}
          currentMeditation={currentMeditation}
          scrollViewRef={scrollViewRef}
          buttonsViewRef={buttonsViewRef}
          onButtonpress={onButtonpress}
          showTooltip={number === i}
        />
      ))
    );

    setPressedButton(number);
  };

  const removeClickedButton = () => {
    setButtonTooltips((buttonTooltips) => {
      const newArray = [...buttonTooltips];
      newArray[pressedButton] = (
        <ButtonTooltip
          dayMode={dayMode}
          number={pressedButton}
          key={pressedButton}
          currentMeditation={currentMeditation}
          scrollViewRef={scrollViewRef}
          buttonsViewRef={buttonsViewRef}
          onButtonpress={onButtonpress}
          showTooltip={false}
        />
      );
      return newArray;
    });
    setPressedButton(null);
  };

  const initTooltip = useMemo(
    () =>
      Array.from({ length: userValues.numMeditations + 1 }, (_, i) => i).map(
        (i) => (
          <ButtonTooltip
            dayMode={dayMode}
            number={i}
            key={i}
            currentMeditation={userValues.numMeditations}
            scrollViewRef={scrollViewRef}
            buttonsViewRef={buttonsViewRef}
            onButtonpress={onButtonpress}
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
          <ScrollView ref={scrollViewRef}>
            <View
              style={{ flex: 1 }}
              onStartShouldSetResponder={() => {
                // Allow scroll unless button is pressed
                return pressedButton === null;
              }}
            >
              <FlatList
                //   style={{ backgroundColor: "#64ABE3" }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <View
                    style={{
                      marginTop: (10 * width) / 414,
                      marginBottom: 180,
                    }}
                    ref={buttonsViewRef}
                  >
                    {buttonTooltips}
                  </View>
                }
              />
            </View>
          </ScrollView>
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
