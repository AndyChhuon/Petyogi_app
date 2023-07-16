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
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import { Bar as ProgressBar } from "react-native-progress";

const StartMeditation = ({ navigation }) => {
  const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);

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
              How are you feeling?
            </Text>
          ) : (
            <Text style={{ ...Fonts.whiteColor22SemiBold, marginBottom: 6 }}>
              How are you feeling?
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {textBox()}
        {nextPrevButtons()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  function textBox() {
    return (
      <TextInput
        style={styles.textBoxStyle}
        multiline={true}
        underlineColorAndroid="transparent"
        onFocus={handleTextBoxFocus}
        onBlur={handleTextBoxBlur}
      ></TextInput>
    );
  }

  function nextPrevButtons() {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        <AwesomeButton
          activeOpacity={0.9}
          onPress={async (next) => {
            next();
          }}
          style={styles.loginButtonStyle}
          backgroundColor="#ffc802"
          raiseLevel={3}
          width={width * 0.4}
          borderRadius={20}
          height={(width * 45) / 414}
          backgroundDarker="#e7a60b"
          backgroundShadow="#e7a60b"
          progress
        >
          <FontAwesome
            name="chevron-left"
            color={Colors.whiteColor}
            size={20}
            onPress={() => navigation.pop()}
          />
        </AwesomeButton>
        <AwesomeButton
          activeOpacity={0.9}
          onPress={async (next) => {
            next();
          }}
          style={styles.loginButtonStyle}
          backgroundColor="#ffc802"
          raiseLevel={3}
          width={width * 0.4}
          borderRadius={20}
          height={(width * 45) / 414}
          backgroundDarker="#e7a60b"
          backgroundShadow="#e7a60b"
          progress
        >
          <FontAwesome
            name="chevron-right"
            color={Colors.whiteColor}
            size={20}
            onPress={() => navigation.pop()}
          />
        </AwesomeButton>
      </View>
    );
  }

  function backArrow() {
    return (
      <View style={{ ...styles.backArrowWrapStyle }}>
        <FontAwesome
          name="chevron-left"
          color={Colors.whiteColor}
          size={26}
          onPress={() => navigation.pop()}
        />
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
            marginRight: Sizes.fixPadding * 2.0,
          }}
        >
          <ProgressBar
            progress={0.3}
            color="#93d335"
            unfilledColor="rgba(255,255,255,0.05)"
            width={null}
            height={18}
            borderWidth={0}
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

  textBoxStyle: {
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "white",
    marginBottom: Sizes.fixPadding,
    textAlignVertical: "top",
    Horizontal: Sizes.fixPadding,
    borderRadius: 20,
    padding: 15,
    paddingTop: 15,
    marginHorizontal: 10,
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
});

export default StartMeditation;
