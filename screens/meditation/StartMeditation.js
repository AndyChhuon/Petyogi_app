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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import { useHeaderHeight } from "@react-navigation/elements";

const StartMeditation = ({ navigation }) => {
  const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);

  const handleTextBoxFocus = () => {
    setIsTextBoxFocused(true);
  };

  const handleTextBoxBlur = () => {
    setIsTextBoxFocused(false);
  };

  const handlePressOutsideTextBox = () => {
    console.log("handlePressOutsideTextBox");
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
      <View>{isTextBoxFocused ? null : loginTitle()}</View>
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
        style={{ flex: 1, marginBottom: Platform.OS === "ios" ? 0 : 5 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {textBox()}
        {loginButton()}
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

  function loginButton() {
    return (
      <AwesomeButton
        activeOpacity={0.9}
        onPress={async (next) => {
          next();
        }}
        style={styles.loginButtonStyle}
        width="auto"
        backgroundColor={Colors.secondaryGoldColor}
        raiseLevel={3}
        borderRadius={20}
        height={(width * 50) / 414}
        backgroundShadow={Colors.grayColor}
        progress
      >
        <Text
          style={{
            ...Fonts.whiteColor18SemiBold,
            width: "100%",
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </AwesomeButton>
    );
  }

  function backArrow() {
    return (
      <View style={{ ...styles.backArrowWrapStyle }}>
        <MaterialIcons
          name="chevron-left"
          color={Colors.whiteColor}
          size={26}
          onPress={() => navigation.pop()}
        />
      </View>
    );
  }

  function loginTitle() {
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
        <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Text style={{ ...Fonts.whiteColor26SemiBold }}>
            Let’s sign you in.
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loginButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
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
    marginHorizontal: Sizes.fixPadding * 2.0,
    zIndex: 5,
  },
});

export default StartMeditation;
