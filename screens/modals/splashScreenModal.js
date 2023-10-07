import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigationState } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

const splashScreenModal = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const state = useNavigationState((state) => state);
  const routeObj = state?.routes[state.routes.length - 1];

  useEffect(() => {
    const routeName = routeObj?.name;
    if (isSplashScreenVisible && routeName) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsSplashScreenVisible(false);
      SplashScreen.hideAsync();
    }
  }, [routeObj]);
};

export default splashScreenModal;
