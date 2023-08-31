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

const MeditationQuestionModal = ({ navigation, route }) => {
  const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);
  const [isLastModal, setIsLastModal] = useState(false);
  const [createMeditationLottieIndex, setCreateMeditationLottieIndex] =
    useState(0);
  const { generateNewMeditation } = useAuth();

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

  const meditationQuestion = Object.keys(meditationQuestionsJson)[
    currentQuestionIndex
  ];
  const meditationAnswer = Object.values(meditationQuestionsJson)[
    currentQuestionIndex
  ];
  const progress =
    (currentQuestionIndex + 1) / Object.keys(meditationQuestionsJson).length;

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
    setMeditationQuestionsJson({
      ...meditationQuestionsJson,
      [meditationQuestion]: inputText,
    });
  };

  const charCount = meditationAnswer.length;
  const maxChars = 600;
  const tooManyChars = charCount > maxChars;
  const noteEnoughChars = charCount < 1;

  useEffect(() => {
    setLoadingClicked(false);
  }, [currentQuestionIndex, isLastModal]);

  useEffect(() => {
    setCreateMeditationLottieIndex(
      Math.floor(Math.random() * meditationLotties.length)
    );
  }, []);

  const onButtonPress = (text, isChosen) => {
    if (isChosen) {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const chosenButtons = meditationQuestionsJson[meditationQuestion];

        return {
          ...meditationQuestionsJson,
          [meditationQuestion]: chosenButtons.filter(
            (button) => button !== text
          ),
        };
      });
    } else {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const chosenButtons = meditationQuestionsJson[meditationQuestion];

        return {
          ...meditationQuestionsJson,
          [meditationQuestion]: [...chosenButtons, text],
        };
      });
    }
  };

  const onMeditateButtonPress = (text, isChosen, meditationQuestion) => {
    if (isChosen) {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const firstQuestion = Object.keys(meditationQuestionsJson)[0];
        const firstAnswer = Object.values(meditationQuestionsJson)[0];

        return {
          [firstQuestion]: firstAnswer,
          [meditationQuestion]: "",
          ...meditationQuestionsByType[text],
        };
      });
    } else {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const firstQuestion = Object.keys(meditationQuestionsJson)[0];
        const firstAnswer = Object.values(meditationQuestionsJson)[0];
        return {
          [firstQuestion]: firstAnswer,
          [meditationQuestion]: text,
          ...meditationQuestionsByType[text],
        };
      });
    }
  };

  const RenderMeditationButtons = ({ item, isChosen, meditationQuestion }) => {
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
              onMeditateButtonPress(item.text, isChosen, meditationQuestion);
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
            { color: "white", fontSize: 16, marginTop: 4 },
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
              onButtonPress(item.text, isChosen);
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
          initIsChosen={meditationQuestionsJson[meditationQuestion].includes(
            item.text
          )}
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
          isChosen={meditationQuestionsJson[meditationQuestion] === item.text}
          meditationQuestion={meditationQuestion}
        />
      );
    }, [
      meditationQuestionsJson[meditationQuestion] === item.text,
      meditationQuestion,
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
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCurrentQuestionIndex((index) => index + 1);
      }, 150);
    } else if (!isLastModal) {
      setLoadingClicked(true);
      setIsTextBoxFocused(false);
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
            };

            navigation.navigate("MeditationScreen", propsToPass);
            setLoadingClicked(false);
          }
        }, 150);
      }
      // Generate new meditation
      else {
        generateNewMeditation(
          meditationQuestionsJson,
          Object.values(meditationQuestionsJson)[1],
          number,
          setLoadingClicked
        );
      }
    }
  };

  const onPrevButtonPress = () => {
    if (loadingClicked) {
      return;
    }
    if (currentQuestionIndex == 1) {
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
              }}
            >
              {isLastModal ? "Let's Meditate!" : meditationQuestion}
            </Text>
          ) : (
            <Text
              style={{
                ...Fonts.whiteColor22SemiBold,
                marginBottom: 8,
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
                data={initButtons}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
              />
            </View>
          ) : currentQuestionIndex == 1 ? (
            <View style={[styles.meditationBoxContainer]}>
              <FlatList
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
            height: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 2,
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
                height={(width * 45) / 414}
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
                height={(width * 45) / 414}
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
                        width: (20.0 * width) / 414,
                        height: (20.0 * width) / 414,
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
                height={(width * 45) / 414}
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
                height={(width * 45) / 414}
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
