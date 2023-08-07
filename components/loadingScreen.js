import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";
import useAuth from "../hooks/useAuth";

const LoadingScreen = ({ navigation }) => {
  const { setAppInitialized } = useAuth();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        SF_Compact_Display_Regular: require("../assets/fonts/SF-Compact-Display-Regular.ttf"),
        SF_Compact_Display_Medium: require("../assets/fonts/SF-Compact-Display-Medium.ttf"),
        SF_Compact_Display_SemiBold: require("../assets/fonts/SF-Compact-Display-Semibold.ttf"),
        SF_Compact_Display_Bold: require("../assets/fonts/SF-Compact-Display-Bold.ttf"),
        SF_Compact_Display_Light: require("../assets/fonts/SF-Compact-Display-Light.ttf"),
        SF_Compact_Display_Thin: require("../assets/fonts/SF-Compact-Display-Thin.ttf"),
        SF_Compact_Display_Black: require("../assets/fonts/SF-Compact-Display-Black.ttf"),
        Sigmar_Regular: require("../assets/fonts/Sigmar-Regular.ttf"),
      });

      setAppInitialized(true);
    }
    loadFont();
  });

  return <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />;
};

export default LoadingScreen;
