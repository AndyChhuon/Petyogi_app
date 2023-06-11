import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LoadingScreen from "./components/loadingScreen";
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import LiveAuctionsDetailScreen from "./screens/liveAuctionsDetail/liveAuctionsDetailScreen";
import ConnectWalletScreen from "./screens/connectWallet/connectWalletScreen";
import PlaceBidSuccessScreen from "./screens/placeBidSuccess/placeBidSuccessScreen";
import CreatorProfileScreen from "./screens/creatorProfile/creatorProfileScreen";
import SetNFTPriceScreen from "./screens/setNFTPrice/setNFTPriceScreen";
import NFTUploadSuccessScreen from "./screens/NFTUploadSuccess/NFTUploadSuccessScreen";
import CollectionsScreen from "./screens/collections/collectionsScreen";
import SettingScreen from "./screens/setting/settingScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import WalletScreen from "./screens/wallet/walletScreen";
import FaqsScreen from "./screens/faqs/faqsScreen";
import ContactUsScreen from "./screens/contactUs/contactUsScreen";
import TermsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import SplashScreen from "./screens/splashScreen";
import LoginScreen from "./screens/auth/loginScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import VerificationScreen from "./screens/auth/verificationScreen";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen
          name="BottomTabBar"
          component={BottomTabBarScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="LiveAuctionsDetail"
          component={LiveAuctionsDetailScreen}
        />
        <Stack.Screen name="ConnectWallet" component={ConnectWalletScreen} />
        <Stack.Screen
          name="PlaceBidSuccess"
          component={PlaceBidSuccessScreen}
        />
        <Stack.Screen name="CreatorProfile" component={CreatorProfileScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
