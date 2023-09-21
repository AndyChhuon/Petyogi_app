import React, { Fragment, useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import { purchaseScreenCTA } from "../../constants/constants";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import Purchases from "react-native-purchases";
import { showMessage } from "react-native-flash-message";
import Lottie from "lottie-react-native";
import { meditationLotties } from "../../constants/constants";
import ScaleInOut from "../../Animations/ScaleInOut";
import * as Haptics from "expo-haptics";
import {
  streaksSavedImage,
  initMeditationQuestionsJson,
} from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const VerificationModal = () => {
  const { verificationModalVisible, setVerificationModalVisible, userValues } =
    useAuth();

  const navigation = useNavigation();

  const [creditsObtainedImageIndex, setcreditsObtainedImageIndex] = useState(0);

  const creditsDelay = 1000;

  const onMeditationClick = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setVerificationModalVisible(false);
    if (userValues.remainingCredits == 0) {
      navigation.navigate("PurchaseScreen");
    } else {
      const propsToPass = {
        initMeditationQuestionsJson: initMeditationQuestionsJson,
        phrases: null,
        meditationUrls: null,
        finishedGenerating: null,
        number: userValues.numMeditations + 1,
        readOnly: false,
      };
      navigation.navigate("Meditation", propsToPass);
    }
  };

  useEffect(() => {
    if (verificationModalVisible) {
      setcreditsObtainedImageIndex(
        Math.floor(Math.random() * streaksSavedImage.length)
      );
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, creditsDelay);
    }
  }, [verificationModalVisible]);

  return (
    verificationModalVisible && (
      <ScaleInOut
        visible={verificationModalVisible != "nocreditsMsg"}
        delayIn={creditsDelay}
        style={{
          display: "flex",
          backgroundColor: "rgba(37, 53, 66, 0.5)",
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
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
            Your account has been verified!
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
                setVerificationModalVisible(false);
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
                  //grey out
                }}
              />
              : 2
            </Text>
          </View>
          <View style={{ paddingTop: 5, justifyContent: "center" }}>
            <Text
              style={[Fonts.streakSavecreditsText, { textAlign: "center" }]}
            >
              Let's get meditating!
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <AwesomeButton
            paddingHorizontal={2}
            width={(110 * width) / 414}
            height={45}
            backgroundColor="#67bcff"
            backgroundDarker="#2383ff"
            backgroundShadow="#173746"
            raiseLevel={5}
            borderWidth={1}
            borderColor="#005aae"
            borderRadius={8}
            onPressOut={() => {
              onMeditationClick();
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={Fonts.streakModalButton}>Begin</Text>
              <Text style={Fonts.streakModalButton}>Meditation</Text>
            </View>
          </AwesomeButton>
        </View>
      </ScaleInOut>
    )
  );
};

export default VerificationModal;
