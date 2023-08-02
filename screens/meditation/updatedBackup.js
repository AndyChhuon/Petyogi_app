import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import { Bar as ProgressBar } from "react-native-progress";
import * as Haptics from "expo-haptics";
import Lottie from "lottie-react-native";
import { set } from "firebase/database";

const MeditationQuestionModal = ({ navigation, route }) => {
  const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);

  const { initMeditationQuestionsJson, readOnly } = route.params;

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

  const { width } = Dimensions.get("window");

  const handleTextChange = (inputText) => {
    setMeditationQuestionsJson({
      ...meditationQuestionsJson,
      [meditationQuestion]: inputText,
    });
  };

  const charCount = meditationAnswer.length;
  const maxChars = 600;
  const tooManyChars = charCount > maxChars;

  useEffect(() => {
    setLoadingClicked(false);
  }, [currentQuestionIndex]);

  const multipleChoiceButtons = [
    {
      id: "1",
      text: "Happy",
      lottie: require("../../assets/emotions/happy_lottie.json"),
    },
    {
      id: "2",
      text: "Sad",
      lottie: require("../../assets/emotions/sad_lottie.json"),
    },
    {
      id: "3",
      text: "Angry",
      lottie: require("../../assets/emotions/angry_lottie.json"),
    },
    {
      id: "4",
      text: "Confident",
      lottie: require("../../assets/emotions/confident_lottie.json"),
    },
    {
      id: "5",
      text: "Fearful",
      lottie: require("../../assets/emotions/fearful_lottie.json"),
    },
    {
      id: "6",
      text: "Disappointed",
      lottie: require("../../assets/emotions/disappointed_lottie.json"),
    },

    {
      id: "8",
      text: "Hopeful",
      lottie: require("../../assets/emotions/hopeful_lottie.json"),
    },
    {
      id: "9",
      text: "Tired",
      lottie: require("../../assets/emotions/tired_lottie.json"),
    },
    {
      id: "10",
      text: "Anxious",
      lottie: require("../../assets/emotions/anxious_lottie.json"),
    },
    {
      id: "7",
      text: "Love",
      lottie: require("../../assets/emotions/in_love_lottie.json"),
    },

    {
      id: "12",
      text: "Anhedonic",
      lottie: require("../../assets/emotions/depressed_lottie.json"),
    },
    {
      id: "13",
      text: "Exasperated",
      lottie: require("../../assets/emotions/exasperated_lottie.json"),
    },
    {
      id: "11",
      text: "Bored",
      lottie: require("../../assets/emotions/bored_lottie.json"),
      scale: 0.96,
    },
  ];

  const chosenButtons = meditationQuestionsJson[meditationQuestion];
  console.log(chosenButtons);
  const onButtonPress = (text) => {
    if (chosenButtons.includes(text)) {
      setMeditationQuestionsJson({
        ...meditationQuestionsJson,
        [meditationQuestion]: chosenButtons.filter((button) => button !== text),
      });
    } else {
      setMeditationQuestionsJson({
        ...meditationQuestionsJson,
        [meditationQuestion]: [...chosenButtons, text],
      });
    }
  };

  const RenderMultipleChoiceButtons = ({ item }) => {
    const [isChosen, setIsChosen] = useState(false);
    const lottieRef = useRef(null);

    useEffect(() => {
      if (isChosen) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }, [isChosen]);

    console.log(isChosen);
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
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setIsChosen(!isChosen);
            onButtonPress(item.text);
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
            speed={0.8}
            autoPlay
            loop
          ></Lottie>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              display: isChosen ? "flex" : "none",
              zIndex: 2,
              backgroundColor: Colors.goldColor,
              opacity: 0.5,
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
    return multipleChoiceButtons.map((item) => {
      return <RenderMultipleChoiceButtons item={item} key={item.id} />;
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bodyBackColor,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
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
              }}
            >
              {meditationQuestion}
            </Text>
          ) : (
            <Text style={{ ...Fonts.whiteColor22SemiBold, marginBottom: 6 }}>
              {meditationQuestion}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "transparent" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View
          style={[
            styles.textBoxContainer,
            currentQuestionIndex != 0 ? { display: "none" } : {},
          ]}
        >
          {initButtons}
        </View>
        {nextPrevButtons()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  function textBox() {
    return (
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
              tooManyChars ? { color: Colors.errorColor } : {},
            ]}
          >
            {charCount}/{maxChars}
          </Text>
        </View>
      </View>
    );
  }

  function multipleChoice() {
    const multipleChoiceButtons = [
      {
        id: "1",
        text: "Happy",
        lottie: require("../../assets/emotions/happy_lottie.json"),
      },
      {
        id: "2",
        text: "Sad",
        lottie: require("../../assets/emotions/sad_lottie.json"),
      },
      {
        id: "3",
        text: "Angry",
        lottie: require("../../assets/emotions/angry_lottie.json"),
      },
      {
        id: "4",
        text: "Confident",
        lottie: require("../../assets/emotions/confident_lottie.json"),
      },
      {
        id: "5",
        text: "Fearful",
        lottie: require("../../assets/emotions/fearful_lottie.json"),
      },
      {
        id: "6",
        text: "Disappointed",
        lottie: require("../../assets/emotions/disappointed_lottie.json"),
      },

      {
        id: "8",
        text: "Hopeful",
        lottie: require("../../assets/emotions/hopeful_lottie.json"),
      },
      {
        id: "9",
        text: "Tired",
        lottie: require("../../assets/emotions/tired_lottie.json"),
      },
      {
        id: "10",
        text: "Anxious",
        lottie: require("../../assets/emotions/anxious_lottie.json"),
      },
      {
        id: "7",
        text: "Love",
        lottie: require("../../assets/emotions/in_love_lottie.json"),
      },

      {
        id: "12",
        text: "Anhedonic",
        lottie: require("../../assets/emotions/depressed_lottie.json"),
      },
      {
        id: "13",
        text: "Exasperated",
        lottie: require("../../assets/emotions/exasperated_lottie.json"),
      },
      {
        id: "11",
        text: "Bored",
        lottie: require("../../assets/emotions/bored_lottie.json"),
        scale: 0.96,
      },
    ];

    const chosenButtons = meditationQuestionsJson[meditationQuestion];

    const onButtonPress = (text) => {
      if (chosenButtons.includes(text)) {
        setMeditationQuestionsJson({
          ...meditationQuestionsJson,
          [meditationQuestion]: chosenButtons.filter(
            (button) => button !== text
          ),
        });
      } else {
        setMeditationQuestionsJson({
          ...meditationQuestionsJson,
          [meditationQuestion]: [...chosenButtons, text],
        });
      }
    };

    const RenderMultipleChoiceButtons = ({ item, isChosen }) => {
      console.log(isChosen);
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
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onButtonPress(item.text);
            }}
          >
            <Lottie
              source={item.lottie}
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
              speed={isChosen ? 0.8 : 0}
              autoPlay
              loop
            ></Lottie>
            {isChosen ? (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  zIndex: 2,
                  backgroundColor: Colors.goldColor,
                  opacity: 0.5,
                }}
              />
            ) : null}
          </AwesomeButton>
          <Text
            style={[
              Fonts.musicMeditationText,
              { color: "white", fontSize: 14 },
            ]}
          >
            {item.text}
          </Text>
        </View>
      );
    };

    return (
      <View
        style={[
          styles.textBoxContainer,
          currentQuestionIndex != 0 ? { display: "none" } : {},
        ]}
      >
        <FlatList
          horizontal={false}
          style={[styles.flatListMenuStyle]}
          data={multipleChoiceButtons}
          renderItem={({ item }) => (
            <RenderMultipleChoiceButtons
              item={item}
              isChosen={chosenButtons.includes(item.text)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    );
  }

  function nextPrevButtons() {
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
        }, 250);
      }
    };

    const onPrevButtonPress = () => {
      if (loadingClicked) {
        return;
      }
      if (currentQuestionIndex == 1) {
        setIsTextBoxFocused(false);
      }
      if (currentQuestionIndex > 0) {
        setLoadingClicked(true);
        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCurrentQuestionIndex((index) => index - 1);
        }, 250);
      }
    };

    return (
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
        <AwesomeButton
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
          onPressIn={onNextButtonPress}
          style={styles.loginButtonStyle}
          backgroundColor={tooManyChars ? "#bababa" : "#ffc802"}
          raiseLevel={3}
          width={width * 0.4}
          borderRadius={20}
          height={(width * 45) / 414}
          backgroundDarker={tooManyChars ? "#dbdee8" : "#e7a60b"}
          backgroundShadow={tooManyChars ? "#dcdfe7" : "#e7a60b"}
          disabled={tooManyChars}
        >
          <FontAwesome
            name="chevron-right"
            color={Colors.whiteColor}
            size={20}
          />
        </AwesomeButton>
      </View>
    );
  }

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
