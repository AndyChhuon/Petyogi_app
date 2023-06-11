import React, { useRef, useState, useCallback } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AwesomeButton from "react-native-really-awesome-button";

const RegisterScreen = ({ navigation }) => {
  const [state, setState] = useState({
    password: null,
    phoneNumber: null,
    securePassword: true,
    backClickCount: 0,
    isAgree: true,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { password, phoneNumber, securePassword, backClickCount, isAgree } =
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {loginTitle()}
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              {phoneNumberTextField()}
              {passwordTextField()}
              {agreeOrNotInfo()}
              {registerButton()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {dontAccountInfo()}
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor14Medium }}>
            Press Back Once Again To Exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function dontAccountInfo() {
    return (
      <Text style={{ textAlign: "center", margin: Sizes.fixPadding * 2.0 }}>
        <Text
          onPress={() => navigation.push("Login")}
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

  function registerButton() {
    return (
      <AwesomeButton
        activeOpacity={0.9}
        onPress={() => navigation.push("Verification")}
        style={styles.registerButtonStyle}
        width="auto"
        backgroundColor={Colors.goldColor}
        raiseLevel={5}
        borderRadius={20}
        backgroundShadow={Colors.grayColor}
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
    return (
      <View
        style={{
          ...styles.textFieldWrapStyle,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <MaterialIcons name="lock-open" size={20} color={Colors.whiteColor} />
          <TextInput
            value={password}
            onChangeText={(value) => updateState({ password: value })}
            placeholder="Enter Password"
            secureTextEntry={securePassword}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              marginLeft: Sizes.fixPadding + 2.0,
              flex: 1,
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
    );
  }

  function agreeOrNotInfo() {
    return (
      <View style={styles.agreeOrNotInfoWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ isAgree: !isAgree })}
          style={{
            backgroundColor: isAgree ? Colors.primaryColor : "transparent",
            borderColor: isAgree ? Colors.primaryColor : Colors.whiteColor,
            ...styles.checkBoxStyle,
          }}
        >
          {isAgree ? (
            <MaterialIcons name="check" color={Colors.whiteColor} size={14} />
          ) : null}
        </TouchableOpacity>
        <Text style={{ marginLeft: Sizes.fixPadding + 2.0 }}>
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
    );
  }

  function phoneNumberTextField() {
    const input = useRef();
    return (
      <View
        style={{
          ...styles.textFieldWrapStyle,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => input.current.focus()}
        >
          <Image
            source={require("../../assets/images/icons/phone.png")}
            style={{ width: 20.0, height: 20.0, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <TextInput
          ref={input}
          value={phoneNumber}
          onChangeText={(value) => updateState({ phoneNumber: value })}
          placeholder="Enter Phone Number"
          placeholderTextColor={Colors.grayColor}
          style={{
            ...Fonts.whiteColor14Medium,
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
          }}
          selectionColor={Colors.primaryColor}
          keyboardType="phone-pad"
        />
      </View>
    );
  }

  function loginTitle() {
    return (
      <View
        style={{ marginVertical: Sizes.fixPadding * 4.0, alignItems: "center" }}
      >
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>
          Let’s get you started.
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
    paddingVertical: Sizes.fixPadding + 5.0,
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
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Sizes.fixPadding * 4.0,
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
  },
});

export default RegisterScreen;
