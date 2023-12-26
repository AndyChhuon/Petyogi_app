import React, { useState, useRef, useEffect } from "react";
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
} from "react-native";
import { meditationScreenCustomizeables } from "../../constants/constants";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import * as Haptics from "expo-haptics";
import Lottie from "lottie-react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import ScaleInOut from "../../Animations/ScaleInOut";
import { Bar as ProgressBar } from "react-native-progress";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import FloatingAnimation from "../../Animations/FloatingAnimation";
import useAuth from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeButton from "react-native-really-awesome-button";
import { FontAwesome } from "@expo/vector-icons";

const MeditationScreen = ({ navigation, route }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [prevPhraseFinished, setPrevPhraseFinished] = useState(false);
  const [audioButtonWasPressed, setAudioButtonWasPressed] = useState(false);
  const [waitingForNextLine, setWaitingForNextLine] = useState(false);
  const [sound, setSound] = useState(null);
  const [pauseTime, setPauseTime] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(null);
  const [lastTimePaused, setLastTimePaused] = useState(0);
  const [phraseCurrentlyPlaying, setPhraseCurrentlyPlaying] = useState(0);
  const [musicSound, setMusicSound] = useState(null);
  const [initialVolume, setInitialVolume] = useState(0.3);
  const [musicVolume, setMusicVolume] = useState(initialVolume);
  const [conclusionWasSet, setConclusionWasSet] = useState(false);
  const [meditationHasStarted, setMeditationHasStarted] = useState(false);
  const [displaySpeedModal, setDisplaySpeedModal] = useState(false);
  const {
    setUpdateTutorialModalVisible,
    updateTutorialModalVisible,
    userValues,
  } = useAuth();

  const initDimensions = Dimensions.get("window");
  const [width, setWidth] = useState(initDimensions.width);
  const [height, setHeight] = useState(initDimensions.height);

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
  }, [setWidth, setHeight]);

  const styles = createStyles(width, height);

  const updateMusicStorage = async (musicMeditation) => {
    try {
      await AsyncStorage.setItem(
        "musicMeditation",
        musicMeditation.id.toString()
      );
    } catch (e) {}
  };

  const updateSpeedStorage = async (speed) => {
    try {
      await AsyncStorage.setItem("meditationSpeed", speed.toString());
    } catch (e) {}
  };

  const updateLottieMeditationStorage = async (lottieMeditation) => {
    try {
      await AsyncStorage.setItem(
        "lottieMeditation",
        lottieMeditation.id.toString()
      );
    } catch (e) {}
  };

  const updateLottieBackgroundStorage = async (lottieBackground) => {
    try {
      await AsyncStorage.setItem(
        "lottieBackground",
        lottieBackground.id.toString()
      );
    } catch (e) {}
  };

  const { initMeditationInfo, meditationPreferences } = route.params;

  const [meditationInfo, setMeditationInfo] = useState(initMeditationInfo);
  const initLottieBackgroundId = meditationPreferences?.lottieBackground;
  const initLottieMeditationId = meditationPreferences?.lottieMeditation;
  const initMusicMeditationId = meditationPreferences?.musicMeditation;
  const initMeditationSpeed = meditationPreferences?.meditationSpeed;
  const [lottieBackground, setLottieBackground] = useState(
    initLottieBackgroundId &&
      meditationScreenCustomizeables.background.find(
        (item) => item.id == initLottieBackgroundId
      )
      ? meditationScreenCustomizeables.background.find(
          (item) => item.id == initLottieBackgroundId
        )
      : {
          id: "7",
          image: require("../../assets/background_svg/starry_night_preview.png"),
          lottie: require("../../assets/background_svg/starry_night.json"),
          textColor: "#639aba",
          gems: "Free",
          name: "Starry Night",
        }
  );
  const [speedControl, setSpeedControl] = useState(
    initMeditationSpeed ? initMeditationSpeed : 1.5
  );
  const [speedControlTemp, setSpeedControlTemp] = useState(
    initMeditationSpeed ? initMeditationSpeed : 1.5
  );

  const [lottieMeditation, setLottieMeditation] = useState(
    initLottieMeditationId &&
      meditationScreenCustomizeables.meditation.find(
        (item) => item.id == initLottieMeditationId
      )
      ? meditationScreenCustomizeables.meditation.find(
          (item) => item.id == initLottieMeditationId
        )
      : {
          id: "2",
          image: require("../../assets/Meditation/sloth.png"),
          lottie: require("../../assets/Meditation/sloth.json"),
          gems: "Free",
          name: "Mellow",
          backgroundColor: "#ffd6ac",
        }
  );

  const [musicMeditation, setMusicMeditation] = useState({
    id: "-1",
    image: null,
    title: "No music",
    gems: "Free",
  });

  const initMusic =
    initMusicMeditationId &&
    meditationScreenCustomizeables.music.find(
      (item) => item.id == initMusicMeditationId
    )
      ? meditationScreenCustomizeables.music.find(
          (item) => item.id == initMusicMeditationId
        )
      : {
          id: "4",
          image: require("../../assets/music/blue_star.jpg"),
          title: "Star Gazing",
          sound:
            "https://petyogipublic.s3.us-east-2.amazonaws.com/meditations/Music/Blue+star.mp3",
          name: "Star Gazing",
          gems: "Free",
        };

  const loadingAudioRef = useRef(false); // Track if audio is currently loading
  const loadingMusicRef = useRef(false); // Track if music is currently loading

  const [showMenu, setShowMenu] = useState(false);

  const timeBetweenPhrases = speedControl * 1000;

  const tutorialShouldShow = meditationInfo.tutorialShouldShow ? true : false;

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

  const diamondRef = useRef(null);
  const [nbGems, setNbGems] = useState(0);
  const [newGemIsAnimating, setNewGemIsAnimating] = useState(false);
  const [gemSize, setGemSize] = useState(25);

  const onNextButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentPhrase < maxNumPhrases) {
      setCurrentPhrase(currentPhrase + 1);
    }
  };

  // Called after the current phrase ends and timeBetweenPhrases has passed
  const incrementPhrase = () => {
    if (currentPhrase < maxNumPhrases) {
      setCurrentPhrase((prevPhrase) => prevPhrase + 1);
    } else if (currentPhrase == maxNumPhrases && generating) {
      //At last line and waiting for generation
      setWaitingForNextLine(true);
    }
  };

  const phraseJustFinished = () => {
    setPrevPhraseFinished(true);
  };

  const configureAudioSession = async () => {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    });
  };

  useEffect(() => {
    configureAudioSession();
    if (tutorialShouldShow && updateTutorialModalVisible == "none") {
      setUpdateTutorialModalVisible("meditationLoading");
    }
  }, []);

  const addGemsToAsync = async (nbGems) => {
    if (nbGems > 0) {
      try {
        await AsyncStorage.setItem("claimableGems", nbGems.toString());
      } catch (e) {}
    }
  };
  // set claimable gems in async storage
  useEffect(() => {
    addGemsToAsync(nbGems);
  }, [nbGems]);

  useEffect(() => {
    setMusicMeditation(initMusic);
    setTimeout(() => {
      if (!playing) {
        setPlaying(true);
      }
    }, 1500);
  }, []);

  useEffect(() => {
    if (prevPhraseFinished && isAutoplay) {
      incrementPhrase();
    }
  }, [prevPhraseFinished, isAutoplay]);

  useEffect(() => {
    if (sound && isAutoplay) {
      sound.playAsync();
    }
  }, [isAutoplay]);

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
          intervalId = setTimeout(phraseJustFinished, timeBetweenPhrases);
          setPauseInterval(intervalId);
          setLastTimePaused(Date.now());
          reveivedGems();
        }
      };

      const url = meditationInfo.meditationUrls
        ? meditationInfo.meditationUrls[currentPhrase]?.url
        : null;

      if (url) {
        setPrevPhraseFinished(false);
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: isAutoplay },
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

        if (musicSound) {
          await musicSound.playAsync();
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

        if (musicSound) {
          await musicSound.pauseAsync();
        }
      }
    };

    handlePlayChange();
  }, [playing]);

  useEffect(() => {
    if (waitingForNextLine && !conclusionWasSet) {
      incrementPhrase();
    }
  }, [maxNumPhrases]);

  useEffect(() => {
    if (audioButtonWasPressed && sound) {
      sound
        .replayAsync()
        .then(() => {
          setAudioButtonWasPressed(false);
        })
        .catch((err) => {
          setTimeout(() => {
            sound.replayAsync().then(() => {
              setAudioButtonWasPressed(false);
            });
          }, 300);
        });
    }
  }, [audioButtonWasPressed, sound]);
  // Case where maxNumPhrases increments while last sentence is playing (stays stuck bc of setInterval)
  useEffect(() => {
    if (waitingForNextLine && currentPhrase < maxNumPhrases) {
      incrementPhrase();
    }
  }, [waitingForNextLine]);

  useEffect(() => {
    if (playing) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [lottieMeditation]);

  useEffect(() => {
    const handleMusicChange = async () => {
      if (musicSound) {
        await musicSound.unloadAsync();
      }

      if (!musicMeditation.sound) {
        setMusicSound(null);
        if (!meditationHasStarted) setMeditationHasStarted(true);
        loadingMusicRef.current = false;
        return;
      }

      // playing == null means init music should be playing
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: musicMeditation.sound },
        {
          shouldPlay: playing || playing == null,
          volume: musicVolume,
          isLooping: true,
        }
      );
      setMusicSound(newSound);
      if (!meditationHasStarted) setMeditationHasStarted(true);

      loadingMusicRef.current = false;
    };

    if (loadingMusicRef.current) {
      return;
    }
    loadingMusicRef.current = true;
    handleMusicChange();
  }, [musicMeditation]);

  useEffect(() => {
    if (musicSound) {
      musicSound.setVolumeAsync(musicVolume);
    }
  }, [musicVolume]);

  function getRandomNumber() {
    const randomValue = Math.random(); // Generates a random number between 0 and 1

    if (randomValue < 0.8) {
      return 1; // 80% chance
    } else if (randomValue < 0.95) {
      return 2; // 15% chance
    } else {
      return 3; // 5% chance
    }
  }

  const reveivedGems = () => {
    diamondRef.current?.play();
    setGemSize(30);
    setNewGemIsAnimating(true);
    setTimeout(() => {
      diamondRef.current?.reset();
      setGemSize(25);
      setNewGemIsAnimating(false);
    }, 2000);

    setNbGems(nbGems + getRandomNumber());
  };

  return (
    <>
      <Lottie
        source={lottieBackground?.lottie}
        style={{
          position: "absolute",
          zIndex: 1,
          resizeMode: "cover",
          width: "100%",
          height: "100%",
          aspectRatio: width / height,
          backgroundColor: "#341c72",
        }}
        speed={0.5}
        autoPlay
        loop
      ></Lottie>

      <ScaleInOut
        visible={displaySpeedModal}
        delayIn={200}
        style={[
          {
            display: displaySpeedModal ? "flex" : "none",
            backgroundColor: "rgba(37, 53, 66, 0.5)",
            position: "absolute",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            height: "100%",
          },
        ]}
      >
        <>
          <View
            style={{
              width: "80%",
              paddingVertical: (20 * height) / 880,
              backgroundColor: "#00CCBB",
              paddingHorizontal: 5,
              alignItems: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderWidth: 0,
              borderBottomColor: "#00CCBB",
            }}
          >
            <Text style={[Fonts.streakModalTitle, { textAlign: "center" }]}>
              Auto Play
            </Text>
          </View>

          <View
            style={{
              width: "80%",
              alignItems: "center",
              backgroundColor: "#A0DED9",
              paddingVertical: (35 * height) / 880,
              paddingBottom: (25 * height) / 880,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderWidth: 0,
              borderTopWidth: 0,
            }}
          >
            <Image
              source={require("../../assets/images/tutorialModal/speedy_chicken.jpg")}
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
                width: "75%",
                alignItems: "center",
                borderColor: "#e9d076",
                borderWidth: 1,
              }}
            >
              <View style={{ width: "100%" }}>
                <Slider
                  style={{
                    flexDirection: "row",
                  }}
                  onValueChange={(value) => {
                    setSpeedControlTemp(value);
                  }}
                  minimumValue={0}
                  maximumValue={15}
                  step={0.5}
                  value={speedControl}
                  thumbTintColor="#FFD369"
                  minimumTrackTintColor="#FFD369"
                  maximumTrackTintColor={Colors.bodyBackColor}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[Fonts.streakModalText]}>{speedControlTemp}s</Text>
                <Image
                  source={require("../../assets/images/icons/clock3.png")}
                  style={{
                    width: 19,
                    height: 19,
                    resizeMode: "contain",
                    marginLeft: 5,
                    //grey out
                  }}
                />
              </View>
            </View>
            <View style={{ paddingTop: 5, justifyContent: "center" }}>
              <Text
                style={[Fonts.streakSavecreditsText, { textAlign: "center" }]}
              >
                Time between each phrase
              </Text>
            </View>
          </View>
        </>

        <View style={{ marginTop: 10 }}>
          <AwesomeButton
            paddingHorizontal={2}
            width={(120 * width) / 414}
            height={50}
            backgroundColor="#e367c7"
            backgroundDarker="#8e1979"
            backgroundShadow="#173746"
            raiseLevel={5}
            borderWidth={1}
            borderColor="#a82e92"
            borderRadius={8}
            onPressedOut={() => {
              setDisplaySpeedModal(false);
              setSpeedControl(speedControlTemp);
              updateSpeedStorage(speedControlTemp);
              setIsAutoplay(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={[Fonts.streakModalButton, { fontSize: 16 }]}>
                Let's go!
              </Text>
            </View>
          </AwesomeButton>
        </View>
      </ScaleInOut>

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
          <View
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              zIndex: 2,
              flex: 1,
              width: "100%",
              height: showMenu ? "100%" : "auto",
            }}
          >
            {closeButton()}
            <View
              style={[
                {
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                },
                showMenu
                  ? {
                      display: "none",
                    }
                  : {},
              ]}
            >
              <Text
                style={[
                  {
                    minHeight: 25,
                    textAlign: "center",
                    marginTop: 6,
                  },
                  Fonts.meditationTitle,
                  lottieBackground?.textColor
                    ? { color: lottieBackground?.textColor }
                    : {},
                ]}
              >
                {currentPhrase} out of {maxNumPhrases}
              </Text>
              <ProgressBar
                progress={currentPhrase / maxNumPhrases}
                animationType="timing"
                color={
                  lottieBackground?.textColor
                    ? lottieBackground?.textColor
                    : "#98eab7"
                }
                borderColor="#3a4754"
                unfilledColor="#30404c"
                width={null}
                height={5}
                borderWidth={3}
                borderRadius={8}
              ></ProgressBar>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: gemSize,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <Text
                  style={[
                    Fonts.meditationTitle,
                    {
                      color: lottieBackground?.textColor
                        ? lottieBackground?.textColor
                        : "#98eab7",
                      fontSize: 13.5,
                      marginRight: 3,
                    },
                    newGemIsAnimating ? { color: "#FFD369" } : {},
                  ]}
                >
                  Crystals: {nbGems}
                </Text>
                <Lottie
                  style={{ height: gemSize }}
                  source={require("../../assets/Meditation/diamond.json")}
                  ref={diamondRef}
                  speed={2}
                ></Lottie>
              </View>
            </View>
            {sidebarMenu()}
          </View>
          <View
            style={{
              flex: 1,
              display: "flex",
              zIndex: 1,
            }}
          >
            <View
              style={{
                flexShrink: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //margin top if portrait
                marginTop: height > width ? (height * 0.1) / 2 : 0,
              }}
            >
              <Lottie
                source={lottieMeditation?.lottie}
                style={{
                  height: "110%",
                  maxWidth: "100%",
                }}
                speed={lottieMeditation?.speed ? lottieMeditation?.speed : 0.6}
                ref={lottieRef}
                loop
              ></Lottie>
            </View>
            <View
              style={[
                styles.meditationText,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 120,
                  marginBottom: "8%",
                  marginHorizontal: "2%",
                },
                lottieBackground?.isLight && {
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 40,
                }}
                onPressIn={() => {
                  setAudioButtonWasPressed(true);
                }}
              >
                <Text
                  style={[
                    Fonts.meditationScreenText,
                    {
                      textAlign: "center",
                      padding: 10,
                      fontSize: 18,
                      color: lottieBackground?.textColor2
                        ? lottieBackground?.textColor2
                        : lottieBackground?.isLight
                        ? Colors.bodyBackColor
                        : Colors.whiteColor,
                    },
                  ]}
                >
                  {meditationInfo?.phrases[currentPhrase]}
                </Text>

                <FontAwesome
                  name="volume-down"
                  color={
                    lottieBackground?.textColor2
                      ? lottieBackground?.textColor2
                      : lottieBackground?.isLight
                      ? Colors.bodyBackColor
                      : Colors.whiteColor
                  }
                  size={50}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: "3%" }}>
              <View
                style={[
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "white",
                    justifyContent: "center",
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
                    marginRight: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (isAutoplay) {
                        setIsAutoplay(false);
                      } else {
                        setDisplaySpeedModal(true);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                    }}
                    style={{ padding: 5 }}
                  >
                    <Image
                      source={
                        isAutoplay
                          ? require("../../assets/images/icons/clock3.png")
                          : require("../../assets/images/icons/grey_clock.png")
                      }
                      style={{
                        width: (27.0 * width) / 414,
                        height: (27.0 * width) / 414,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <AwesomeButton
                  onPressOut={() => onNextButtonPress()}
                  style={styles.loginButtonStyle}
                  backgroundColor={isAutoplay ? "#bababa" : "#fcd289"}
                  raiseLevel={3}
                  width={width * 0.8}
                  borderRadius={20}
                  height={(width * 45) / 414 > 60 ? 60 : (width * 45) / 414}
                  backgroundDarker={isAutoplay ? "#dbdee8" : "#c8a86d"}
                  backgroundShadow={isAutoplay ? "#dcdfe7" : "#e7a60b"}
                  disabled={isAutoplay}
                >
                  <FontAwesome
                    name="chevron-right"
                    color={Colors.whiteColor}
                    size={20}
                  />
                </AwesomeButton>
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
        style={[
          styles.closeButtonStyle,
          showMenu ? { display: "none" } : {},
          displaySpeedModal ? { opacity: 0 } : {},
        ]}
      >
        <Ionicons
          name="close"
          color={Colors.whiteColor}
          size={32}
          onPress={() => {
            if (!meditationHasStarted) return;
            if (sound) sound.unloadAsync();
            if (tutorialShouldShow) {
              setUpdateTutorialModalVisible("none");
            }
            if (musicSound) musicSound.unloadAsync();
            if (pauseInterval) clearTimeout(pauseInterval);

            navigation.navigate("PurchaseScreen", {
              isLoading: true,
              isCTA: true,
            });
          }}
        />
      </View>
    );
  }

  function sidebarMenu() {
    return (
      <View
        style={[
          styles.sidebarMenuWrap,
          showMenu ? { height: "100%", width: "100%", paddingRight: 0 } : {},
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
        {updateTutorialModalVisible == "meditationTutorialIcons" && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              showMenu == "meditation"
                ? setShowMenu(false)
                : setShowMenu("meditation");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              bottom: (40.0 * width) / 414,
              paddingLeft: (28.0 * width) / 414,
              zIndex: 5,
            }}
          >
            <FloatingAnimation duration={1200}>
              <Lottie
                source={require("../../assets/Lottie/click.json")}
                style={{
                  position: "relative",
                  width: (60.0 * width) / 414,
                  height: (60.0 * width) / 414,
                  resizeMode: "contain",
                }}
                speed={0.5}
                autoPlay
                loop
              />
            </FloatingAnimation>
          </TouchableOpacity>
        )}
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
          <ImageBackground
            source={musicMeditation.image}
            imageStyle={{
              height: musicMeditation.id == "1" ? 0 : "100%",
              borderRadius: (Sizes.fixPadding * width) / 414,
            }}
            resizeMode="cover"
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                showMenu == "music" ? setShowMenu(false) : setShowMenu("music");
                setInitialVolume(musicVolume);
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
          </ImageBackground>
        </View>
      </View>
    );
  }

  function sideMenu() {
    const renderItem = ({ item }) => {
      const isOwned =
        item?.gems == "Free" ||
        userValues?.customizeables?.[showMenu]?.[item.id];
      if (showMenu == "background") {
        return (
          <TouchableOpacity
            activeOpacity={isOwned ? 0.9 : 0.6}
            onPress={() => {
              setShowMenu(false);
              if (isOwned) {
                setLottieBackground(item);
                updateLottieBackgroundStorage(item);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate("PurchaseWithGems", {
                  id: item.id,
                  type: "background",
                  amount: item.gems,
                });
              }
            }}
            style={{
              width: "50%",
              paddingHorizontal: 4,
              paddingVertical: 1,
              marginBottom: 5,
            }}
          >
            {!isOwned && (
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  zIndex: 1,
                  opacity: 0.8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(32, 32, 34, 0.8)",
                    padding: 2,
                    paddingRight: 6,
                    paddingTop: 4,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
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
                        { marginBottom: 5, color: "#3ec1fa" },
                      ]}
                    >
                      {item?.gems}
                    </Text>
                    <Image
                      source={require("../../assets/images/icons/gem.png")}
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
                </View>
              </View>
            )}
            <Image
              source={item.image}
              style={{
                position: "relative",
                width: "100%",
                resizeMode: "cover",
                height: (250 * width) / 414,
                opacity: isOwned ? 1 : 0.4,
              }}
            />
          </TouchableOpacity>
        );
      } else if (showMenu == "meditation") {
        return (
          <TouchableOpacity
            activeOpacity={isOwned ? 0.9 : 0.6}
            onPress={() => {
              setShowMenu(false);
              if (isOwned) {
                setLottieMeditation(item);
                updateLottieMeditationStorage(item);
                setShowMenu(false);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate("PurchaseWithGems", {
                  id: item.id,
                  type: "meditation",
                  amount: item.gems,
                });
              }
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
            {!isOwned && (
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  zIndex: 1,
                  opacity: 0.8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(32, 32, 34, 0.8)",
                    padding: 2,
                    paddingRight: 6,
                    paddingTop: 4,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
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
                        { marginBottom: 5, color: "#3ec1fa" },
                      ]}
                    >
                      {item?.gems}
                    </Text>
                    <Image
                      source={require("../../assets/images/icons/gem.png")}
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
                </View>
              </View>
            )}
            <Image
              source={item.image}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 10,
                opacity: isOwned ? 1 : 0.4,
              }}
            />
          </TouchableOpacity>
        );
      } else if (showMenu == "music") {
        return (
          <TouchableOpacity
            activeOpacity={isOwned ? 0.9 : 0.6}
            onPress={() => {
              setShowMenu(false);
              if (isOwned) {
                setMusicMeditation(item);
                updateMusicStorage(item);
                setInitialVolume(musicVolume);
                setShowMenu(false);

                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate("PurchaseWithGems", {
                  id: item.id,
                  type: "music",
                  amount: item.gems,
                  musicIsPlaying: playing,
                  MusicRef: musicSound,
                });
              }
            }}
            style={{
              paddingBottom: 8,
            }}
          >
            {!isOwned && (
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  zIndex: 1,
                  opacity: 0.9,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(32, 32, 34, 0.8)",
                    padding: 2,
                    paddingRight: 6,
                    paddingTop: 4,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
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
                        { marginBottom: 5, color: "#3ec1fa" },
                      ]}
                    >
                      {item?.gems}
                    </Text>
                    <Image
                      source={require("../../assets/images/icons/gem.png")}
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
                </View>
              </View>
            )}
            <ImageBackground
              source={item.image}
              imageStyle={{ borderRadius: 8, height: "100%" }}
              style={{
                width: "100%",
                height: (110 * width) / 414,
                flex: 1,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 0.52)",
                display: "flex",
                justifyContent: "center",
                opacity: isOwned ? 1 : 0.4,
              }}
              resizeMode="cover"
            >
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.52)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  height: 45 * (width / 414),
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    Fonts.musicMeditationText,
                    {
                      flexWrap: "wrap",
                      marginRight: 1,
                      flex: 1,
                      color: Colors.bodyBackColor,
                      textAlign: "center",
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </ImageBackground>
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
        {showMenu == "music" ? (
          <FlatList
            horizontal={false}
            style={[styles.flatListMenuStyle]}
            data={meditationScreenCustomizeables[showMenu]}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={{ flexGrow: 1 }}
            ListHeaderComponent={
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="volume-high-outline"
                  size={28}
                  color="#FFFFFF"
                ></Ionicons>
                <Slider
                  step={0.1}
                  onValueChange={(val) => {
                    setMusicVolume(val);
                  }}
                  value={initialVolume}
                  minimumValue={0}
                  maximumValue={1}
                  style={{ flex: 1 }}
                ></Slider>
              </View>
            }
          />
        ) : (
          <FlatList
            key={"#"}
            horizontal={false}
            style={[styles.flatListMenuStyle]}
            data={meditationScreenCustomizeables[showMenu]}
            renderItem={renderItem}
            keyExtractor={(item) => "#" + item.id}
            numColumns={2}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
      </ScaleInOut>
    );
  }
};

function createStyles(width, height) {
  return StyleSheet.create({
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
      paddingRight: (10.0 * width) / 414,
      display: "flex",
      flexDirection: "row",
    },
    sideBarWrapStyle: {
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
      marginLeft: (20.0 * width) / 414,
      paddingRight: (10.0 * width) / 414,
      marginTop: 25,
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
}

export default MeditationScreen;
