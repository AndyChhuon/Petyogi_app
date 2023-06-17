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

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    password: null,
    phoneNumber: null,
    securePassword: true,
    backClickCount: 0,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { password, phoneNumber, securePassword, backClickCount } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {backArrow()}

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
              {loginButton()}
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
          onPress={() => navigation.push("Register")}
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

  function loginButton() {
    return (
      <AwesomeButton
        activeOpacity={0.9}
        onPress={() => navigation.push("Verification")}
        style={styles.loginButtonStyle}
        width="auto"
        backgroundColor={Colors.secondaryGoldColor}
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
  loginButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Sizes.fixPadding * 4.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginTop: 50,
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

export default LoginScreen;
