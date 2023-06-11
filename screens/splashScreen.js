import React, { useCallback } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Text,
  BackHandler,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  setTimeout(() => {
    navigation.push("Register");
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {logo()}
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor30Regular,
          }}
        >
          Marketplace
        </Text>
      </View>
    </SafeAreaView>
  );

  function logo() {
    return (
      <Image
        source={require("../assets/images/logo.png")}
        style={{ height: 40.0, width: "100%", resizeMode: "contain" }}
      />
    );
  }
};

export default SplashScreen;
