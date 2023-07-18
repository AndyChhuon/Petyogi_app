import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LoadingScreen from "../components/loadingScreen";
import BottomTabBarScreen from "../components/bottomTabBarScreen";
import LiveAuctionsDetailScreen from "./liveAuctionsDetail/liveAuctionsDetailScreen";
import ConnectWalletScreen from "./connectWallet/connectWalletScreen";
import PlaceBidSuccessScreen from "./placeBidSuccess/placeBidSuccessScreen";
import CreatorProfileScreen from "./creatorProfile/creatorProfileScreen";
import SetNFTPriceScreen from "./setNFTPrice/setNFTPriceScreen";
import NFTUploadSuccessScreen from "./NFTUploadSuccess/NFTUploadSuccessScreen";
import CollectionsScreen from "./collections/collectionsScreen";
import SettingScreen from "./setting/settingScreen";
import EditProfileScreen from "./editProfile/editProfileScreen";
import WalletScreen from "./wallet/walletScreen";
import FaqsScreen from "./faqs/faqsScreen";
import ContactUsScreen from "./contactUs/contactUsScreen";
import TermsAndConditionsScreen from "./termsAndConditions/termsAndConditionsScreen";
import LoginScreen from "./auth/loginScreen";
import RegisterScreen from "./auth/registerScreen";
import VerificationScreen from "./auth/verificationScreen";
import PasswordResetScreen from "./auth/passwordResetScreen";
import useAuth from "../hooks/useAuth";
import FlashMessage from "react-native-flash-message";
import StartMeditation from "./meditation/StartMeditation";
import MeditationScreen from "./meditation/MeditationScreen";
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
        }}
      >
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="MeditationScreen"
          component={MeditationScreen}
          options={{ gestureEnabled: false }}
        />

        {/* <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ ...TransitionPresets.DefaultTransition }}
              /> */}
        {user ? (
          <>
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen
              name="BottomTabBar"
              component={BottomTabBarScreen}
              options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen name="Meditation" component={StartMeditation} />
            <Stack.Screen
              name="LiveAuctionsDetail"
              component={LiveAuctionsDetailScreen}
            />
            <Stack.Screen
              name="ConnectWallet"
              component={ConnectWalletScreen}
            />
            <Stack.Screen
              name="PlaceBidSuccess"
              component={PlaceBidSuccessScreen}
            />
            <Stack.Screen
              name="CreatorProfile"
              component={CreatorProfileScreen}
            />
            <Stack.Screen name="SetNFTPrice" component={SetNFTPriceScreen} />
            <Stack.Screen
              name="NFTUploadSuccess"
              component={NFTUploadSuccessScreen}
            />
            <Stack.Screen name="Collections" component={CollectionsScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="Faqs" component={FaqsScreen} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditionsScreen}
            />
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
