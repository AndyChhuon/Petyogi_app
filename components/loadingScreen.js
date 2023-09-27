import React, { useEffect } from "react";
import { SafeAreaView, View, Image } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";
import useAuth from "../hooks/useAuth";

const LoadingScreen = ({ navigation }) => {
  const { setAppInitialized, user, appInitialized } = useAuth();

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
        Inter_Black: require("../assets/fonts/Inter-Black.ttf"),
      });

      if (user && appInitialized) {
        navigation.navigate("BottomTabBar");
      } else if (!user && appInitialized) {
        navigation.navigate("Register");
      } else {
        setAppInitialized(true);
      }

      // const propsToPass = {
      //   shouldListenRealTime: true,
      //   number: 27,
      // };
      // navigation.navigate("ProfileScreen");
    }
    loadFont();
  }, []);

  return (
    <Image
      style={{ height: "100%", width: "100%", resizeMode: "cover" }}
      source={require("../assets/images/splash-screen.png")}
    />
  );
};

export default LoadingScreen;
