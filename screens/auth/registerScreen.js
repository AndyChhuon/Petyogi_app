import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Lottie from "lottie-react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import * as Haptics from "expo-haptics";

const { height } = Dimensions.get("window");
const RegisterScreen = ({ navigation }) => {
  const { emailSignup } = useAuth();

  const [error, setError] = useState(null);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [agreeError, setAgreeError] = useState(null);

  const [state, setState] = useState({
    password: null,
    userEmail: null,
    securePassword: true,
    backClickCount: 0,
    isAgree: true,
  });

  useEffect(() => {
    if (error) {
      switch (error) {
        case "auth/email-already-in-use":
          setEmailError("This email address is already in use!");
          break;
        case "auth/invalid-email":
          setEmailError("This email address is invalid!");
          break;
        case "auth/weak-password":
          setPasswordError("This password is too weak!");
          break;
        default:
          setEmailError("The following error has occured: " + error);
      }
    }
  }, [error]);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { password, userEmail, securePassword, backClickCount, isAgree } =
    state;

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    updateState({ backClickCount: 1 });
    setTimeout(() => {
      updateState({ backClickCount: 0 });
    }, 1000);
  }

  const handlePressOutsideTextBox = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutsideTextBox}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
        {loginTitle()}
        <View
          style={{
            flexShrink: 1,
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <Lottie
            source={require("../../assets/Lottie/tiger_waving.json")}
            style={{
              position: "relative",
              resizeMode: "cover",
              flexGrow: 0.8,
            }}
            speed={0.8}
            autoPlay
            loop
          ></Lottie>
        </View>
        <KeyboardAvoidingView
          style={{ flexGrow: 1, justifyContent: "flex-end" }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {userEmailTextField()}
          {passwordTextField()}
          {agreeOrNotInfo()}
        </KeyboardAvoidingView>
        {registerButton()}
        {dontAccountInfo()}
        {backClickCount == 1 ? (
          <View style={[styles.animatedView]}>
            <Text style={{ ...Fonts.whiteColor14Medium }}>
              Press Back Once Again To Exit
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );

  function dontAccountInfo() {
    return (
      <Text
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.push("Login");
        }}
        style={{
          textAlign: "center",
          paddingBottom: (Sizes.fixPadding * 2.0 * height) / 880,
          marginTop: (Sizes.fixPadding * 4.0 * height) / 880,
        }}
      >
        <Text
          style={{
            ...Fonts.primaryColor14Medium,
            textDecorationLine: "underline",
          }}
        >
          Already signed up?
        </Text>
      </Text>
    );
  }

  function registerOnClick() {
    setEmailError(null);
    setPasswordError(null);
    setAgreeError(null);
    setError(null);

    if (!userEmail) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (
      !userEmail.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)
    ) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (!password) {
      setPasswordError("Please enter a valid password");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else if (!isAgree) {
      setAgreeError("Please agree to the terms and conditions.");
      return;
    }

    emailSignup(setError, userEmail.trim().toLowerCase(), password);
  }

  function registerButton() {
    return (
      <AwesomeButton
        activeOpacity={0.9}
        onPress={async (next) => {
          registerOnClick();
          next();
        }}
        style={styles.registerButtonStyle}
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
          Sign up
        </Text>
      </AwesomeButton>
    );
  }

  function passwordTextField() {
    const passInput = useRef();

    return (
      <View>
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
              value={password}
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
                  marginBottom: 7,
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

  function agreeOrNotInfo() {
    return (
      <View
        style={{
          marginRight: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={styles.agreeOrNotInfoWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ isAgree: !isAgree })}
            style={{
              backgroundColor: isAgree
                ? Colors.secondaryGoldColor
                : "transparent",
              borderColor: isAgree
                ? Colors.secondaryGoldColor
                : Colors.whiteColor,
              ...styles.checkBoxStyle,
            }}
          >
            {isAgree ? (
              <MaterialIcons name="check" color={Colors.whiteColor} size={14} />
            ) : null}
          </TouchableOpacity>
          <View>
            <Text>
              <Text style={{ ...Fonts.whiteColor14Medium }}>
                By creating an account, you agree to our {}
              </Text>
              <Text
                style={{
                  ...Fonts.primaryColor14Medium,
                  textDecorationLine: "underline",
                }}
              >
                Terms and Condition
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={
            agreeError
              ? {
                  marginHorizontal: Sizes.fixPadding * 2.0,
                }
              : { display: "none" }
          }
        >
          <Text
            style={{
              ...Fonts.parentColor14Medium,
              color: Colors.errorColor,
            }}
          >
            {agreeError}
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
            value={userEmail}
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
        }}
      >
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>
          Let’s get you started.
        </Text>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Welcome Yogi. Your adventure awaits!
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
  backArrowWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
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
  registerButtonStyle: {
    marginTop: (Sizes.fixPadding * 4.0 * height) / 880,
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
  agreeOrNotInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: Sizes.fixPadding - 8.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Sizes.fixPadding + 2.0,
  },
});

export default RegisterScreen;
