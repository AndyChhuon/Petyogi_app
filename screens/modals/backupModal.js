import React, { Fragment, useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { streaksLostImage } from "../../constants/constants";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import Purchases from "react-native-purchases";
import { showMessage } from "react-native-flash-message";
import Lottie from "lottie-react-native";
import ScaleInOut from "../../Animations/ScaleInOut";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

const streaksModal = () => {
  // const { streakObj, userValues } = useAuth();

  const { streakObj, userValues } = {
    streakObj: {
      coinsNeededToSaveStreak: 600,
      daysMissed: 2,
      shouldAllowStreakSave: true,
      streakMsg: "saveStreakMsg",
      streakToSave: 21,
    },
    userValues: {
      coins: 400,
    },
  };
  const [streaksLostImageIndex, setStreaksLostImageIndex] = useState(0);
  const [notEnoughCoins, setNotEnoughCoins] = useState(false);
  const [streakMsgState, setStreakMsgState] = useState("noStreakMsg");

  const { coins } = userValues;

  useEffect(() => {
    console.log(streakObj);
    const streakMsg = streakObj?.streakMsg
      ? streakObj.streakMsg
      : "noStreakMsg";
    setStreaksLostImageIndex(
      Math.floor(Math.random() * streaksLostImage.length)
    );
    setStreakMsgState(streakMsg);
  }, [streakObj]);

  const handleSaveStreak = () => {
    if (streakObj?.coinsNeededToSaveStreak <= coins) {
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setNotEnoughCoins(true);
    }
  };
  return (
    streakMsgState != "noStreakMsg" && (
      <ScaleInOut
        visible={streakMsgState != "noStreakMsg"}
        delayIn={1000}
        style={{
          display: "flex",
          backgroundColor: "rgba(37, 53, 66, 0.5)",
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          paddingBottom: "15%",
        }}
      >
        <View
          style={{
            width: "80%",
            paddingVertical: (20 * height) / 880,
            backgroundColor: "#5ea591",
            paddingHorizontal: 5,
            alignItems: "center",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomColor: "#5f94ae",
            borderBottomWidth: 2,
          }}
        >
          <Text style={[Fonts.streakModalTitle, { textAlign: "center" }]}>
            You were gone for{" "}
            <Text style={{ fontSize: 22 }}>{streakObj?.daysMissed}</Text>{" "}
            {streakObj?.daysMissed > 1 ? "days!" : "day!"}
          </Text>
          <View style={{ position: "absolute", top: -15, right: -10 }}>
            <AwesomeButton
              width={32}
              height={32}
              raiseLevel={3}
              paddingHorizontal={0}
              backgroundColor="#eb910a"
              backgroundDarker="#a26208"
              onPressIn={() => {
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
            backgroundColor: "#9be1cd",
            paddingVertical: (35 * height) / 880,
            paddingBottom: (25 * height) / 880,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Image
            source={streaksLostImage[streaksLostImageIndex].image}
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
              borderRadius: 7,
              padding: 10,
              minWidth: "75%",
              alignItems: "center",
              borderColor: "#e9d076",
              borderWidth: 1,
            }}
          >
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
                Your streak cannot be saved.
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
              onPressIn={() => {
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
