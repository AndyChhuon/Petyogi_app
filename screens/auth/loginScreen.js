import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Keyboard,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Lottie from "lottie-react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import * as Haptics from "expo-haptics";

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    password: null,
    userEmail: null,
    securePassword: true,
  });
  const { height } = Dimensions.get("window");
  const styles = createStyles(height);

  const { emailLogin } = useAuth();

  const [error, setError] = useState(null);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (error) {
      switch (error) {
        case "auth/user-not-found":
          setEmailError("This email address is not registered!");
          break;
        case "auth/too-many-requests":
          setEmailError("Too many login attempts, please try again later");
          break;
        case "auth/wrong-password":
          setPasswordError("Wrong Password, please try again");
          break;
        default:
          setEmailError("The following error has occured: " + error);
      }
    }
  }, [error]);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { password, userEmail, securePassword } = state;

  const handlePressOutsideTextBox = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePressOutsideTextBox}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
        <View style={{ flexGrow: 1 }}>
          {backArrow()}
          {loginTitle()}
        </View>
        <View
          style={{
            flexShrink: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <Lottie
            source={require("../../assets/Lottie/cute_penguin.json")}
            style={{
              position: "relative",
              resizeMode: "cover",
              flexGrow: 1,
            }}
            speed={1}
            autoPlay
            loop
          ></Lottie>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {userEmailTextField()}
          {passwordTextField()}
        </KeyboardAvoidingView>
        {loginButton()}
        {dontAccountInfo()}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );

  function dontAccountInfo() {
    return (
      <Text
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.push("ResetPassword");
        }}
        style={{
          textAlign: "center",
          padding: (Sizes.fixPadding * 2.0 * height) / 880,
          marginTop: (Sizes.fixPadding * 2.0 * height) / 880,
        }}
      >
        <Text
          style={{
            ...Fonts.primaryColor14Medium,
            textDecorationLine: "underline",
          }}
        >
          Forgot your password?
        </Text>
      </Text>
    );
  }

  function loginOnClick() {
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    if (!userEmail) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (
      !userEmail
        .trim()
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (!password) {
      setPasswordError("Please enter a valid password");
      return;
    } else if (password.length < 6) {
      setPasswordError("Wrong Password, must be at least 6 characters");
      return;
    }

    emailLogin(setError, userEmail.trim().toLowerCase(), password);
  }

  function loginButton() {
    return (
      <AwesomeButton
        activeOpacity={0.9}
        onPress={async (next) => {
          loginOnClick();
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

  function backArrow() {
    return (
      <View style={{ ...styles.backArrowWrapStyle }}>
        <MaterialIcons
          name="chevron-left"
          color={Colors.whiteColor}
          size={26}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.pop();
          }}
        />
      </View>
    );
  }

  function passwordTextField() {
    const passInput = useRef();

    return (
      <View style={{ marginBottom: (Sizes.fixPadding * height) / 880 }}>
        <View
          style={
            passwordError
              ? {
                  ...styles.textFieldWrapStyle,
                  justifyContent: "space-between",
                  borderColor: Colors.errorColor,
                  borderWidth: 1,
                }
              : {
                  ...styles.textFieldWrapStyle,
                  justifyContent: "space-between",
                }
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => passInput.current.focus()}
            >
              <MaterialIcons
                name="lock-open"
                size={20}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
            <TextInput
              ref={passInput}
              onChangeText={(value) => updateState({ password: value })}
              placeholder="Enter Password"
              secureTextEntry={securePassword}
              placeholderTextColor={Colors.grayColor}
              style={{
                ...Fonts.whiteColor14Medium,
                marginLeft: Sizes.fixPadding + 2.0,
                flex: 1,
                paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
              }}
              selectionColor={Colors.primaryColor}
            />
            <MaterialCommunityIcons
              name={securePassword ? "eye" : "eye-off"}
              size={20}
              color={Colors.whiteColor}
              onPress={() => updateState({ securePassword: !securePassword })}
            />
          </View>
        </View>
        <View
          style={
            passwordError
              ? {
                  marginHorizontal: Sizes.fixPadding * 2.0,
                }
              : { display: "none" }
          }
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
            {passwordError}
          </Text>
        </View>
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
            onChangeText={(value) => updateState({ userEmail: value })}
            placeholder="Enter Email Address"
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
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

  function loginTitle() {
    return (
      <View
        style={{
          marginVertical: (Sizes.fixPadding * 4.0 * height) / 880,
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

function createStyles(height) {
  return StyleSheet.create({
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
      marginTop: ((Sizes.fixPadding - 5.0) * height) / 880,
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
      marginTop: (Sizes.fixPadding * 3.0 * height) / 880,
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
}

export default LoginScreen;
