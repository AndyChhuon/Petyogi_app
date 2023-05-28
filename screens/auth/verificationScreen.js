import React, { createRef, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { CircleFade } from "react-native-animated-spinkit";
import Dialog from "react-native-dialog";
import OTPTextView from "react-native-otp-textinput";

const { width } = Dimensions.get("window");

const VerificationScreen = ({ navigation }) => {
  const [otpInput, setotpInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {backArrow()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {verificationInfo()}
          {otpFields()}
          {resendInfo()}
          {verifyButton()}
        </ScrollView>
      </View>
      {loading()}
    </SafeAreaView>
  );

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

  function loading() {
    return (
      <Dialog.Container
        visible={isLoading}
        contentStyle={styles.dialogStyle}
        headerStyle={{ margin: 0.0, padding: 0.0 }}
      >
        <View
          style={{
            marginVertical: Sizes.fixPadding * 2.0,
            alignItems: "center",
          }}
        >
          <CircleFade size={56} color={Colors.primaryColor} />
          <Text
            style={{
              ...Fonts.whiteColor14Medium,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            Please wait...
          </Text>
        </View>
      </Dialog.Container>
    );
  }

  function verifyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push("BottomTabBar");
          }, 2000);
        }}
        style={styles.verifyButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Verify</Text>
      </TouchableOpacity>
    );
  }

  function resendInfo() {
    return (
      <Text style={{ marginTop: Sizes.fixPadding * 2.0, textAlign: "center" }}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Didn’t receive any code? {}
        </Text>
        <Text style={{ ...Fonts.primaryColor14Medium }}>Resend New Code</Text>
      </Text>
    );
  }

  function otpFields() {
    return (
      <OTPTextView
        containerStyle={{ marginHorizontal: Sizes.fixPadding * 3.0 }}
        handleTextChange={(text) => {
          setotpInput(text);
          if (otpInput.length == 3) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push("BottomTabBar");
            }, 2000);
          }
        }}
        inputCount={4}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        offTintColor={"transparent"}
        textInputStyle={{ ...styles.textFieldStyle }}
      />
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
        <Text style={{ textAlign: "center", ...Fonts.whiteColor14Medium }}>
          {`We have sent the verification code to\n+(444) 489-7896`}
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
  textFieldStyle: {
    borderBottomWidth: null,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    ...Fonts.whiteColor14Medium,
  },
  verifyButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 4.0,
    marginBottom: Sizes.fixPadding * 2.0,
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
