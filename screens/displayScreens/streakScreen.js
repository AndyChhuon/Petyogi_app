import React, { Fragment, useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import useAuth from "../../hooks/useAuth";
import { streakRewards } from "../../constants/constants";

const StreakScreen = ({ navigation }) => {
  const { userValues, streakObj, setStreakObj } = useAuth();

  const streak = userValues.streak;
  const streakIsSaveable = streak == 0 && streakObj.shouldAllowStreakSave;
  const todayStreakCompleted =
    new Date(userValues.lastMeditationDate) >=
    new Date(new Date().toISOString().slice(0, 10));

  const initDimensions = Dimensions.get("window");
  const [width, setWidth] = useState(initDimensions.width);
  const [height, setHeight] = useState(initDimensions.height);
  const [wasPopped, setWasPopped] = useState(false);
  const styles = createStyles(height, width);

  useEffect(() => {
    function onChangeDimensions({ window }) {
      const { width, height } = window;
      setWidth(width);
      setHeight(height);
    }

    const subscription = Dimensions.addEventListener(
      "change",
      onChangeDimensions
    );

    return () => subscription.remove();
  }, [setWidth, setHeight]); // Include the dependencies for useEffect

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

  const music = streakRewards.map((item) => ({
    id: item.id,
    component: (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: width / 3,
          paddingTop: 8,
          borderRadius: 10,
          borderWidth: 3,
          borderColor: "#39474f",
          marginTop: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
        }}
        key={item.id}
      >
        <Image
          style={{
            width: width / 3.5,
            height: undefined,
            aspectRatio: 4 / 3,
            borderRadius: 10,
          }}
          source={item.image}
        ></Image>
        <Text
          style={[
            Fonts.purchaseScreenSubtitle,
            { marginTop: 5, textAlign: "center" },
          ]}
        >
          {item?.name}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Text
            style={[
              Fonts.purchaseScreenSubtitle,
              {
                marginBottom: 5,
                color: "#fbbf00",
              },
            ]}
          >
            {item?.gems}
          </Text>
          <Image
            source={require("../../assets/images/icons/streak.png")}
            style={{
              position: "relative",
              width: 15,
              height: 15,
              marginBottom: 3,
              resizeMode: "contain",
              marginLeft: 2,
            }}
          />
        </View>
      </TouchableOpacity>
    ),
  }));

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
              if (wasPopped) return;
              setWasPopped(true);
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
                  width:
                    (150.0 * width) / 414 > 200 ? 200 : (150.0 * width) / 414,
                  height:
                    (150.0 * width) / 414 > 200 ? 200 : (150.0 * width) / 414,
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
                  width: (42.0 * width) / 414 > 80 ? 80 : (42.0 * width) / 414,
                  height: (42.0 * width) / 414 > 80 ? 80 : (42.0 * width) / 414,
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
        <View style={{ backgroundColor: Colors.bodyBackColor2, flexGrow: 1 }}>
          <View
            style={{
              alignItems: "center",
              paddingTop: 30,
            }}
          >
            <Text style={[Fonts.purchaseScreenTitle, { marginLeft: 8 }]}>
              Rewards coming soon!
            </Text>
            <ScrollView horizontal={true} style={{ marginLeft: 10 }}>
              {music.map((item) => item.component)}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: Colors.bodyBackColor2 }}
      />
    </Fragment>
  );
};

function createStyles(height, width) {
  return StyleSheet.create({
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
}

export default StreakScreen;
