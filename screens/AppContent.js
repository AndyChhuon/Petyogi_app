import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LoadingScreen from "../components/loadingScreen";
import BottomTabBarScreen from "../components/bottomTabBarScreen";
import LoginScreen from "./auth/loginScreen";
import RegisterScreen from "./auth/registerScreen";
import VerificationScreen from "./auth/verificationScreen";
import PasswordResetScreen from "./auth/passwordResetScreen";
import useAuth from "../hooks/useAuth";
import FlashMessage from "react-native-flash-message";
import MeditationQuestionModal from "./meditation/MeditationQuestionModal";
import MeditationScreen from "./meditation/MeditationScreen";
import StreakScreen from "./displayScreens/streakScreen";
import ShopScreen from "./displayScreens/shopScreen";
import PurchaseScreen from "./displayScreens/purchaseScreen";
import SplashScreen from "./splashScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />

        {/* <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ ...TransitionPresets.DefaultTransition }}
              /> */}
        {user ? (
          <>
            <Stack.Screen
              name="BottomTabBar"
              component={BottomTabBarScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen
              name="StreakScreen"
              component={StreakScreen}
              options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
            />
            <Stack.Screen
              name="ShopScreen"
              component={ShopScreen}
              options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
            />
            <Stack.Screen
              name="PurchaseScreen"
              component={PurchaseScreen}
              options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />

            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={PasswordResetScreen}
            />
            <Stack.Screen
              name="MeditationScreen"
              component={MeditationScreen}
            />
            <Stack.Screen
              name="Meditation"
              component={MeditationQuestionModal}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Verification" component={VerificationScreen} />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ResetPassword"
              component={PasswordResetScreen}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
      <StatusBar style="dark" />
    </>
  );
};

export default AppContent;
