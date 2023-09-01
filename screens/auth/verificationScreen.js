import React, { createRef, useEffect, useState } from "react";
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
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const { emailVerification, user } = useAuth();

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

  useEffect(() => {
    if (!user) {
      navigation.navigate("Register");
    } else {
      if (!user.emailVerified) {
        setEmail(user.email);
        console.log("Email not verified. Sending verification email...");
        verifyEmail();
      } else {
        console.log("Email verified. Teleporting to PetYogi...");
        navigation.navigate("BottomTabBar");
      }
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
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
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    );
  }

  async function verifyOnClick() {
    setError(null);
    setErrorMsg(null);
    setSuccessMsg(null);
    await user.reload();
    if (!user.emailVerified) {
      setErrorMsg(
        "Email not verified. Please check your inbox and click the verification link."
      );
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setSuccessMsg("Verification successful! Teleporting to PetYogi...");
      navigation.navigate("BottomTabBar");
    }
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
        activeOpacity={0.9}
        onPress={() => {
          verifyOnClick();
        }}
        style={styles.verifyButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Continue</Text>
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
          onPress={() => verifyEmail()}
        >
          Resend New Code
        </Text>
      </Text>
    );
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
          {`PetYogi has sent a verification link to: \n${email}.`}
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
