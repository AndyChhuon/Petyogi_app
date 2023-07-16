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

const MeditationScreen = ({ navigation }) => {
  const [dayMode, setDayMode] = useState(false);

  // const { userValues } = useAuth();

  const [userValues, setUserValues] = useState({
    numMeditations: 11,
    remainingCredits: 5,
    streak: 5,
    coins: 100,
    remainingCredits: 5,
  });

  const onModeChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDayMode(!dayMode);
  };

  return (
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
      <SafeAreaView style={{ height: "100%" }}>
        {sideBar()}

        <View style={{ flex: 1 }}></View>
      </SafeAreaView>
    </ImageBackground>
  );

  function sideBar() {
    return (
      <View
        style={[
          styles.sideBarWrapStyle,
          dayMode
            ? { backgroundColor: "#f9c561" }
            : { backgroundColor: "#5760b5" },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onModeChange()}
          style={[styles.notificationIconWrapStyle, { marginBottom: 10 }]}
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
  sideBarWrapStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginLeft: "auto",
    paddingVertical: (10.0 * width) / 414,
    paddingHorizontal: (12.0 * width) / 414,
    borderRadius: 12,
    marginRight: (10.0 * width) / 414,
  },
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default MeditationScreen;
