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
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    password: null,
    phoneNumber: null,
    securePassword: true,
    backClickCount: 0,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { password, phoneNumber, securePassword, backClickCount } = state;

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
        <ScrollView>
          {phoneNumberTextField()}
          {passwordTextField()}
          {forgetPasswordText()}
          {loginButton()}
          {orText()}
          {socialMediaOptions()}
        </ScrollView>
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
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Don’t have an account? {}
        </Text>
        <Text
          onPress={() => navigation.push("Register")}
          style={{ ...Fonts.primaryColor14Medium }}
        >
          Sign Up
        </Text>
      </Text>
    );
  }

  function socialMediaOptions() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.googleAndFacebookButtonWrapStyle}>
          <Image
            source={require("../../assets/images/icons/google.png")}
            style={{ width: 24.0, height: 24.0, resizeMode: "contain" }}
          />
          <Text
            style={{
              ...Fonts.whiteColor14Medium,
              marginLeft: Sizes.fixPadding + 5.0,
            }}
          >
            Google
          </Text>
        </View>
        <View style={styles.googleAndFacebookButtonWrapStyle}>
          <Image
            source={require("../../assets/images/icons/facebookWithColor.png")}
            style={{ width: 24.0, height: 24.0, resizeMode: "contain" }}
          />
          <Text
            style={{
              ...Fonts.whiteColor14Medium,
              marginLeft: Sizes.fixPadding + 5.0,
            }}
          >
            Facebook
          </Text>
        </View>
      </View>
    );
  }

  function orText() {
    return (
      <Text style={{ textAlign: "center", ...Fonts.whiteColor14Medium }}>
        OR
      </Text>
    );
  }

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("Register")}
        style={styles.loginButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Login</Text>
      </TouchableOpacity>
    );
  }

  function forgetPasswordText() {
    return <Text style={styles.forgetPasswordTextStyle}>Forget password?</Text>;
  }

  function passwordTextField() {
    return (
      <View
        style={{
          ...styles.textFieldWrapStyle,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <MaterialCommunityIcons
          name={securePassword ? "eye" : "eye-off"}
          size={20}
          color={Colors.whiteColor}
          onPress={() => updateState({ securePassword: !securePassword })}
        />
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
          placeholder="Enter PhoneNumber"
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
    ...Fonts.primaryColor14Medium,
  },
  loginButtonStyle: {
    backgroundColor: Colors.primaryColor,
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
});

export default LoginScreen;
