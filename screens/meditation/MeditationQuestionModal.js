import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
  multipleChoiceButtons,
  meditationTypeButtons,
  meditationLotties,
  meditationQuestionsByType,
} from "../../constants/constants";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import { Bar as ProgressBar } from "react-native-progress";
import * as Haptics from "expo-haptics";
import Lottie from "lottie-react-native";
import useAuth from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MeditationQuestionModal = ({ navigation, route }) => {
  const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);
  const [isLastModal, setIsLastModal] = useState(false);
  const [createMeditationLottieIndex, setCreateMeditationLottieIndex] =
    useState(0);
  const { generateNewMeditation, user } = useAuth();

  const {
    initMeditationQuestionsJson,
    readOnly,
    phrases,
    meditationUrls,
    finishedGenerating,
    number,
  } = route.params;

  const [loadingClicked, setLoadingClicked] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [meditationQuestionsJson, setMeditationQuestionsJson] = useState(
    initMeditationQuestionsJson
  );
  const [meditationPreferences, setMeditationPreferences] = useState({});

  useEffect(() => {
    let timeoutId;
    if (flatListRef?.current && currentQuestionIndex <= 1) {
      timeoutId = setTimeout(() => {
        flatListRef?.current?.scrollToEnd({ animated: true });
      }, 800);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentQuestionIndex]);

  const flatListRef = useRef();

  const meditationQuestion =
    meditationQuestionsJson[currentQuestionIndex].Question;
  const meditationAnswer = meditationQuestionsJson[currentQuestionIndex].Answer;
  const progress =
    (currentQuestionIndex + 1) / Object.keys(meditationQuestionsJson).length;
  const meditationTypeQuestionIndex = 1;
  const emotionsQuestion = initMeditationQuestionsJson[2].Question;

  const handleTextBoxFocus = () => {
    setIsTextBoxFocused(true);
  };

  const handleTextBoxBlur = () => {
    setIsTextBoxFocused(false);
  };

  const handlePressOutsideTextBox = () => {
    Keyboard.dismiss();
  };

  const { width, height } = Dimensions.get("window");

  const handleTextChange = (inputText) => {
    setMeditationQuestionsJson((meditationQuestionsJson) => {
      return {
        ...meditationQuestionsJson,
        [currentQuestionIndex]: {
          ...meditationQuestionsJson[currentQuestionIndex],
          Question: meditationQuestion,
          Answer: inputText,
        },
      };
    });
  };

  const charCount = meditationAnswer.length;
  const maxChars = meditationQuestionsJson[currentQuestionIndex].maxChars
    ? meditationQuestionsJson[currentQuestionIndex].maxChars
    : 500;
  const tooManyChars = charCount > maxChars;
  const noteEnoughChars = charCount < 1;

  useEffect(() => {
    setLoadingClicked(false);
  }, [currentQuestionIndex, isLastModal]);

  const getMusicStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("musicMeditation");
      if (value !== null) {
        // string to json
        setMeditationPreferences((meditationPreferences) => {
          return {
            ...meditationPreferences,
            musicMeditation: value,
          };
        });
      }
    } catch (e) {}
  };

  const getLottieMeditationStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("lottieMeditation");

      if (value !== null) {
        // string to json
        setMeditationPreferences((meditationPreferences) => {
          return {
            ...meditationPreferences,
            lottieMeditation: value,
          };
        });
      }
    } catch (e) {}
  };

  const getLottieBackgroundStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("lottieBackground");

      if (value !== null) {
        // string to json
        setMeditationPreferences((meditationPreferences) => {
          return {
            ...meditationPreferences,
            lottieBackground: value,
          };
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    setCreateMeditationLottieIndex(
      Math.floor(Math.random() * meditationLotties.length)
    );
    getMusicStorage();
    getLottieMeditationStorage();
    getLottieBackgroundStorage();
  }, []);

  const onButtonPress = (text, isChosen, currentQuestionIndex) => {
    if (isChosen) {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const chosenButtons =
          meditationQuestionsJson[currentQuestionIndex].Answer;
        const questionMeditation =
          meditationQuestionsJson[currentQuestionIndex].Question;

        const newChosenButtons = chosenButtons.filter(
          (button) => button !== text
        );
        return {
          ...meditationQuestionsJson,
          [currentQuestionIndex]: {
            ...meditationQuestionsJson[currentQuestionIndex],
            Question: questionMeditation,
            Answer: newChosenButtons,
          },
          2: {
            ...meditationQuestionsJson[2],
            Question:
              newChosenButtons.length > 0
                ? emotionsQuestion + newChosenButtons[0].toLowerCase() + "?"
                : emotionsQuestion,
            Answer: meditationQuestionsJson[2].Answer,
          },
        };
      });
    } else {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const chosenButtons =
          meditationQuestionsJson[currentQuestionIndex].Answer;
        const questionMeditation =
          meditationQuestionsJson[currentQuestionIndex].Question;
        const newChosenButtons = [...chosenButtons, text];

        return {
          ...meditationQuestionsJson,
          [currentQuestionIndex]: {
            ...meditationQuestionsJson[currentQuestionIndex],
            Question: questionMeditation,
            Answer: newChosenButtons,
          },
          2: {
            ...meditationQuestionsJson[2],
            Question:
              emotionsQuestion + newChosenButtons[0].toLowerCase() + "?",
            Answer: meditationQuestionsJson[2].Answer,
          },
        };
      });
    }
  };

  const onMeditateButtonPress = (text, isChosen, currentQuestionIndex) => {
    if (isChosen) {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        return {
          ...meditationQuestionsJson,
          [currentQuestionIndex]: {
            ...meditationQuestionsJson[currentQuestionIndex],
            Question: meditationQuestionsJson[currentQuestionIndex].Question,
            Answer: "",
          },
        };
      });
    } else {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const meditationJsonToKeep = {};

        Object.keys(meditationQuestionsJson).forEach((key) => {
          if (key == 0 || key == 1 || key == 2) {
            meditationJsonToKeep[key] = meditationQuestionsJson[key];
          } else {
            // Keep same number of questions
            if (key in meditationQuestionsByType[text]) {
              // if questions are the same
              if (
                meditationQuestionsJson[key].Question ==
                meditationQuestionsByType[text][key].Question
              ) {
                meditationJsonToKeep[key] = meditationQuestionsJson[key];
              } else {
                // if questions are different
                meditationJsonToKeep[key] =
                  meditationQuestionsByType[text][key];
              }
            }
          }
        });

        return {
          ...meditationQuestionsByType[text],
          ...meditationJsonToKeep,
          [currentQuestionIndex]: {
            ...meditationQuestionsJson[currentQuestionIndex],
            Question: meditationQuestionsJson[currentQuestionIndex].Question,
            Answer: text,
          },
        };
      });
    }
  };

  const RenderMeditationButtons = ({
    item,
    isChosen,
    currentQuestionIndex,
  }) => {
    const lottieRef = useRef(null);
    useEffect(() => {
      if (isChosen) {
        setTimeout(() => lottieRef.current?.play());
      } else {
        lottieRef.current.pause();
      }

      return () => {
        lottieRef.current?.reset();
      };
    }, []);

    return (
      <View
        style={[
          styles.meditationChoiceButtonContainer,
          { marginVertical: 0.02 * height },
        ]}
      >
        <AwesomeButton
          width={(135 * width) / 414}
          backgroundColor="#fcc695"
          height={(125 * width) / 414}
          paddingBottom={10}
          paddingHorizontal={5}
          raiseLevel={7}
          borderRadius={8}
          onPressOut={() => {
            if (!readOnly) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onMeditateButtonPress(item.text, isChosen, currentQuestionIndex);
            }
          }}
        >
          <Lottie
            source={item.lottie}
            ref={lottieRef}
            style={{
              position: "relative",
              zIndex: 1,
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              aspectRatio: 1,
              transform: item.scale
                ? [{ scale: item.scale }]
                : [{ scale: 1.04 }],
            }}
            speed={0.6}
            autoPlay
            loop
          ></Lottie>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              display: isChosen ? "flex" : "none",
              zIndex: 2,
              backgroundColor: "rgba(255, 255, 255, 0.55)",
            }}
          />
        </AwesomeButton>
        <Text
          style={[
            Fonts.musicMeditationText,
            { color: "white", fontSize: 15.5, marginTop: 6 },
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  const RenderMultipleChoiceButtons = ({ item, initIsChosen }) => {
    const [isChosen, setIsChosen] = useState(initIsChosen);
    const lottieRef = useRef(null);

    useEffect(() => {
      if (isChosen) {
        setTimeout(() => lottieRef.current?.play());
      } else {
        lottieRef.current.pause();
      }

      return () => {
        lottieRef.current?.reset();
      };
    }, [isChosen]);

    return (
      <View style={styles.multipleChoiceButtonContainer}>
        <AwesomeButton
          width={(100 * width) / 414}
          backgroundColor="#fcc695"
          height={(100 * width) / 414}
          paddingHorizontal={0}
          raiseLevel={7}
          borderRadius={8}
          onPressOut={() => {
            if (!readOnly) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setIsChosen(!isChosen);
              onButtonPress(item.text, isChosen, currentQuestionIndex);
            }
          }}
        >
          <Lottie
            source={item.lottie}
            ref={lottieRef}
            style={{
              position: "relative",
              zIndex: 1,
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              aspectRatio: 1,
              transform: item.scale
                ? [{ scale: item.scale }]
                : [{ scale: 1.04 }],
            }}
            speed={0.6}
            autoPlay
            loop
          ></Lottie>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              display: isChosen ? "flex" : "none",
              zIndex: 2,
              backgroundColor: "rgba(255, 255, 255, 0.55)",
            }}
          />
        </AwesomeButton>
        <Text
          style={[Fonts.musicMeditationText, { color: "white", fontSize: 14 }]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  const initButtons = React.useMemo(() => {
    return multipleChoiceButtons.map((item) => ({
      id: item.id,
      component: (
        <RenderMultipleChoiceButtons
          item={item}
          key={item.id}
          initIsChosen={meditationQuestionsJson[currentQuestionIndex][
            "Answer"
          ].includes(item.text)}
          currentQuestionIndex={currentQuestionIndex}
        />
      ),
    }));
  }, [currentQuestionIndex]);

  const initMeditationTypeButtons = meditationTypeButtons.map((item) => ({
    id: item.id,
    component: React.useMemo(() => {
      return (
        <RenderMeditationButtons
          item={item}
          key={item.id}
          isChosen={
            meditationQuestionsJson[currentQuestionIndex]["Answer"] ===
            item.text
          }
          currentQuestionIndex={currentQuestionIndex}
        />
      );
    }, [
      meditationQuestionsJson[currentQuestionIndex]["Answer"] === item.text,
      currentQuestionIndex,
    ]),
  }));

  const renderItem = ({ item }) => {
    return item.component;
  };

  const onNextButtonPress = () => {
    if (loadingClicked) {
      return;
    }
    if (
      currentQuestionIndex <
      Object.keys(meditationQuestionsJson).length - 1
    ) {
      setLoadingClicked(true);
      handlePressOutsideTextBox();
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCurrentQuestionIndex((index) => index + 1);
      }, 150);
    } else if (!isLastModal) {
      setLoadingClicked(true);
      setIsTextBoxFocused(false);
      handlePressOutsideTextBox();
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsLastModal(true);
      }, 150);
    } else {
      setLoadingClicked(true);
      // Meditation generation was already called
      if (readOnly) {
        setTimeout(() => {
          // Last phrase was generated
          if (
            finishedGenerating &&
            meditationUrls.hasOwnProperty("count") &&
            meditationUrls.count in meditationUrls
          ) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            const propsToPass = {
              phrases: phrases,
              meditationUrls: meditationUrls,
              shouldListenRealTime: false,
              number: number,
              meditationPreferences: meditationPreferences,
            };

            navigation.navigate("MeditationScreen", propsToPass);
            setLoadingClicked(false);
          } else {
            //Not done with generation (realtime connection)

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            const propsToPass = {
              phrases: phrases,
              meditationUrls: meditationUrls,
              shouldListenRealTime: true,
              number: number,
              meditationPreferences: meditationPreferences,
            };

            navigation.navigate("MeditationScreen", propsToPass);
            setLoadingClicked(false);
          }
        }, 150);
      }
      // Generate new meditation
      else {
        generateNewMeditation(
          user,
          meditationQuestionsJson,
          meditationQuestionsJson[meditationTypeQuestionIndex].Answer,
          number,
          setLoadingClicked,
          meditationPreferences
        );
      }
    }
  };

  const onPrevButtonPress = () => {
    if (loadingClicked) {
      return;
    }
    if (currentQuestionIndex == 2) {
      setIsTextBoxFocused(false);
    }

    if (isLastModal) {
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsLastModal(false);
      }, 150);
    } else if (currentQuestionIndex > 0) {
      setLoadingClicked(true);
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCurrentQuestionIndex((index) => index - 1);
      }, 150);
    }
  };

  const RenderLastModalLottie = () => {
    const ref = useRef(null);

    useEffect(() => {
      setTimeout(() => ref.current?.play());

      return () => {
        ref.current?.reset();
      };
    }, []);

    return (
      <View
        style={[
          styles.textBoxContainer,
          {
            justifyContent: "center",
          },
        ]}
      >
        <Lottie
          source={meditationLotties[createMeditationLottieIndex].lottie}
          style={{
            position: "relative",
            zIndex: 1,
            resizeMode: "cover",
          }}
          autoPlay
          loop
          speed={meditationLotties[createMeditationLottieIndex].speed}
          ref={ref}
        ></Lottie>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bodyBackColor,
        paddingTop: 0,
      }}
    >
      <StatusBar translucent={false} backgroundColor={Colors.bodyBackColor} />

      {isTextBoxFocused ? null : topBar()}
      <TouchableWithoutFeedback onPress={handlePressOutsideTextBox}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {isTextBoxFocused ? (
            <Text
              style={{
                ...Fonts.whiteColor20SemiBold,
                textAlign: "center",
                paddingHorizontal: 4,
              }}
            >
              {isLastModal ? "Let's Meditate!" : meditationQuestion}
            </Text>
          ) : (
            <Text
              style={{
                ...Fonts.whiteColor22SemiBold,
                fontSize: 21,
                marginBottom: 8,
                paddingHorizontal: 4,
                textAlign: "center",
              }}
            >
              {isLastModal
                ? readOnly
                  ? "Begin Your Meditation!"
                  : "Create Your Meditation!"
                : meditationQuestion}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "transparent" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {isLastModal == false ? (
          currentQuestionIndex == 0 ? (
            // Emotions buttons
            <View style={[styles.textBoxContainer]}>
              <FlatList
                ref={flatListRef}
                data={initButtons}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
              />
            </View>
          ) : currentQuestionIndex == 1 ? (
            <View style={[styles.meditationBoxContainer]}>
              <FlatList
                ref={flatListRef}
                data={initMeditationTypeButtons}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
              />
            </View>
          ) : (
            // Text box
            <View style={[styles.textBoxContainer]}>
              <TextInput
                style={[
                  styles.textBoxStyle,
                  readOnly
                    ? {
                        backgroundColor: Colors.goldColor,
                        color: Colors.bodyBackColor,
                        fontWeight: "bold",
                      }
                    : {},
                ]}
                multiline={true}
                underlineColorAndroid="transparent"
                onFocus={handleTextBoxFocus}
                onBlur={handleTextBoxBlur}
                onChangeText={handleTextChange}
                editable={readOnly ? false : true}
                value={meditationAnswer}
              ></TextInput>
              <View style={styles.counterContainer}>
                <Text
                  style={[
                    styles.counterText,
                    tooManyChars || noteEnoughChars
                      ? { color: Colors.errorColor }
                      : {},
                  ]}
                >
                  {charCount}/{maxChars}
                </Text>
              </View>
            </View>
          )
        ) : (
          // Last modal
          <RenderLastModalLottie />
        )}
        {/*Prev Next buttons*/}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 2,
            marginBottom: 5,
            backgroundColor: "transparent",
          }}
        >
          {isLastModal ? (
            <>
              <AwesomeButton
                onPressIn={onPrevButtonPress}
                key={0}
                style={[
                  styles.loginButtonStyle,
                  currentQuestionIndex == 0
                    ? { display: "none" }
                    : { display: "flex" },
                ]}
                backgroundColor="#ffc802"
                raiseLevel={3}
                width={width * 0.2}
                borderRadius={20}
                height={(width * 45) / 414 > 60 ? 60 : (width * 45) / 414}
                backgroundDarker="#e7a60b"
                backgroundShadow="#e7a60b"
              >
                <FontAwesome
                  name="chevron-left"
                  color={Colors.whiteColor}
                  size={20}
                />
              </AwesomeButton>
              <AwesomeButton
                key={1}
                onPressIn={onNextButtonPress}
                style={styles.loginButtonStyle}
                backgroundColor={Colors.goldColor}
                raiseLevel={3}
                width={width * 0.6}
                borderRadius={20}
                height={(width * 45) / 414 > 60 ? 60 : (width * 45) / 414}
                backgroundDarker={Colors.secondaryGoldColor}
                backgroundShadow={Colors.secondaryGoldColor}
              >
                <>
                  <Text
                    style={{
                      ...Fonts.whiteColor20Bold,
                      textAlign: "center",
                      color: Colors.bodyBackColor,
                      marginRight: 5,
                    }}
                  >
                    Let's Meditate!
                  </Text>
                  <View>
                    <Image
                      source={require("../../assets/images/icons/gem.png")}
                      style={{
                        position: "relative",
                        top: 2,
                        width:
                          (20.0 * width) / 414 > 30 ? 30 : (20.0 * width) / 414,
                        height:
                          (20.0 * width) / 414 > 30 ? 30 : (20.0 * width) / 414,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                </>
              </AwesomeButton>
            </>
          ) : (
            <>
              <AwesomeButton
                key={3}
                onPressIn={onPrevButtonPress}
                style={[
                  styles.loginButtonStyle,
                  currentQuestionIndex == 0
                    ? { display: "none" }
                    : { display: "flex" },
                ]}
                backgroundColor="#ffc802"
                raiseLevel={3}
                width={width * 0.4}
                borderRadius={20}
                height={(width * 45) / 414 > 60 ? 60 : (width * 45) / 414}
                backgroundDarker="#e7a60b"
                backgroundShadow="#e7a60b"
              >
                <FontAwesome
                  name="chevron-left"
                  color={Colors.whiteColor}
                  size={20}
                />
              </AwesomeButton>
              <AwesomeButton
                key={4}
                onPressIn={onNextButtonPress}
                style={styles.loginButtonStyle}
                backgroundColor={
                  tooManyChars || noteEnoughChars ? "#bababa" : "#ffc802"
                }
                raiseLevel={3}
                width={width * 0.4}
                borderRadius={20}
                height={(width * 45) / 414 > 60 ? 60 : (width * 45) / 414}
                backgroundDarker={
                  tooManyChars || noteEnoughChars ? "#dbdee8" : "#e7a60b"
                }
                backgroundShadow={
                  tooManyChars || noteEnoughChars ? "#dcdfe7" : "#e7a60b"
                }
                disabled={tooManyChars || noteEnoughChars}
              >
                <FontAwesome
                  name="chevron-right"
                  color={Colors.whiteColor}
                  size={20}
                />
              </AwesomeButton>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  function topBar() {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 6,
        }}
      >
        <View style={{ ...styles.backArrowWrapStyle }}>
          <MaterialIcons
            name="close"
            color={Colors.goldColor}
            size={26}
            onPress={() => navigation.pop()}
          />
        </View>
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginRight: Sizes.fixPadding * 1.8,
          }}
        >
          <ProgressBar
            progress={progress}
            animationType="timing"
            color="#98eab7"
            borderColor="#3a4754"
            unfilledColor="#30404c"
            width={null}
            height={18}
            borderWidth={3}
            borderRadius={8}
          ></ProgressBar>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loginButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
  },

  textBoxContainer: {
    marginHorizontal: 10,
    flexGrow: 1,
    flexDirection: "column",
    height: 200,
  },
  multipleChoiceButtonContainer: {
    flex: 1,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  meditationBoxContainer: {
    marginHorizontal: 10,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: 200,
  },
  meditationChoiceButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textBoxStyle: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: Sizes.fixPadding,
    textAlignVertical: "top",
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: 20,
    padding: 15,
    paddingTop: 15,
    marginHorizontal: 10,
  },
  multipleChoiceButtonImage: {
    flex: 1,
  },
  backArrowWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    zIndex: 5,
  },
  counterContainer: {
    position: "absolute",
    bottom: 10,
    right: 15,
    padding: 5,
    borderRadius: 5,
  },
  counterText: {
    fontSize: 12,
    color: "black",
  },
});

export default MeditationQuestionModal;
