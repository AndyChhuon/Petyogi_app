import { Image } from "react-native";
import React, { useEffect, useState } from "react";

const splashScreenModal = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 1000);
  }, []);
  return (
    isSplashScreenVisible && (
      <Image
        style={{
          display: "flex",
          position: "absolute",
          height: "100%",
          width: "100%",
          resizeMode: "cover",
        }}
        source={require("../../assets/images/splash-screen.png")}
      />
    )
  );
};

export default splashScreenModal;
