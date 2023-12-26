import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const VerificationScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [wasPopped, setWasPopped] = useState(false);

  const { emailVerification, user, reloadUser } = useAuth();
  const email = user.email;

  useEffect(() => {
    if (error) {
      switch (error) {
        case "auth/invalid-email":
          setErrorMsg(
            "The email address you entered is invalid. Please sign up with a valid email address."
          );
          break;
        case "auth/user-not-found":
          setErrorMsg(
            "The user with the given email address was not found. Please sign up first."
          );
          break;
        case "auth/too-many-requests":
          setErrorMsg(
            "Too many verification requests. Please try again in 60 seconds."
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
          {verificationInfo()}
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

  function verifyEmail() {
    setError(null);
    setErrorMsg(null);
    setSuccessMsg(null);
    emailVerification(setError, setSuccessMsg);
  }

  function verifyButton() {
    return (
      <TouchableOpacity
        activeOpacity={successMsg ? 1 : 0.9}
        onPress={() => {
          if (!successMsg && !user.emailVerified) {
            verifyEmail();
          } else if (user.emailVerified) {
            reloadUser();
            setErrorMsg("Email already verified.");
          }
        }}
        style={[
          styles.verifyButtonStyle,
          successMsg ? { backgroundColor: "grey" } : {},
        ]}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
          {successMsg ? "Email Sent" : "Send"}
        </Text>
      </TouchableOpacity>
    );
  }

  function resendInfo() {
    if (successMsg) {
      return (
        <Text
          style={{ marginTop: Sizes.fixPadding * 2.0, textAlign: "center" }}
        >
          <Text style={{ ...Fonts.whiteColor14Medium }}>
            Didn’t receive any code? {}
          </Text>
          <Text
            style={{
              ...Fonts.primaryColor14Medium,
              textDecorationLine: "underline",
            }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              verifyEmail();
            }}
          >
            Resend New Code
          </Text>
        </Text>
      );
    }
  }

  function verificationInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>Verification</Text>
        <Text
          style={{
            textAlign: "center",
            ...Fonts.whiteColor14Medium,
            marginHorizontal: 20,
            marginTop: Sizes.fixPadding * 3,
          }}
        >
          {successMsg
            ? `PetYogi has sent a verification link to: \n${email}.`
            : `Click "Send" to verify the following email address:  \n${email}.`}
        </Text>
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

const styles = StyleSheet.create({
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
});

export default VerificationScreen;
