import React, { useCallback, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  BackHandler,
  Dimensions,
} from "react-native";
import { Colors, Sizes, Fonts } from "../constants/styles";
import ProfileScreen from "../screens/profile/profileScreen";
import HomeScreen from "../screens/home/homeScreen";
import NotificationScreen from "../screens/notification/notificationScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const TabNavigator = () => {
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
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.whiteColor,
          tabBarInactiveTintColor: Colors.primaryColor,
          tabBarStyle: { ...styles.tabBarStyle },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name={"Home"}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/home.png"),
                focused: focused,
                color: color,
              }),
          }}
        />

        <Tab.Screen
          name={"Notification"}
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/notification.png"),
                focused: focused,
                color: color,
              }),
          }}
        />
        <Tab.Screen
          name={"Profile"}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/user.png"),
                focused: focused,
                color: color,
              }),
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function tabIconSort({ icon, focused, color }) {
    return (
      <View
        style={{
          backgroundColor: focused
            ? Colors.primaryColor
            : "rgba(140, 49, 255,0.2)",
          ...styles.bottomTabBarItemWrapStyle,
        }}
      >
        <Image
          source={icon}
          style={{
            width: (24.0 * width) / 414,
            height: (24.0 * width) / 414,
            resizeMode: "contain",
            tintColor: color,
          }}
        />
      </View>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={[styles.animatedView]}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }
};

export default TabNavigator;

const styles = StyleSheet.create({
  bottomTabBarItemWrapStyle: {
    width: (40.0 * width) / 414,
    height: (40.0 * width) / 414,
    borderRadius: (Sizes.fixPadding * width) / 414,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    height:
      (85.0 * width) / 414 > 85 ? (65.0 * width) / 414 : (85.0 * width) / 414,
    borderTopWidth: (2 * width) / 414,
    paddingTop: 10,
    borderTopColor: "#2c383d",
    elevation: (3.0 * width) / 414,
    shadowColor: Colors.primaryColor,
    backgroundColor: "#132025",
  },
});
