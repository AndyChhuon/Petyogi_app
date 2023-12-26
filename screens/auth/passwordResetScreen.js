import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import * as Haptics from "expo-haptics";

const PasswordResetScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [sent, setSent] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wasPopped, setWasPopped] = useState(false);

  const { width } = Dimensions.get("window");
  const styles = createStyles(width);

  const { passwordReset } = useAuth();

  useEffect(() => {
    if (error) {
      switch (error) {
        case "auth/invalid-email":
          setEmailError("The email address you entered is invalid.");
          break;
        case "auth/user-not-found":
          setEmailError("The user with the given email address was not found.");
          break;
        case "auth/too-many-requests":
          setErrorMsg(
            "Too many password reset requests. Please try again later."
          );
          break;
        default:
          setErrorMsg("The following error has occured: " + error);
      }
    }
  }, [error]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
      <View style={{ flex: 1 }}>
        {backArrow()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {passwordResetInfo()}
          {userEmailTextField()}
          {resendInfo()}
          {verifyButton()}
          {errorMsg ? errorDialog() : ""}
          {successMsg ? successDialog() : ""}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function backArrow() {
    return (
      <View style={{ ...styles.backArrowWrapStyle }}>
        <MaterialIcons
          name="chevron-left"
          color={Colors.whiteColor}
          size={26}
          onPress={() => {
            if (wasPopped) return;
            setWasPopped(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.pop();
          }}
        />
      </View>
    );
  }

  function verifyEmail(setLoadingOrSent) {
    setError(null);
    setErrorMsg(null);
    setSuccessMsg(null);
    setEmailError(null);

    if (!userEmail) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (
      !userEmail.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)
    ) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setLoadingOrSent(true);

    setSuccessMsg("Sending verification email...");

    passwordReset(
      setError,
      setLoadingOrSent,
      setSuccessMsg,
      setLoading,
      userEmail
    );
  }

  function verifyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (sent) {
            navigation.push("Login");
          } else {
            verifyEmail(setSent);
          }
        }}
        style={
          sent
            ? { ...styles.verifyButtonStyle, backgroundColor: Colors.grayColor }
            : styles.verifyButtonStyle
        }
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
          {sent ? "Login" : "Send"}
        </Text>
      </TouchableOpacity>
    );
  }

  function resendInfo() {
    return (
      <Text style={{ marginTop: Sizes.fixPadding * 2.0, textAlign: "center" }}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Didn’t receive any code? {}
        </Text>
        <Text
          style={{
            ...Fonts.primaryColor14Medium,
            textDecorationLine: "underline",
          }}
          onPress={() => {
            if (loading) {
            } else {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              verifyEmail(setLoading);
            }
          }}
        >
          Resend New Code
        </Text>
      </Text>
    );
  }

  function passwordResetInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>Reset Password</Text>
        <Text
          style={{
            textAlign: "center",
            ...Fonts.whiteColor14Medium,
            marginHorizontal: 20,
            marginTop: Sizes.fixPadding * 3,
          }}
        >
          Enter email address to receive a password reset link:
        </Text>
      </View>
    );
  }

  function userEmailTextField() {
    const input = useRef();
    return (
      <View>
        <View
          style={
            emailError
              ? {
                  ...styles.textFieldWrapStyle,
                  borderColor: Colors.errorColor,
                  borderWidth: 1,
                }
              : styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <Image
              source={require("../../assets/images/icons/mail.png")}
              style={{ width: 20.0, height: 20.0, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TextInput
            ref={input}
            value={userEmail}
            onChangeText={(value) => setUserEmail(value)}
            placeholder="Enter Email Address"
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: Sizes.fixPadding + 7.0,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: 7,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
            {emailError ? emailError : ""}
          </Text>
        </View>
      </View>
    );
  }

  function errorDialog() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            ...Fonts.whiteColor14Medium,
            marginHorizontal: 20,
            marginTop: Sizes.fixPadding,
            color: Colors.errorColor,
          }}
        >
          {errorMsg}
        </Text>
      </View>
    );
  }

  function successDialog() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            ...Fonts.whiteColor14Medium,
            marginHorizontal: 20,
            marginTop: Sizes.fixPadding,
            color: Colors.successColor,
          }}
        >
          {successMsg}
        </Text>
      </View>
    );
  }
};

function createStyles(width) {
  return StyleSheet.create({
    backArrowWrapStyle: {
      width: 40.0,
      height: 40.0,
      borderRadius: 20.0,
      backgroundColor: "rgba(255,255,255,0.05)",
      alignItems: "center",
      justifyContent: "center",
      marginTop: Sizes.fixPadding * 3.0,
      marginBottom: Sizes.fixPadding * 2.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
    },
    verifyButtonStyle: {
      backgroundColor: Colors.secondaryGoldColor,
      paddingVertical: Sizes.fixPadding + 5.0,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginTop: Sizes.fixPadding * 4.0,
      borderRadius: Sizes.fixPadding - 5.0,
    },
    dialogStyle: {
      borderRadius: Sizes.fixPadding - 5.0,
      width: width - 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.bodyBackColor,
      padding: 0.0,
    },
    textFieldWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
    },
  });
}

export default PasswordResetScreen;
