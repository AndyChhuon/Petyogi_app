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
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import * as Haptics from "expo-haptics";
import Lottie from "lottie-react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import ScaleInOut from "../../Animations/ScaleInOut";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import useAuth from "../../hooks/useAuth";

const { width, height } = Dimensions.get("window");

const MeditationScreen = ({ navigation, route }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [initValue, setInitValue] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [waitingForNextLine, setWaitingForNextLine] = useState(false);
  const [sound, setSound] = useState(null);
  const [pauseTime, setPauseTime] = useState(0);
  const [pauseInterval, setPauseInterval] = useState(null);
  const [lastTimePaused, setLastTimePaused] = useState(0);
  const [phraseCurrentlyPlaying, setPhraseCurrentlyPlaying] = useState(0);
  const [musicSound, setMusicSound] = useState(null);
  const [initialVolume, setInitialVolume] = useState(0.3);
  const [musicVolume, setMusicVolume] = useState(initialVolume);
  const { listenMeditationUpdate } = useAuth();

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

  const [musicMeditation, setMusicMeditation] = useState({
    id: "4",
    image: require("../../assets/music/peaceful_thoughts_preview.jpg"),
    title: "Peaceful Thoughts",
    sound: require("../../assets/music/peaceful_thoughts.mp3"),
  });

  const [meditationInfo, setMeditationInfo] = useState(route.params);

  const loadingAudioRef = useRef(false); // Track if audio is currently loading
  const loadingMusicRef = useRef(false); // Track if music is currently loading

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
      playsInSilentModeIOS: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    });
  };

  useEffect(() => {
    configureAudioSession();
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (meditationInfo.shouldListenRealTime) {
      unsubscribe = listenMeditationUpdate(
        meditationInfo.number,
        setMeditationInfo
      );
    }

    return () => {
      // Unsubscribe from the event listener when the component unmounts
      if (unsubscribe) unsubscribe();
    };
  }, [meditationInfo.shouldListenRealTime]);

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
    if (waitingForNextLine) {
      incrementPhrase();
    }
  }, [maxNumPhrases]);

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
    const replayMusic = async () => {
      if (musicSound) {
        // Pause the sound if it's currently playing
        await musicSound.pauseAsync();

        // Reset the position of the sound to the beginning
        await musicSound.setPositionAsync(0);

        // Replay the sound from the beginning
        await musicSound.playAsync();
      }
    };

    const onMusicPlaybackStatusUpdate = (status) => {
      if (status.didJustFinish) {
        replayMusic();
      }
    };

    const handleMusicChange = async () => {
      if (musicSound) {
        await musicSound.unloadAsync();
      }

      if (!musicMeditation.sound) {
        setMusicSound(null);
        loadingMusicRef.current = false;
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        musicMeditation.sound,
        { shouldPlay: playing, volume: musicVolume },
        onMusicPlaybackStatusUpdate
      );
      setMusicSound(newSound);
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
                {meditationInfo?.phrases
                  ? meditationInfo?.phrases[currentPhrase]
                  : ""}
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
          onPress={() => {
            if (sound) sound.unloadAsync();
            if (musicSound) musicSound.unloadAsync();
            if (pauseInterval) clearTimeout(pauseInterval);
            navigation.navigate("BottomTabBar");
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
          title: "",
        },
      ],
      music: [
        {
          id: "1",
          image: null,
          title: "No music",
        },
        {
          id: "2",
          image: require("../../assets/music/tranquil_rainfall_preview.jpg"),
          title: "Nature Sounds - Rainfall",
          sound: require("../../assets/music/tranquil_rainfall.mp3"),
        },
        {
          id: "3",
          image: require("../../assets/music/waterstream_preview.png"),
          title: "Nature Sounds - Water Stream",
          sound: require("../../assets/music/waterstream.mp3"),
        },
        {
          id: "4",
          image: require("../../assets/music/peaceful_thoughts_preview.jpg"),
          title: "Peaceful Thoughts",
          sound: require("../../assets/music/peaceful_thoughts.mp3"),
        },
        {
          id: "5",
          image: require("../../assets/music/piano_valley_preview.jpg"),
          title: "Piano Valley",
          sound: require("../../assets/music/piano_valley.mp3"),
        },
        {
          id: "6",
          image: require("../../assets/music/ocean_waves_preview.jpg"),
          title: "Nature Sounds - Ocean Waves",
          sound: require("../../assets/music/ocean_waves.mp3"),
        },
        {
          id: "7",
          image: require("../../assets/music/quartz_bowl_preview.jpg"),
          title: "Meditation Bowls",
          sound: require("../../assets/music/quartz_bowl.mp3"),
        },
        {
          id: "8",
          image: require("../../assets/music/earth_chimes_preview.jpg"),
          title: "Earth's Chimes",
          sound: require("../../assets/music/earth_chimes.mp3"),
        },
        {
          id: "9",
          image: require("../../assets/music/mystical_handpan_preview.jpg"),
          title: "Handpan Harmonies",
          sound: require("../../assets/music/handpan_harmonies.mp3"),
        },
        {
          id: "10",
          image: require("../../assets/music/mystical_flute_preview.jpg"),
          title: "Flute of Enchantments",
          sound: require("../../assets/music/flute_enchantments.mp3"),
        },
        {
          id: "11",
          image: require("../../assets/music/earthly_wonders_preview.jpg"),
          title: "Mind's Wonderland",
          sound: require("../../assets/music/Mind_wonderland.mp3"),
        },
      ],
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
              setMusicMeditation(item);
              setInitialVolume(musicVolume);
              setShowMenu(false);

              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
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
            data={data[showMenu]}
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
            data={data[showMenu]}
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
