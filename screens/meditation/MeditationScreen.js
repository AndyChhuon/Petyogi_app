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
import ScaleInOut from "../../Animations/ScaleInOut";

const { width, height } = Dimensions.get("window");

const MeditationScreen = ({ navigation }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [initValue, setInitValue] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [lottieBackground, setLottieBackground] = useState({
    id: "7",
    image: require("../../assets/background_svg/starry_night_preview.png"),
    lottie: require("../../assets/background_svg/starry_night.json"),
  });

  const [showMenu, setShowMenu] = useState(false);

  const maxNumPhrases = 20;

  const lottieRef = useRef(null);

  const onNextButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentPhrase < maxNumPhrases) {
      setCurrentPhrase(currentPhrase + 1);
      setInitValue(currentPhrase + 1);
    }
  };

  const onBackButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentPhrase > 0) {
      setCurrentPhrase(currentPhrase - 1);
      setInitValue(currentPhrase - 1);
    }
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
        source={lottieBackground?.lottie}
        style={{
          position: "relative",
          zIndex: 1,
          resizeMode: "cover",
          width: "100%",
          height: "100%",
          aspectRatio: width / height,
        }}
        speed={0.5}
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
        <View
          style={{
            flex: 1,
          }}
        >
          {closeButton()}
          {sidebarMenu()}
          <View
            style={{
              flex: 1,
              marginTop: "10%",
              display: "flex",
              zIndex: 1,
            }}
          >
            <View
              style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Lottie
                source={require("../../assets/Meditation/turtle_meditation.json")}
                style={{
                  position: "relative",
                  top: 0,
                }}
                speed={0.5}
                ref={lottieRef}
                loop
              ></Lottie>
            </View>
            <View style={{ marginBottom: "15%" }}>
              <View style={styles.playMeditationStyle}>
                <Slider
                  style={{
                    flexDirection: "row",
                  }}
                  minimumValue={0}
                  maximumValue={maxNumPhrases}
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
                  <Text style={Fonts.progressLabelText}>
                    {currentPhrase}/{maxNumPhrases}
                  </Text>
                  <Text style={Fonts.progressLabelText}># of phrases</Text>
                </View>
                <View style={styles.musicControllsContainer}>
                  <View style={styles.musicControlls}>
                    <TouchableOpacity onPress={() => onBackButtonPress()}>
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
                        color={
                          lottieBackground.id == "3"
                            ? Colors.bodyBackColor
                            : Colors.whiteColor
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNextButtonPress()}>
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
        </View>
      </SafeAreaView>
    </>
  );

  function closeButton() {
    return (
      <View
        style={[styles.closeButtonStyle, showMenu ? { display: "none" } : {}]}
      >
        <Ionicons
          name="close"
          color={Colors.whiteColor}
          size={32}
          onPress={() => navigation.pop()}
        />
      </View>
    );
  }

  function sidebarMenu() {
    return (
      <View
        style={[
          styles.sidebarMenuWrap,
          showMenu ? { height: "100%", width: "100%" } : {},
        ]}
      >
        {sideMenu()}
        {sideBar()}
      </View>
    );
  }

  function sideBar() {
    return (
      <View
        style={{
          ...styles.sideBarWrapStyle,
        }}
      >
        <View
          style={{
            paddingTop: (10.0 * width) / 414,
            paddingHorizontal: (12.0 * width) / 414,
            paddingBottom: (5.0 * width) / 414,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor:
              showMenu == "background"
                ? "rgba(101, 101, 101, 0.92)"
                : "rgba(37, 53, 66,0.9)",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              showMenu == "background"
                ? setShowMenu(false)
                : setShowMenu("background");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={styles.notificationIconWrapStyle}
          >
            <Image
              source={lottieBackground?.image}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: (5.0 * width) / 414,
            paddingHorizontal: (12.0 * width) / 414,
            backgroundColor: "rgba(37, 53, 66,0.9)",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {}}
            style={[styles.notificationIconWrapStyle]}
          >
            <Image
              source={require("../../assets/images/icons/meditation.png")}
              style={{
                width: (20.0 * width) / 414,
                height: (20.0 * width) / 414,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingTop: (5.0 * width) / 414,
            paddingHorizontal: (12.0 * width) / 414,
            paddingBottom: (10.0 * width) / 414,
            backgroundColor: "rgba(37, 53, 66,0.9)",
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {}}
            style={styles.notificationIconWrapStyle}
          >
            <Ionicons
              name="musical-notes"
              size={30 * (width / 414)}
              color="#f16b42"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function sideMenu() {
    const data = {
      background: [
        {
          id: "2",
          image: require("../../assets/background_svg/fireplace_preview.png"),
          lottie: require("../../assets/background_svg/fireplace.json"),
        },
        {
          id: "3",
          image: require("../../assets/background_svg/frosty_snowman_preview.png"),
          lottie: require("../../assets/background_svg/frosty_snowman.json"),
        },
        {
          id: "4",
          image: require("../../assets/background_svg/jungle_preview.png"),
          lottie: require("../../assets/background_svg/jungle.json"),
        },
        {
          id: "5",
          image: require("../../assets/background_svg/mountain_preview.png"),
          lottie: require("../../assets/background_svg/mountain.json"),
        },
        {
          id: "6",
          image: require("../../assets/background_svg/rosy_blur_preview.png"),
          lottie: require("../../assets/background_svg/rosy_blur.json"),
        },
        {
          id: "6",
          image: require("../../assets/background_svg/space_preview.png"),
          lottie: require("../../assets/background_svg/space.json"),
        },
        {
          id: "7",
          image: require("../../assets/background_svg/starry_night_preview.png"),
          lottie: require("../../assets/background_svg/starry_night.json"),
        },

        {
          id: "9",
          image: require("../../assets/background_svg/train_preview.png"),
          lottie: require("../../assets/background_svg/train.json"),
        },
        {
          id: "10",
          image: require("../../assets/background_svg/colorful_bubbles_preview.png"),
          lottie: require("../../assets/background_svg/colorful_bubbles.json"),
        },
        {
          id: "11",
          image: require("../../assets/background_svg/rainbow_strips_preview.png"),
          lottie: require("../../assets/background_svg/rainbow_strips.json"),
        },
        {
          id: "12",
          image: require("../../assets/background_svg/plants_preview.png"),
          lottie: require("../../assets/background_svg/plants.json"),
        },
        {
          id: "13",
          image: require("../../assets/background_svg/magenta_blur_preview.png"),
          lottie: require("../../assets/background_svg/magenta_blur.json"),
        },
      ],
      music: [],
      lottie: [],
    };

    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setLottieBackground(item);
          setShowMenu(false);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        style={{
          width: "50%",
          padding: 4,
          height: (250 * width) / 414,
          marginBottom: 5,
        }}
      >
        <Image
          source={item.image}
          style={{
            position: "relative",
            width: "100%",
            resizeMode: "cover",
            height: (250 * width) / 414,
          }}
        />
      </TouchableOpacity>
    );

    return (
      <ScaleInOut
        visible={showMenu}
        style={{
          ...styles.sideMenuWrapStyle,
          flex: 1,
          flexDirection: "row",
        }}
      >
        <FlatList
          horizontal={false}
          style={[styles.flatListMenuStyle]}
          data={data[showMenu]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </ScaleInOut>
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
        : "rgba(255, 255, 255, 0.46)",
    borderWidth: 2,
    borderColor:
      Platform.OS === "android"
        ? "rgba(32, 32, 34, 0.42)"
        : "rgba(32, 32, 34, 0.52)",
  },
  notificationIconWrapStyle: {
    padding: 1,
    borderRadius: (Sizes.fixPadding * width) / 414,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.22)",
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
  sidebarMenuWrap: {
    position: "absolute",
    zIndex: 3,
    display: "flex",
    flexDirection: "row",
    right: 0,
    paddingHorizontal: (10.0 * width) / 414,
  },
  sideBarWrapStyle: {
    marginLeft: "auto",
    alignItems: "center",
    borderRadius: 12,
    height: (42.0 * width * 3) / 414 + 35,
  },
  sideMenuWrapStyle: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: (8.0 * width) / 414,
    paddingHorizontal: (8.0 * width) / 414,
    borderRadius: 12,
    backgroundColor: "rgba(101, 101, 101, 0.92)",
  },
  flatListMenuStyle: {
    borderRadius: 4,
    padding: 1,
    backgroundColor:
      Platform.OS === "android"
        ? "rgba(32, 32, 34, 0.42)"
        : "rgba(32, 32, 34, 0.52)",
  },
  closeButtonStyle: {
    position: "absolute",
    marginLeft: (20.0 * width) / 414,
    marginTop: (20.0 * width) / 414,
    zIndex: 4,
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
