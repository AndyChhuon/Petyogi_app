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
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
  multipleChoiceButtons,
  meditationTypeButtons,
  meditationLotties,
  prerecordedPhrases,
  prerecordedUrls,
} from "../../constants/constants";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import { Bar as ProgressBar } from "react-native-progress";
import * as Haptics from "expo-haptics";
import Lottie from "lottie-react-native";
import useAuth from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SlideInFromBottom from "../../Animations/SlideFromBottom";

const MeditationQuestionModal = ({ navigation, route }) => {
  const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);
  const [isLastModal, setIsLastModal] = useState(false);
  const [createMeditationLottieIndex, setCreateMeditationLottieIndex] =
    useState(0);
  const {
    generateNewMeditation,
    user,
    userValues,
    questionsAreGenerating,
    generateMeditationQuestions,
  } = useAuth();

  const {
    initMeditationQuestionsJson,
    readOnly,
    phrases,
    meditationUrls,
    finishedGenerating,
    number,
    asyncStoredMeditationJson,
    promptIndexes,
  } = route.params;

  const [loadingClicked, setLoadingClicked] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [meditationQuestionsJson, setMeditationQuestionsJson] = useState(
    JSON.parse(JSON.stringify(initMeditationQuestionsJson))
  );
  const [meditationPreferences, setMeditationPreferences] = useState({});
  const [displayGenerateQuestionModal, setDisplayGenerateQuestionModal] =
    useState(false);
  const [
    updatedAsyncStoredMeditationJson,
    setUpdatedAsyncStoredMeditationJson,
  ] = useState(asyncStoredMeditationJson ? asyncStoredMeditationJson : {});

  const [hasShownScroll, setHasShownScroll] = useState({});

  useEffect(() => {
    let timeoutId;
    if (
      flatListRef?.current &&
      (currentQuestionIndex <= 1 || isDisplayQuestionPrompts) &&
      !readOnly &&
      !hasShownScroll[currentQuestionIndex]
    ) {
      setHasShownScroll((hasShownScroll) => {
        return {
          ...hasShownScroll,
          [currentQuestionIndex]: true,
        };
      });
      timeoutId = setTimeout(() => {
        flatListRef?.current?.scrollToEnd({ animated: true });
      }, 700);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentQuestionIndex]);

  const flatListRef = useRef();
  const meditationQuestion =
    meditationQuestionsJson[currentQuestionIndex]?.Question;

  const meditationAnswer = meditationQuestionsJson[currentQuestionIndex].Answer;
  const progress =
    (currentQuestionIndex + 1) / Object.keys(meditationQuestionsJson).length;
  const emotionsQuestionIndex = 0;
  const meditationTypeQuestionIndex = 1;
  const JournalQuestionIndex = 2;
  const JournalSelectionIndex = 3;
  const emotionsQuestion = initMeditationQuestionsJson[2]?.Question;
  const isDisplayQuestionPrompts = currentQuestionIndex == 3 && !readOnly;

  function getRandomIndexFromArray(arr) {
    if (arr.length === 0) {
      return null; // Return null if the array is empty
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return randomIndex;
  }

  const randomlyPickIntroAndOutro = (
    introUrlArr,
    introPhraseArr,
    prerecordedType
  ) => {
    // randomly pick intro
    for (const [key, value] of Object.entries(
      prerecordedPhrases[prerecordedType]
    )) {
      const randomIndex = getRandomIndexFromArray(value);
      introPhraseArr.push(value[randomIndex]);
      introUrlArr.push(prerecordedUrls[prerecordedType][key][randomIndex]);
    }
  };

  const updateAsyncStoredMeditationJson = async (question, answer) => {
    try {
      AsyncStorage.setItem(
        "AsyncStoredMeditationJson",
        JSON.stringify({
          ...updatedAsyncStoredMeditationJson,
          [question]: answer,
        })
      );
    } catch (e) {}
    setUpdatedAsyncStoredMeditationJson((updatedAsyncStoredMeditationJson) => {
      return {
        ...updatedAsyncStoredMeditationJson,
        [question]: answer,
      };
    });
  };

  useEffect(() => {
    if (!readOnly && asyncStoredMeditationJson) {
      const newMeditationQuestionsJson = {};
      const newMeditationQuestionsJsonArray = [];
      count = 0;
      while (count <= JournalSelectionIndex) {
        newMeditationQuestionsJsonArray.push(meditationQuestionsJson[count]);
        count += 1;
      }

      // emotion index
      if (
        meditationQuestionsJson[emotionsQuestionIndex].Question in
        asyncStoredMeditationJson
      ) {
        const emotionsArray =
          asyncStoredMeditationJson[
            meditationQuestionsJson[emotionsQuestionIndex].Question
          ];

        if (
          emotionsArray.length > 0 &&
          !newMeditationQuestionsJsonArray[
            JournalQuestionIndex
          ].Question.endsWith("?")
        ) {
          newMeditationQuestionsJsonArray[JournalQuestionIndex].Question +=
            emotionsArray[0].toLowerCase() + "?";
        }
      }

      // journal question index
      if (
        meditationQuestionsJson[JournalSelectionIndex].Question in
        asyncStoredMeditationJson
      ) {
        // if journal question stored in async, populate with questions
        asyncStoredMeditationJson[
          meditationQuestionsJson[JournalSelectionIndex].Question
        ].forEach((journalQuestion, index) => {
          newMeditationQuestionsJsonArray.push({
            Question: journalQuestion,
            Answer: "",
          });
        });
      }

      // check if each question's answer is in async
      newMeditationQuestionsJsonArray.forEach((item, index) => {
        if (item.Question != "" && item.Question in asyncStoredMeditationJson) {
          newMeditationQuestionsJsonArray[index] = {
            Question: item.Question,
            Answer: asyncStoredMeditationJson[item.Question],
          };
        }
      });

      // newMediationQuestionsJsonArray to json
      newMeditationQuestionsJsonArray.forEach((item, index) => {
        newMeditationQuestionsJson[index] = item;
      });

      setMeditationQuestionsJson(newMeditationQuestionsJson);
    }
  }, [asyncStoredMeditationJson]);

  const handleTextBoxFocus = () => {
    setIsTextBoxFocused(true);
  };

  const handleTextBoxBlur = () => {
    setIsTextBoxFocused(false);
  };

  const handlePressOutsideTextBox = () => {
    Keyboard.dismiss();
  };

  const initDimensions = Dimensions.get("window");
  const [width, setWidth] = useState(initDimensions.width);
  const [height, setHeight] = useState(initDimensions.height);

  useEffect(() => {
    function onChangeDimensions({ window }) {
      const { width, height } = window;
      setWidth(width);
      setHeight(height);
      console.log("width: " + width + " height: " + height);
    }

    const subscription = Dimensions.addEventListener(
      "change",
      onChangeDimensions
    );

    return () => subscription.remove();
  }, [setWidth, setHeight]);

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
  const questionsPromptsGenerated = userValues.questionsPromptsGenerated;

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

  const getSpeedStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("meditationSpeed");

      if (value !== null) {
        // string to json
        setMeditationPreferences((meditationPreferences) => {
          return {
            ...meditationPreferences,
            meditationSpeed: parseFloat(value),
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
    getSpeedStorage();
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

  const onButtonPressJournal = (text, isChosen, currentQuestionIndex) => {
    if (isChosen) {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const meditationJsonToKeep = {};

        let jsonArray = Object.values(meditationQuestionsJson);
        jsonArray[currentQuestionIndex].Answer = jsonArray[
          currentQuestionIndex
        ].Answer.filter((item) => item != text);
        jsonArray = jsonArray.filter((item) => item.Question != text);

        count = 0;
        // jsonArray to json
        jsonArray.forEach((item) => {
          meditationJsonToKeep[count] = item;
          count += 1;
        });

        return meditationJsonToKeep;
      });
    } else {
      setMeditationQuestionsJson((meditationQuestionsJson) => {
        const chosenQuestions =
          meditationQuestionsJson[currentQuestionIndex].Answer;

        const newChosenQuestions = [...chosenQuestions, text];

        const meditationJsonToKeep = {};

        const jsonArray = Object.values(meditationQuestionsJson);
        jsonArray[currentQuestionIndex].Answer = newChosenQuestions;

        const indexBeforeMeditationQuestion = 3 + chosenQuestions.length + 1;

        jsonArray.splice(indexBeforeMeditationQuestion, 0, {
          Question: text,
          Answer: "",
        });

        count = 0;
        // jsonArray to json
        jsonArray.forEach((item) => {
          meditationJsonToKeep[count] = item;
          count += 1;
        });

        return meditationJsonToKeep;
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
        return {
          ...meditationQuestionsJson,
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
    const text = item.textArr[0];
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
          width={(135 * width) / 414 > 350 ? 350 : (135 * width) / 414}
          backgroundColor="#fcc695"
          height={(125 * width) / 414 > 350 ? 350 : (125 * width) / 414}
          paddingBottom={10}
          paddingHorizontal={5}
          raiseLevel={7}
          borderRadius={8}
          onPressOut={() => {
            if (!readOnly) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onMeditateButtonPress(text, isChosen, currentQuestionIndex);
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
          {text}
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
          width={(100 * width) / 414 > 250 ? 250 : (100 * width) / 414}
          backgroundColor="#fcc695"
          height={(100 * width) / 414 > 250 ? 250 : (100 * width) / 414}
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

  const RenderJournalQuestions = ({ questionString, initIsChosen }) => {
    const [isChosen, setIsChosen] = useState(initIsChosen);
    return (
      <View style={styles.multipleChoiceButtonContainer}>
        <AwesomeButton
          width={0.9 * width}
          backgroundColor={isChosen ? "#213632" : "#121f24"}
          backgroundDarker={isChosen ? "#9fa541" : "#38464f"}
          borderColor={isChosen ? "#9fa541" : "#38464f"}
          borderWidth={3}
          disabled={questionString == "generating..."}
          height={
            questionString.length > 70
              ? questionString.length > 120
                ? questionString.length > 170
                  ? (115 * width) / 414
                  : (100 * width) / 414
                : (85 * width) / 414
              : (70 * width) / 414
          }
          paddingHorizontal={10}
          raiseLevel={4}
          borderRadius={14}
          onPressIn={() => {
            if (!readOnly) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setIsChosen(!isChosen);
              onButtonPressJournal(
                questionString,
                isChosen,
                currentQuestionIndex
              );
            }
          }}
        >
          {questionString != "generating..." && (
            <Text
              style={[
                Fonts.journalPromptQuestions,
                { color: "white", fontSize: 14 },
                questionString.length > 50 ? { fontSize: 13 } : {},
                questionString.length > 70 ? { fontSize: 12 } : {},
              ]}
            >
              {questionString}
            </Text>
          )}
        </AwesomeButton>
      </View>
    );
  };

  const initButtons = multipleChoiceButtons.map((item) => ({
    id: item.id,
    component: React.useMemo(() => {
      return (
        <RenderMultipleChoiceButtons
          item={item}
          key={item.id}
          initIsChosen={meditationQuestionsJson[currentQuestionIndex][
            "Answer"
          ].includes(item.text)}
          currentQuestionIndex={currentQuestionIndex}
        />
      );
    }, [
      currentQuestionIndex,
      meditationQuestionsJson[currentQuestionIndex]["Answer"].includes(
        item.text
      ),
    ]),
  }));

  const initPromptQuestions = React.useMemo(() => {
    if (!questionsPromptsGenerated) return;
    let newQuestionsPromptsGenerated = userValues.questionsPromptsGenerated;
    if (questionsAreGenerating) {
      newQuestionsPromptsGenerated?.push("generating...");
    } else {
      newQuestionsPromptsGenerated = newQuestionsPromptsGenerated?.filter(
        (item) => item != "generating..."
      );
    }
    return newQuestionsPromptsGenerated?.map((questionString, index) => ({
      id: index,
      component: (
        <RenderJournalQuestions
          questionString={questionString}
          key={index}
          initIsChosen={meditationQuestionsJson[currentQuestionIndex][
            "Answer"
          ].includes(questionString)}
          currentQuestionIndex={currentQuestionIndex}
        />
      ),
    }));
  }, [
    currentQuestionIndex,
    userValues.questionsPromptsGenerated,
    questionsAreGenerating,
  ]);

  const initMeditationTypeButtons = meditationTypeButtons.map((item) => ({
    id: item.id,
    component: React.useMemo(() => {
      return (
        <RenderMeditationButtons
          item={item}
          key={item.id}
          isChosen={
            meditationQuestionsJson[currentQuestionIndex]["Answer"] &&
            item.textArr.includes(
              meditationQuestionsJson[currentQuestionIndex]["Answer"]
            )
          }
          currentQuestionIndex={currentQuestionIndex}
        />
      );
    }, [
      item.textArr.includes(
        meditationQuestionsJson[currentQuestionIndex]["Answer"]
      ),
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
    handlePressOutsideTextBox();
    if (
      currentQuestionIndex <
      Object.keys(meditationQuestionsJson).length - 1
    ) {
      if (
        meditationQuestionsJson[currentQuestionIndex].Answer !=
          updatedAsyncStoredMeditationJson[
            meditationQuestionsJson[currentQuestionIndex].Question
          ] &&
        !readOnly
      ) {
        updateAsyncStoredMeditationJson(
          meditationQuestionsJson[currentQuestionIndex].Question,
          meditationQuestionsJson[currentQuestionIndex].Answer
        );
      }
      if (
        currentQuestionIndex == 2 &&
        !readOnly &&
        !questionsPromptsGenerated
      ) {
        setDisplayGenerateQuestionModal(true);
      } else {
        setLoadingClicked(true);
        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCurrentQuestionIndex((index) => index + 1);
        }, 150);
      }
    } else if (!isLastModal) {
      if (
        meditationQuestionsJson[currentQuestionIndex].Answer !=
          updatedAsyncStoredMeditationJson[
            meditationQuestionsJson[currentQuestionIndex].Question
          ] &&
        !readOnly
      ) {
        updateAsyncStoredMeditationJson(
          meditationQuestionsJson[currentQuestionIndex].Question,
          meditationQuestionsJson[currentQuestionIndex].Answer
        );
      }
      setLoadingClicked(true);
      setIsTextBoxFocused(false);
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsLastModal(true);
      }, 150);
    } else {
      setLoadingClicked(true);
      const introUrlArr = [];
      const introPhraseArr = [];
      const outroUrlArr = [];
      const outroPhraseArr = [];
      const conclusionUrlArr = [];
      const conclusionPhraseArr = [];

      randomlyPickIntroAndOutro(introUrlArr, introPhraseArr, "intro");
      randomlyPickIntroAndOutro(outroUrlArr, outroPhraseArr, "outro");
      randomlyPickIntroAndOutro(
        conclusionUrlArr,
        conclusionPhraseArr,
        "conclusion"
      );
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
              initMeditationInfo: {
                phrases: phrases,
                meditationUrls: meditationUrls,
                shouldListenRealTime: false,
                promptIndexes: promptIndexes,
              },
              number: number,
              meditationPreferences: meditationPreferences,
              introUrlArr: introUrlArr,
              introPhraseArr: introPhraseArr,
              outroUrlArr: outroUrlArr,
              outroPhraseArr: outroPhraseArr,
              conclusionUrlArr: conclusionUrlArr,
              conclusionPhraseArr: conclusionPhraseArr,
            };

            navigation.navigate("MeditationScreen", propsToPass);
            setLoadingClicked(false);
          } else {
            //Not done with generation (realtime connection)

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            const propsToPass = {
              initMeditationInfo: {
                phrases: phrases,
                meditationUrls: meditationUrls,
                shouldListenRealTime: true,
                promptIndexes: promptIndexes,
              },

              number: number,
              meditationPreferences: meditationPreferences,
              introUrlArr: introUrlArr,
              introPhraseArr: introPhraseArr,
              outroUrlArr: outroUrlArr,
              outroPhraseArr: outroPhraseArr,
              conclusionUrlArr: conclusionUrlArr,
              conclusionPhraseArr: conclusionPhraseArr,
            };

            navigation.navigate("MeditationScreen", propsToPass);
            setLoadingClicked(false);
          }
        }, 150);
      }
      // Generate new meditation
      else {
        const jsonArray = Object.values(meditationQuestionsJson);

        // remove index JournalSelectionIndex
        jsonArray.splice(JournalSelectionIndex, 1);

        // jsonArray to json
        const newMeditationQuestionsJson = {};
        count = 0;
        jsonArray.forEach((item) => {
          newMeditationQuestionsJson[count] = item;
          count += 1;
        });

        generateNewMeditation(
          user,
          newMeditationQuestionsJson,
          meditationQuestionsJson[meditationTypeQuestionIndex].Answer,
          number,
          setLoadingClicked,
          meditationPreferences,
          {
            introUrlArr: introUrlArr,
            introPhraseArr: introPhraseArr,
            outroUrlArr: outroUrlArr,
            outroPhraseArr: outroPhraseArr,
            conclusionUrlArr: conclusionUrlArr,
            conclusionPhraseArr: conclusionPhraseArr,
          }
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
    handlePressOutsideTextBox();

    if (isLastModal) {
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsLastModal(false);
      }, 150);
    } else if (currentQuestionIndex > 0) {
      if (
        meditationQuestionsJson[currentQuestionIndex].Answer !=
          updatedAsyncStoredMeditationJson[
            meditationQuestionsJson[currentQuestionIndex].Question
          ] &&
        !readOnly
      ) {
        updateAsyncStoredMeditationJson(
          meditationQuestionsJson[currentQuestionIndex].Question,
          meditationQuestionsJson[currentQuestionIndex].Answer
        );
      }
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
            flexShrink: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Lottie
          source={meditationLotties[createMeditationLottieIndex].lottie}
          style={
            //height if landscape, width if portait
            height < width
              ? { height: "100%", aspectRatio: 1 }
              : { width: "100%", aspectRatio: 1 }
          }
          autoPlay
          loop
          speed={meditationLotties[createMeditationLottieIndex].speed}
          ref={ref}
        ></Lottie>
      </View>
    );
  };

  return (
    <>
      <SlideInFromBottom
        show={displayGenerateQuestionModal}
        onOuterClick={() => setDisplayGenerateQuestionModal(false)}
        height={height > 700 ? height * 0.55 : height * 0.6}
      >
        <View style={{ flex: 1.5, alignItems: "center" }}>
          <View
            style={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/tutorialModal/shiba_journaling.png")}
              style={{
                width: (height * 0.55 * 1.5) / 1.6 / 2.5,
                height: (height * 0.55 * 1.5) / 1.6 / 2.5,
                marginVertical: 10,
                borderRadius: 20,
                resizeMode: "contain",
                borderColor: Colors.bodyBackColor,
                borderWidth: 2,
              }}
            />
          </View>
          <Text
            width={width * 0.9}
            style={[Fonts.generateQuestionsTitle, { textAlign: "center" }]}
          >
            Ready to get started?
          </Text>
          <Text
            width={width * 0.9}
            style={[Fonts.generateQuestionsSubtitle, { textAlign: "center" }]}
          >
            Personalized prompts will be generated based on what you've just
            written.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AwesomeButton
              paddingHorizontal={2}
              width={width * 0.9}
              height={50}
              backgroundColor="#ffffff"
              backgroundDarker="#4589cf"
              backgroundShadow="#365f89"
              raiseLevel={3}
              borderWidth={1}
              borderColor="#719cc9"
              borderRadius={8}
              onPressIn={() => {
                if (!questionsPromptsGenerated) {
                  // generate questions
                  generateMeditationQuestions(
                    meditationQuestionsJson[JournalQuestionIndex].Answer
                  );
                }
                setTimeout(() => {
                  setDisplayGenerateQuestionModal(false);
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  );
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCurrentQuestionIndex((index) => index + 1);
                }, 150);
              }}
            >
              <View>
                <Text style={Fonts.generateQuestionsText}>
                  Generate Questions
                </Text>
              </View>
            </AwesomeButton>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => setDisplayGenerateQuestionModal(false)}
          >
            <Text style={Fonts.generateQuestionsCancelText}>
              Keep Journaling
            </Text>
          </TouchableOpacity>
        </View>
      </SlideInFromBottom>
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
                style={[
                  {
                    ...Fonts.whiteColor20SemiBold,
                    textAlign: "center",
                    paddingHorizontal: 4,
                  },
                  meditationQuestion.length > 50 && !isDisplayQuestionPrompts
                    ? { fontSize: 17 }
                    : {},
                ]}
              >
                {isLastModal ? "Let's Meditate!" : meditationQuestion}
              </Text>
            ) : (
              <Text
                style={[
                  {
                    ...Fonts.whiteColor22SemiBold,
                    fontSize: 21,
                    marginBottom: 8,
                    paddingHorizontal: 4,
                    textAlign: "center",
                  },
                  meditationQuestion.length > 50 ? { fontSize: 18.5 } : {},
                ]}
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
            ) : isDisplayQuestionPrompts ? (
              <View style={[styles.meditationBoxContainer]}>
                <FlatList
                  ref={flatListRef}
                  data={initPromptQuestions}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                  numColumns={1}
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
                            (20.0 * width) / 414 > 30
                              ? 30
                              : (20.0 * width) / 414,
                          height:
                            (20.0 * width) / 414 > 30
                              ? 30
                              : (20.0 * width) / 414,
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
                  backgroundColor={
                    isDisplayQuestionPrompts && !questionsPromptsGenerated
                      ? "#bababa"
                      : "#ffc802"
                  }
                  raiseLevel={3}
                  width={width * 0.4}
                  borderRadius={20}
                  height={(width * 45) / 414 > 60 ? 60 : (width * 45) / 414}
                  backgroundDarker={
                    isDisplayQuestionPrompts && !questionsPromptsGenerated
                      ? "#dbdee8"
                      : "#e7a60b"
                  }
                  backgroundShadow={
                    isDisplayQuestionPrompts && !questionsPromptsGenerated
                      ? "#dcdfe7"
                      : "#e7a60b"
                  }
                  disabled={
                    isDisplayQuestionPrompts && !questionsPromptsGenerated
                  }
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
    </>
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
    width: 35.0,
    height: 35.0,
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
