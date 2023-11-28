import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigationState } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../hooks/useAuth";

const splashScreenModal = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const state = useNavigationState((state) => state);
  const routeObj = state?.routes[state.routes.length - 1];
  const { claimGems } = useAuth();

  // claim gems if in asyncStorage
  const claimGemsFromAsync = async () => {
    try {
      const claimbleGems = await AsyncStorage.getItem("claimableGems");
      if (claimbleGems) {
        await AsyncStorage.removeItem("claimableGems");
        claimGems(claimbleGems);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const routeName = routeObj?.name;
    if (isSplashScreenVisible && routeName) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsSplashScreenVisible(false);
      SplashScreen.hideAsync();
    }

    if (routeName == "BottomTabBar") {
      claimGemsFromAsync();
    }

    // if claimbleGems in async storage, claim gems
  }, [routeObj]);
};

export default splashScreenModal;
