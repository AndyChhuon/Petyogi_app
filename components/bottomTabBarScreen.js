import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  BackHandler,
  Dimensions,
} from "react-native";
import { Colors, Sizes, Fonts } from "../constants/styles";
import HomeScreen from "../screens/home/homeScreen";
import ProfileScreen from "../screens/displayScreens/profileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const TabNavigator = ({ route }) => {
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };
  const { reloadUser, isWaitingOnEmailVerification } = useAuth();

  useEffect(() => {
    if (route.params?.isExternal && isWaitingOnEmailVerification) {
      console.log("reload");
      reloadUser();
    }
  }, [route.params]);

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
          tabBarActiveTintColor: Colors.goldColor,
          tabBarInactiveTintColor: "#f9ac46",
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
          backgroundColor: focused ? "#f7983a" : "#535cb3",
          borderColor: Colors.goldColor,
          borderWidth: focused ? 1 : 0,
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
    borderTopWidth: (2 * width) / 414,
    paddingTop: 15,
    paddingBottom: 20,
    borderTopColor: "#2c383d",
    elevation: (3.0 * width) / 414,
    shadowColor: Colors.primaryColor,
    backgroundColor: "#132025",
  },
});
