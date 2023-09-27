import React, { useEffect, useState } from "react";

import { View, Dimensions, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import { streaksSavedImage } from "../../constants/constants";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import ScaleInOut from "../../Animations/ScaleInOut";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

const creditsModal = () => {
  const { creditsObj, setCreditsObj } = useAuth();

  const [creditsObtainedImageIndex, setcreditsObtainedImageIndex] = useState(0);
  const [creditsMsgState, setcreditsMsgState] = useState("nocreditsMsg");

  const creditsDelay = 1000;

  useEffect(() => {
    const creditsMsg = creditsObj?.isNewSub
      ? "newSubMsg"
      : creditsObj?.nbCreditsGiven && creditsObj.nbCreditsGiven > 0
      ? "creditsMsg"
      : "nocreditsMsg";

    console.log(creditsMsg);

    if (creditsMsg != "nocreditsMsg") {
      setcreditsObtainedImageIndex(
        Math.floor(Math.random() * streaksSavedImage.length)
      );
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, creditsDelay);
    }

    setcreditsMsgState(creditsMsg);
  }, [creditsObj]);

  const creditsBottomText = {
    creditsMsg: "Let's get meditating!",
    newSubMsg: "New subscription, new habits!",
  };

  return (
    creditsMsgState != "nocreditsMsg" && (
      <ScaleInOut
        visible={creditsMsgState != "nocreditsMsg"}
        delayIn={creditsDelay}
        style={{
          display: "flex",
          backgroundColor: "rgba(37, 53, 66, 0.5)",
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 40,
          paddingBottom: "15%",
        }}
      >
        <View
          style={{
            width: "80%",
            paddingVertical: (20 * height) / 880,
            backgroundColor: "#5ea591",
            paddingHorizontal: 5,
            alignItems: "center",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 0,
            borderBottomColor: "#5f94ae",
          }}
        >
          <Text style={[Fonts.streakModalTitle, { textAlign: "center" }]}>
            You obtained new credits!
          </Text>
          <View style={{ position: "absolute", top: -15, right: -10 }}>
            <AwesomeButton
              width={32}
              height={32}
              raiseLevel={3}
              paddingHorizontal={0}
              backgroundColor="#eb910a"
              backgroundDarker="#a26208"
              onPressOut={() => {
                setCreditsObj({
                  ...creditsObj,
                  nbCreditsGiven: 0,
                  isNewSub: false,
                });
              }}
            >
              <Ionicons name="close" color={Colors.whiteDarker} size={25} />
            </AwesomeButton>
          </View>
        </View>

        <View
          style={{
            width: "80%",
            alignItems: "center",
            backgroundColor: "#9be1cd",
            paddingVertical: (35 * height) / 880,
            paddingBottom: (25 * height) / 880,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 0,
            borderTopWidth: 0,
          }}
        >
          <Image
            source={streaksSavedImage[creditsObtainedImageIndex].image}
            style={{
              position: "relative",
              width: (200.0 * width) / 414,
              height: (200.0 * width) / 414,
              marginBottom: 30,
              borderRadius: 10,
              borderColor: "#C59FAA",
              borderWidth: 2,
            }}
          ></Image>
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              borderRadius: 10,
              padding: 10,
              minWidth: "75%",
              alignItems: "center",
              borderColor: "#e9d076",
              borderWidth: 1,
            }}
          >
            <Text style={[Fonts.streakModalText]}>
              New Credits
              <Image
                source={require("../../assets/images/icons/meditation.png")}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: "contain",
                }}
              />
              : {creditsObj?.nbCreditsGiven}
            </Text>
          </View>
          <View style={{ paddingTop: 5, justifyContent: "center" }}>
            <Text
              style={[Fonts.streakSavecreditsText, { textAlign: "center" }]}
            >
              {creditsBottomText[creditsMsgState]}
            </Text>
          </View>
        </View>
      </ScaleInOut>
    )
  );
};

export default creditsModal;
