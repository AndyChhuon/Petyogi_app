import React, { useEffect, useState } from "react";

import { View, Dimensions, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import { streaksLostImage, streaksSavedImage } from "../../constants/constants";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import ScaleInOut from "../../Animations/ScaleInOut";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

const streaksModal = () => {
  const { streakObj, userValues, saveStreak, user } = useAuth();
  const [streaksLostImageIndex, setStreaksLostImageIndex] = useState(0);
  const [streaksSavedImageIndex, setStreakSavedImageIndex] = useState(0);
  const [notEnoughCoins, setNotEnoughCoins] = useState(false);
  const [streakMsgState, setStreakMsgState] = useState("noStreakMsg");

  const { coins, streak } = userValues;

  const streakDelay = 1000;

  useEffect(() => {
    const streakMsg = streakObj?.streakMsg
      ? streakObj.streakMsg
      : "noStreakMsg";

    if (streakMsg == "saveStreakMsg" || streakMsg == "lostStreakMsg") {
      setStreaksLostImageIndex(
        Math.floor(Math.random() * streaksLostImage.length)
      );
      // Haptics after delay
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }, streakDelay);
    } else if (streakMsg != "noStreakMsg") {
      setStreakSavedImageIndex(
        Math.floor(Math.random() * streaksSavedImage.length)
      );
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, streakDelay);
    }

    setStreakMsgState(streakMsg);
  }, [streakObj]);

  const handleSaveStreak = () => {
    if (streakObj?.coinsNeededToSaveStreak <= coins) {
      setStreakMsgState("noStreakMsg");
      saveStreak(user);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setNotEnoughCoins(true);
    }
  };

  const streakBottomText = {
    lostStreakMsg: "Your streak cannot be saved.",
    savedStreakMsg: "PetYogi is happy you're back!",
    streakRestart: "Keep this habit going!",
    streakIncrement: "Let's keep this habit going!",
  };

  const streakMiddleText = {
    savedStreakMsg: "Saved Streak",
    streakRestart: "New Streak",
    streakIncrement: "New Streak",
  };

  const streakTopText = {
    savedStreakMsg: "You saved your streak!",
    streakRestart: "You started a new streak!",
    streakIncrement: "You extended your streak!",
  };

  const modalColors = {
    savedStreakMsg: {
      topBackground: "#5ea591",
      topBorder: "#5f94ae",
      bottomBackground: "#9be1cd",
    },
  };

  return (
    streakMsgState != "noStreakMsg" && (
      <ScaleInOut
        visible={streakMsgState != "noStreakMsg"}
        delayIn={streakDelay}
        style={{
          display: "flex",
          backgroundColor: "rgba(37, 53, 66, 0.5)",
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          paddingBottom: "15%",
        }}
      >
        <View
          style={{
            width: "80%",
            paddingVertical: (20 * height) / 880,
            backgroundColor: modalColors[streakMsgState]
              ? modalColors[streakMsgState].topBackground
              : "#fbdc6a",
            paddingHorizontal: 5,
            alignItems: "center",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth:
              streakMsgState == "saveStreakMsg" ||
              streakMsgState == "lostStreakMsg"
                ? 2
                : 0,
            borderColor: "#a26208",
            borderBottomColor: modalColors[streakMsgState]
              ? modalColors[streakMsgState].topBorder
              : "#e9d076",
          }}
        >
          {streakMsgState == "saveStreakMsg" ||
          streakMsgState == "lostStreakMsg" ? (
            <Text style={[Fonts.streakModalTitle, { textAlign: "center" }]}>
              You were gone for{" "}
              <Text style={{ fontSize: 22 }}>{streakObj?.daysMissed}</Text>{" "}
              {streakObj?.daysMissed > 1 ? "days!" : "day!"}
            </Text>
          ) : (
            <Text style={[Fonts.streakModalTitle, { textAlign: "center" }]}>
              {streakTopText[streakMsgState]}
            </Text>
          )}
          <View style={{ position: "absolute", top: -15, right: -10 }}>
            <AwesomeButton
              width={32}
              height={32}
              raiseLevel={3}
              paddingHorizontal={0}
              backgroundColor="#eb910a"
              backgroundDarker="#a26208"
              onPressOut={() => {
                setNotEnoughCoins(false);
                setStreakMsgState("noStreakMsg");
              }}
            >
              <Ionicons name="close" color={Colors.whiteDarker} size={25} />
            </AwesomeButton>
          </View>
        </View>

        <View
          style={{
            width: "80%",
            alignItems: "center",
            backgroundColor: modalColors[streakMsgState]
              ? modalColors[streakMsgState].bottomBackground
              : Colors.goldColor,
            paddingVertical: (35 * height) / 880,
            paddingBottom: (25 * height) / 880,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth:
              streakMsgState == "saveStreakMsg" ||
              streakMsgState == "lostStreakMsg"
                ? 2
                : 0,
            borderColor: "#a26208",
            borderTopWidth: 0,
          }}
        >
          <Image
            source={
              streakMsgState == "lostStreakMsg" ||
              streakMsgState == "saveStreakMsg"
                ? streaksLostImage[streaksLostImageIndex].image
                : streaksSavedImage[streaksSavedImageIndex].image
            }
            style={{
              position: "relative",
              width: (200.0 * width) / 414,
              height: (200.0 * width) / 414,
              marginBottom: 30,
              borderRadius: 10,
              borderColor: "#C59FAA",
              borderWidth: 2,
            }}
          ></Image>
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              borderRadius: 10,
              padding: 10,
              minWidth: "75%",
              alignItems: "center",
              borderColor: "#e9d076",
              borderWidth: 1,
            }}
          >
            {streakMsgState == "saveStreakMsg" ||
            streakMsgState == "lostStreakMsg" ? (
              <Text style={Fonts.streakModalText}>
                Lost Streak{" "}
                <Image
                  source={require("../../assets/images/icons/streak.png")}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    //grey out
                  }}
                />
                : {streakObj?.streakToSave}
              </Text>
            ) : (
              <Text style={[Fonts.streakModalText]}>
                {streakMiddleText[streakMsgState]}{" "}
                <Image
                  source={require("../../assets/images/icons/streak.png")}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    //grey out
                  }}
                />
                : {streak}
              </Text>
            )}
          </View>
          <View style={{ paddingTop: 5, justifyContent: "center" }}>
            {streakMsgState == "saveStreakMsg" ? (
              notEnoughCoins ? (
                <Text
                  style={[
                    Fonts.streakSaveStreakText,
                    { textAlign: "center", color: Colors.errorColor },
                  ]}
                >
                  You don't have the {streakObj?.coinsNeededToSaveStreak}{" "}
                  <Image
                    source={require("../../assets/images/icons/gem.png")}
                    style={{
                      width: 14,
                      height: 14,
                      resizeMode: "contain",
                    }}
                  />{" "}
                  required.
                </Text>
              ) : (
                <Text
                  style={[Fonts.streakSaveStreakText, { textAlign: "center" }]}
                >
                  Save your {streakObj?.streakToSave} day streak with{" "}
                  {streakObj?.coinsNeededToSaveStreak}{" "}
                  <Image
                    source={require("../../assets/images/icons/gem.png")}
                    style={{
                      width: 14,
                      height: 14,
                      resizeMode: "contain",
                    }}
                  />
                </Text>
              )
            ) : (
              <Text
                style={[Fonts.streakSaveStreakText, { textAlign: "center" }]}
              >
                {streakBottomText[streakMsgState]}
              </Text>
            )}
          </View>
        </View>
        {streakMsgState == "saveStreakMsg" && !notEnoughCoins && (
          <View style={{ marginTop: 10 }}>
            <AwesomeButton
              paddingHorizontal={2}
              width={(110 * width) / 414}
              height={45}
              backgroundColor="#67bcff"
              backgroundDarker="#2383ff"
              backgroundShadow="#173746"
              raiseLevel={5}
              borderWidth={1}
              borderColor="#005aae"
              borderRadius={8}
              onPressOut={() => {
                handleSaveStreak();
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={Fonts.streakModalButton}>Save</Text>
                <Text style={Fonts.streakModalButton}>Streak</Text>
              </View>
            </AwesomeButton>
          </View>
        )}
      </ScaleInOut>
    )
  );
};

export default streaksModal;
