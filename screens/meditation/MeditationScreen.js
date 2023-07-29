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
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

const { width, height } = Dimensions.get("window");

const MeditationScreen = ({ navigation }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [initValue, setInitValue] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [waitingForNextLine, setWaitingForNextLine] = useState(false);
  const [sound, setSound] = useState(null);
  const [pauseTime, setPauseTime] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(null);
  const [lastTimePaused, setLastTimePaused] = useState(0);
  const [phraseCurrentlyPlaying, setPhraseCurrentlyPlaying] = useState(0);

  const [lottieBackground, setLottieBackground] = useState({
    id: "7",
    image: require("../../assets/background_svg/starry_night_preview.png"),
    lottie: require("../../assets/background_svg/starry_night.json"),
  });

  const [lottieMeditation, setLottieMeditation] = useState({
    id: "2",
    image: require("../../assets/Meditation/sloth.png"),
    lottie: require("../../assets/Meditation/sloth.json"),
  });

  const [meditationInfo, setMeditationInfo] = useState({
    date: "2023-07-03",
    finishedGenerating: true,
    meditationUrls: {
      1: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/1.wav",
      },
      2: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/2.wav",
      },
      3: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/3.wav",
      },
      4: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/4.wav",
      },
      5: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/5.wav",
      },
      6: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/6.wav",
      },
      7: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/7.wav",
      },
      8: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/8.wav",
      },
      9: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/9.wav",
      },
      10: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/10.wav",
      },
      11: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/11.wav",
      },
      12: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/12.wav",
      },
      13: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/13.wav",
      },
      14: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/14.wav",
      },
      15: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/15.wav",
      },
      16: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/16.wav",
      },
      17: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/17.wav",
      },
      18: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/18.wav",
      },
      19: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/19.wav",
      },
      20: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/20.wav",
      },
      21: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/21.wav",
      },
      22: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/22.wav",
      },
      23: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/23.wav",
      },
      24: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/24.wav",
      },
      25: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/25.wav",
      },
      26: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/26.wav",
      },
      27: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/27.wav",
      },
      28: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/28.wav",
      },
      29: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/29.wav",
      },
      30: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/30.wav",
      },
      31: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/31.wav",
      },
      32: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/32.wav",
      },
      33: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/33.wav",
      },
      34: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/34.wav",
      },
      35: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/35.wav",
      },
      36: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/36.wav",
      },
      37: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/37.wav",
      },
      38: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/38.wav",
      },
      39: {
        url: "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/bNzLSCwIQrTOmY0Pc3zCgk6EVno2/7/39.wav",
      },
      count: 39,
    },
    phrases: [
      null,
      "Welcome back, Andy.",
      "It's me, your trusty friend and meditation guide, PetYogi.",
      "I'm here to help you find the motivation and focus you need to conquer your English assignment.",
      "I understand that feeling of being overwhelmed and not wanting to do homework, but fear not, my friend, for within you lies the power to transform your state of mind.",
      "Let us begin our meditation by finding a quiet and comfortable space to sit.",
      "Close your eyes and take a deep breath in, allowing your body to relax.",
      "As you exhale, release any tension or negativity that may be weighing you down.",
      "Feel the weight of the world lifting off your shoulders, leaving you light and free.",
      "Now, imagine yourself floating in the vast expanse of space, surrounded by the infinite beauty of the cosmos.",
      "The stars twinkle like diamonds, casting a gentle glow upon your peaceful form.",
      "Feel the warmth of the sun on your skin, as its rays of light penetrate through the darkness, awakening a sense of purpose within you.",
      "As you gaze out into the endless void of space, notice how small and insignificant your worries seem in comparison to the vastness of the universe.",
      "Allow this perspective to shift your mindset, realizing that the completion of your English assignment is but a small task in the grand scheme of things.",
      "Take a moment to reflect on why you have been feeling depressed and resistant to doing your homework.",
      "Is it the fear of failure, the pressure of expectations, or the weight of procrastination?",
      "Allow yourself to acknowledge these emotions without judgment, knowing that they are merely temporary clouds passing through your consciousness.",
      "Now, visualize the English assignment in front of you, surrounded by a soft, golden light.",
      "See yourself reaching out and embracing it with open arms, accepting it as a challenge that you are fully capable of overcoming.",
      "Feel a surge of motivation and determination coursing through your veins, empowering you to tackle this task head-on.",
      "As you begin to work on your assignment, notice how your focus sharpens and your mind becomes clear.",
      "Each word you write flows effortlessly from your fingertips, as if guided by a higher force.",
      "You find yourself immersed in a state of creative flow, where time seems to stand still and distractions fade away.",
      "Take a moment to envision the satisfaction and pride you will feel upon completing your English assignment.",
      "Visualize handing it in with confidence, knowing that you have given it your best effort.",
      "Feel the sense of accomplishment radiating from within, as if you have conquered a mountain and emerged victorious.",
      "Notice the subtle shifts happening within you as you immerse yourself in this visualization.",
      "Feel a renewed sense of energy and purpose filling every cell of your being.",
      "Allow yourself to fully embody this state of motivation and focus, knowing that it is always within reach, waiting to be activated.",
      "Now, take a deep breath in and exhale slowly, releasing any remaining tension or doubt.",
      "Know that you have the power to transform your state of mind at any moment.",
      "You are not defined by your past procrastination or current feelings of depression.",
      "You are a limitless being capable of achieving greatness.",
      "Before we conclude this meditation, I want to leave you with a nugget of wisdom.",
      "Remember that motivation is not something you find outside of yourself; it is a flame that can only be ignited from within.",
      "Cultivate a mindset of positivity and self-belief, and watch as the universe conspires to support you on your journey.",
      "Thank you, Andy, for allowing me to guide you on this transformative meditation journey.",
      "As you open your eyes and return to the present moment, carry this newfound motivation and focus with you throughout your day.",
      "You have the power to conquer any challenge that comes your way.",
      "Now, go forth and shine your light upon the world.",
    ],
  });

  const loadingAudioRef = useRef(false); // Track if audio is currently loading

  const [showMenu, setShowMenu] = useState(false);

  const timeBetweenPhrases = 5000;

  const maxNumPhrases = meditationInfo.meditationUrls
    ? meditationInfo.meditationUrls.count
      ? Object.keys(meditationInfo.meditationUrls).length - 1
      : Object.keys(meditationInfo.meditationUrls).length
    : 0;

  const generating = meditationInfo.meditationUrls
    ? meditationInfo.meditationUrls.count
      ? Object.keys(meditationInfo.meditationUrls).length - 1 !=
        meditationInfo.meditationUrls.count
      : true
    : true;

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

  const incrementPhrase = () => {
    if (currentPhrase < maxNumPhrases) {
      setCurrentPhrase((prevPhrase) => prevPhrase + 1);
      setInitValue(currentPhrase + 1);
    } else if (currentPhrase == maxNumPhrases && generating) {
      //At last line and waiting for generation
      setWaitingForNextLine(true);
    }
  };

  const configureAudioSession = async () => {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    });
  };

  useEffect(() => {
    configureAudioSession();
  }, []);

  // On next or prev button
  useEffect(() => {
    const playAudio = async () => {
      if (loadingAudioRef.current) {
        return;
      }

      loadingAudioRef.current = true;

      if (sound) {
        await sound.unloadAsync();
      }
      clearTimeout(pauseInterval);
      setPauseInterval(null);

      const onPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
          // Move to the next phrase when the current one ends
          setPauseTime(timeBetweenPhrases); // Set a 5-second pause
          intervalId = setTimeout(incrementPhrase, timeBetweenPhrases);
          setPauseInterval(intervalId);
          setLastTimePaused(Date.now());
        }
      };

      const url = meditationInfo.meditationUrls
        ? meditationInfo.meditationUrls[currentPhrase]?.url
        : null;

      if (url) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: playing },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        loadingAudioRef.current = false;
        setPhraseCurrentlyPlaying(currentPhrase);
      }
    };

    const indexZeroHandler = async () => {
      if (loadingAudioRef.current) {
        return;
      }
      if (sound) {
        sound.unloadAsync();
      }
      clearTimeout(pauseInterval);
      setPauseInterval(null);
      setSound(null);
      setPhraseCurrentlyPlaying(0);

      if (playing) {
        incrementPhrase();
      }

      loadingAudioRef.current = false;
    };

    if (waitingForNextLine) {
      // Don't need to wait anymore because currentPhrase changed
      setWaitingForNextLine(false);
    }

    if (currentPhrase != 0 && phraseCurrentlyPlaying != currentPhrase) {
      // play meditation line
      playAudio();
    } else if (currentPhrase == 0) {
      indexZeroHandler();
    } else {
      loadingAudioRef.current = false;
    }

    // Clean up the interval on unmount
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      setPauseInterval(null);
    };
  }, [currentPhrase, loadingAudioRef.current]);

  // on play or pause
  useEffect(() => {
    if (waitingForNextLine) {
      // Don't need to wait anymore because paused
      setWaitingForNextLine(false);
    }

    const handlePlayChange = async () => {
      if (playing) {
        lottieRef.current?.play();

        // If the 5 second pause is not over, resume the interval
        if (pauseInterval) {
          intervalId = setTimeout(incrementPhrase, pauseTime);
          setPauseInterval(intervalId);
          setLastTimePaused(Date.now());
        } else {
          if (currentPhrase == 0) {
            incrementPhrase();
          } else if (sound) {
            await sound.playAsync();
          }
        }
      } else {
        lottieRef.current?.pause();

        if (pauseInterval) {
          clearTimeout(pauseInterval);
          setPauseTime(pauseTime - (Date.now() - lastTimePaused));
        } else {
          if (sound) {
            sound.pauseAsync();
          }
        }
      }
    };

    handlePlayChange();
  }, [playing]);

  useEffect(() => {
    if (waitingForNextLine) {
      incrementPhrase();
    }
  }, [maxNumPhrases]);

  useEffect(() => {
    if (playing) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [lottieMeditation]);

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
                source={lottieMeditation?.lottie}
                style={{
                  position: "relative",
                  top: 0,
                }}
                speed={lottieMeditation?.id == "8" ? 1 : 0.5}
                ref={lottieRef}
                loop
              ></Lottie>
            </View>
            <View
              style={[
                styles.meditationText,
                lottieBackground.id == "2"
                  ? {
                      backgroundColor:
                        Platform.OS === "android"
                          ? "rgba(255, 255, 255, 0.92)"
                          : "rgba(255, 255, 255, 0.86)",
                    }
                  : {
                      backgroundColor:
                        Platform.OS === "android"
                          ? "rgba(32, 32, 34, 0.42)"
                          : "rgba(32, 32, 34, 0.52)",
                    },
              ]}
            >
              <Text
                style={[
                  Fonts.meditationText,
                  {
                    color:
                      lottieBackground.id == "2"
                        ? Colors.bodyBackColor
                        : Colors.whiteColor,
                  },
                ]}
              >
                {meditationInfo?.phrases[currentPhrase]}
              </Text>
            </View>
            <View style={{ marginBottom: "14%" }}>
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
                  <Text style={Fonts.progressLabelText}>
                    {generating ? "Generating ..." : "# of phrases"}
                  </Text>
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
                    <TouchableOpacity
                      onPress={() => {
                        if (!loadingAudioRef.current) setPlaying(!playing);
                      }}
                    >
                      <Ionicons
                        name={playing ? "ios-pause-circle" : "ios-play-circle"}
                        size={60 * (width / 414)}
                        color={
                          lottieBackground.id == "2"
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
            backgroundColor:
              showMenu == "meditation"
                ? "rgba(101, 101, 101, 0.92)"
                : "rgba(37, 53, 66,0.9)",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              showMenu == "meditation"
                ? setShowMenu(false)
                : setShowMenu("meditation");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={[styles.notificationIconWrapStyle]}
          >
            <Image
              source={lottieMeditation?.image}
              style={{
                borderRadius: (Sizes.fixPadding * width) / 414,
                width: (40.0 * width) / 414,
                height: (40.0 * width) / 414,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingTop: (5.0 * width) / 414,
            paddingHorizontal: (12.0 * width) / 414,
            paddingBottom: (10.0 * width) / 414,
            backgroundColor:
              showMenu == "music"
                ? "rgba(101, 101, 101, 0.92)"
                : "rgba(37, 53, 66,0.9)",
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              showMenu == "music" ? setShowMenu(false) : setShowMenu("music");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={styles.notificationIconWrapStyle}
          >
            <Ionicons
              name="musical-notes"
              size={25 * (width / 414)}
              color="#FFFFFF"
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
          id: "1",
          image: require("../../assets/background_svg/fireplace_preview.png"),
          lottie: require("../../assets/background_svg/fireplace.json"),
        },
        {
          id: "2",
          image: require("../../assets/background_svg/frosty_snowman_preview.png"),
          lottie: require("../../assets/background_svg/frosty_snowman.json"),
        },
        {
          id: "3",
          image: require("../../assets/background_svg/jungle_preview.png"),
          lottie: require("../../assets/background_svg/jungle.json"),
        },
        {
          id: "4",
          image: require("../../assets/background_svg/mountain_preview.png"),
          lottie: require("../../assets/background_svg/mountain.json"),
        },
        {
          id: "5",
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
          id: "8",
          image: require("../../assets/background_svg/train_preview.png"),
          lottie: require("../../assets/background_svg/train.json"),
        },
        {
          id: "9",
          image: require("../../assets/background_svg/colorful_bubbles_preview.png"),
          lottie: require("../../assets/background_svg/colorful_bubbles.json"),
        },
        {
          id: "10",
          image: require("../../assets/background_svg/rainbow_strips_preview.png"),
          lottie: require("../../assets/background_svg/rainbow_strips.json"),
        },
        {
          id: "11",
          image: require("../../assets/background_svg/plants_preview.png"),
          lottie: require("../../assets/background_svg/plants.json"),
        },
        {
          id: "12",
          image: require("../../assets/background_svg/magenta_blur_preview.png"),
          lottie: require("../../assets/background_svg/magenta_blur.json"),
        },
      ],
      music: [],
      meditation: [
        {
          id: "1",
          image: require("../../assets/Meditation/monkey.png"),
          lottie: require("../../assets/Meditation/monkey.json"),
        },
        {
          id: "2",
          image: require("../../assets/Meditation/sloth.png"),
          lottie: require("../../assets/Meditation/sloth.json"),
        },
        {
          id: "3",
          image: require("../../assets/Meditation/tiger.png"),
          lottie: require("../../assets/Meditation/tiger.json"),
        },
        {
          id: "4",
          image: require("../../assets/Meditation/turtle.png"),
          lottie: require("../../assets/Meditation/turtle.json"),
        },
        {
          id: "5",
          image: require("../../assets/Meditation/koala.png"),
          lottie: require("../../assets/Meditation/koala.json"),
        },
        {
          id: "6",
          image: require("../../assets/Meditation/fox.png"),
          lottie: require("../../assets/Meditation/fox.json"),
        },
        {
          id: "7",
          image: require("../../assets/Meditation/blob.png"),
          lottie: require("../../assets/Meditation/blob.json"),
        },
        {
          id: "8",
          image: require("../../assets/Meditation/meditation_ring_1.png"),
          lottie: require("../../assets/Meditation/meditation_ring_1.json"),
        },
        {
          id: "8",
          image: require("../../assets/Meditation/rabbit.png"),
          lottie: require("../../assets/Meditation/rabbit.json"),
        },
      ],
    };

    const renderItem = ({ item }) => {
      if (showMenu == "background") {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setLottieBackground(item);
              setShowMenu(false);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            style={{
              width: "50%",
              paddingHorizontal: 4,
              paddingVertical: 1,
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
      } else if (showMenu == "meditation") {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setLottieMeditation(item);
              setShowMenu(false);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            style={{
              width: "50%",
              height: (160 * width) / 414,
              marginBottom: 5,
              borderRadius: 10,
              borderWidth: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.image}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        );
      } else if (showMenu == "music") {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              // setLottieMeditation(item);
              setShowMenu(false);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            style={{
              width: "50%",
              height: (160 * width) / 414,
              marginBottom: 5,
              borderRadius: 10,
              borderWidth: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.image}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        );
      }
    };

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
  meditationText: {
    paddingHorizontal: 4,
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
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
