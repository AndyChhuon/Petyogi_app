import React, { Fragment, useState } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import useAuth from "../../hooks/useAuth";

const { width, height } = Dimensions.get("window");

const StreakScreen = ({ navigation }) => {
  const { userValues, streakObj, setStreakObj } = useAuth();

  const streak = userValues.streak;
  const streakIsSaveable = streak == 0 && streakObj.shouldAllowStreakSave;
  const todayStreakCompleted =
    new Date(userValues.lastMeditationDate) >=
    new Date(new Date().toISOString().slice(0, 10));

  const onCTAClick = () => {
    if (streakIsSaveable) {
      setStreakObj({ ...streakObj, streakMsg: "saveStreakMsg" });
    } else {
      navigation.navigate("Home");
    }
  };

  const getTimeUntilStreakReset = () => {
    const currentUTC = new Date();
    const midnightUTC = new Date(currentUTC);
    midnightUTC.setDate(midnightUTC.getDate() + 1);
    midnightUTC.setUTCHours(0, 0, 0, 0);

    const minutesLeft = (midnightUTC - currentUTC) / 1000 / 60;

    if (minutesLeft < 0) {
      return "0 minutes";
    } else if (minutesLeft > 60) {
      const hoursLeft = Math.ceil(minutesLeft / 60);
      if (hoursLeft == 1) {
        return "1 hour";
      }
      return hoursLeft + " hours";
    } else {
      const roundedMinutesLeft = Math.ceil(minutesLeft);
      if (roundedMinutesLeft == 1) {
        return "1 minute";
      }
      return roundedMinutesLeft + " minutes";
    }
  };

  const timeUntilStreakReset = getTimeUntilStreakReset();

  return (
    <Fragment>
      <StatusBar translucent={false} backgroundColor="#feaa34" />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 2,
          backgroundColor: "#feaa34",
        }}
      >
        <View style={[styles.closeButtonStyle]}>
          <Ionicons
            name="close"
            color={Colors.whiteDarker}
            size={32}
            onPress={() => {
              navigation.pop();
            }}
          />
          <Text
            style={[Fonts.displayScreensText, { flex: 1, textAlign: "center" }]}
          >
            Streak
          </Text>
          <Ionicons
            name="share-outline"
            color={Colors.whiteDarker}
            size={32}
            style={{ opacity: 0 }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#feaa34",
            paddingBottom: (8 * height) / 850,
            borderBottomWidth: 2,
            borderBottomColor: "#121f24",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingBottom: (7 * height) / 850,
            }}
          >
            <View
              style={{
                flex: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={Fonts.streakNumberText}>{streak}</Text>
              <Text style={[Fonts.streakSecondaryText, { fontSize: 27 }]}>
                day streak!
              </Text>
            </View>
            <View
              style={{
                flex: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  todayStreakCompleted
                    ? require("../../assets/images/icons/streak.png")
                    : require("../../assets/images/icons/streak_grey.png")
                }
                style={{
                  width: (150.0 * width) / 414,
                  height: (150.0 * width) / 414,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>

          <View
            style={
              !todayStreakCompleted || streakIsSaveable
                ? {
                    backgroundColor: Colors.bodyBackColor2,
                    flexDirection: "row",
                    marginHorizontal: 10,
                    paddingLeft: 8,
                    paddingRight: 15,
                    paddingVertical: 15,
                    marginTop: 15,
                    marginBottom: 3,
                    borderRadius: 7,
                  }
                : { display: "none" }
            }
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingRight: 2,
              }}
            >
              <Image
                source={require("../../assets/images/icons/clock.png")}
                style={{
                  width: (42.0 * width) / 414,
                  height: (42.0 * width) / 414,
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={{ flex: 6 }}>
              <Text
                style={[Fonts.purchaseScreenDescription, { fontSize: 16.5 }]}
              >
                {streakIsSaveable
                  ? `You are late on your streak. It is not too late to save it! You have less than ${timeUntilStreakReset}.`
                  : streak == 0
                  ? `Complete your first meditation to begin a new streak! You have less than ${timeUntilStreakReset}.`
                  : `Complete your meditation to extend your streak! You have less than ${timeUntilStreakReset}.`}
              </Text>
              <TouchableOpacity onPress={() => onCTAClick()}>
                <Text
                  style={[
                    Fonts.purchaseScreenTitle,
                    { fontSize: 17, color: "#42c2fa", marginTop: 9 },
                  ]}
                >
                  {streakIsSaveable
                    ? "Save streak"
                    : streak == 0
                    ? "Start Streak"
                    : "Extend Streak"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            backgroundColor: Colors.bodyBackColor2,
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <Text style={Fonts.streakPrimaryText}>
            Streak calendar coming soon!
          </Text>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: Colors.bodyBackColor2 }}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  closeButtonStyle: {
    paddingHorizontal: (20.0 * width) / 414,
    paddingTop: (5.0 * width) / 414,
    paddingBottom: (12 * height) / 850,
    zIndex: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#feaa34",
  },
});

export default StreakScreen;
