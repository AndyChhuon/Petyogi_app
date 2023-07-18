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
import Lottie from "lottie-react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const MeditationScreen = ({ navigation }) => {
  const [dayMode, setDayMode] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [initValue, setInitValue] = useState(0);
  const [playing, setPlaying] = useState(false);

  const lottieRef = useRef(null);

  const onModeChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDayMode(!dayMode);
  };

  useEffect(() => {
    if (playing) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [playing]);

  return (
    <>
      <Lottie
        source={require("../../assets/background_svg/jungle.json")}
        style={{
          position: "relative",
          zIndex: 1,
          resizeMode: "cover",
          width: "100%",
          height: "100%",
          aspectRatio: width / height,
        }}
        autoPlay
        loop
      ></Lottie>

      <SafeAreaView
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 2,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View style={{ flex: 1 }}>
          {sideBar()}
          <View style={{ top: "10%" }}>
            <Lottie
              source={require("../../assets/Meditation/monkey_meditation.json")}
              style={{
                position: "relative",
                top: 0,
              }}
              speed={0.7}
              ref={lottieRef}
              loop
            ></Lottie>
            <View style={styles.playMeditationStyle}>
              <Slider
                style={{
                  flexDirection: "row",
                }}
                minimumValue={0}
                maximumValue={20}
                step={1}
                onValueChange={(val) => {
                  setCurrentPhrase(val);
                }}
                value={initValue}
                thumbTintColor="#FFD369"
                minimumTrackTintColor="#FFD369"
                maximumTrackTintColor={Colors.bodyBackColor}
              />
              <View style={styles.progressLabelContainer}>
                <Text style={Fonts.progressLabelText}>{currentPhrase}/20</Text>
                <Text style={Fonts.progressLabelText}>Namaste</Text>
              </View>
              <View style={styles.musicControllsContainer}>
                <View style={styles.musicControlls}>
                  <TouchableOpacity onPress={() => {}}>
                    <Ionicons
                      name="play-skip-back"
                      size={40 * (width / 414)}
                      color={Colors.bodyBackColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPlaying(!playing)}>
                    <Ionicons
                      name={playing ? "ios-pause-circle" : "ios-play-circle"}
                      size={60 * (width / 414)}
                      color={Colors.whiteColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Ionicons
                      name="play-skip-forward"
                      size={40 * (width / 414)}
                      color={Colors.bodyBackColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
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
  playMeditationStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor:
      Platform.OS === "android"
        ? "rgba(255, 255, 255, 0.52)"
        : "rgba(255, 255, 255, 0.42)",
    borderWidth: 2,
    borderColor:
      Platform.OS === "android"
        ? "rgba(32, 32, 34, 0.42)"
        : "rgba(32, 32, 34, 0.52)",
  },
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
    position: "absolute",
    right: 0,
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
  progressLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  musicControlls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "55%",
    alignItems: "center",
  },
  musicControllsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default MeditationScreen;
