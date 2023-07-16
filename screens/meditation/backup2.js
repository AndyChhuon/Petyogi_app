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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bodyBackColor,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View>
        {isTextBoxFocused ? null : backArrow()}

        {isTextBoxFocused ? null : loginTitle()}
      </View>
      <View style={{ flex: 1 }}>
        <Text>Hello</Text>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {textBox()}
          {loginButton()}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );

  function textBox() {
    return (
      <TextInput
        style={{
          flexGrow: 1,
          flexDirection: "column",
          backgroundColor: "white",
          marginBottom: Sizes.fixPadding,
          textAlignVertical: "top",
        }}
        multiline={true}
        underlineColorAndroid="transparent"
        autoCompleteType="off"
        keyboardType="visible-password"
        textContentType="password"
        autoCorrect={false}
        spellCheck={false}
        onFocus={handleTextBoxFocus}
        onBlur={handleTextBoxBlur}
      ></TextInput>
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
        raiseLevel={5}
        borderRadius={20}
        backgroundShadow={Colors.grayColor}
        progress
      >
        <Text
          style={{
            ...Fonts.whiteColor20SemiBold,
            width: "100%",
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </AwesomeButton>
    );
  }

  function loginTitle() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 4.0,
          alignItems: "center",
          zIndex: 1,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>
          Let’s sign you in.
        </Text>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Welcome Back. You’ve been missed!
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "center",
    backgroundColor: "red",
    height: "100%",
  },
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  forgetPasswordTextStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    textAlign: "right",
    textDecorationLine: "underline",
    ...Fonts.primaryColor14Medium,
  },
  loginButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  googleAndFacebookButtonWrapStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrowWrapStyle: {
    position: "absolute",
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 3.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    zIndex: 2,
  },
});

export default StartMeditation;
