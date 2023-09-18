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
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { purchaseScreenCTA } from "../../constants/constants";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import Purchases from "react-native-purchases";
import { showMessage } from "react-native-flash-message";
import Lottie from "lottie-react-native";
import { meditationLotties } from "../../constants/constants";

const loadingModal = () => {
  const { loadingModalVisible } = useAuth();
  const [createMeditationLottieIndex, setCreateMeditationLottieIndex] =
    useState(0);

  useEffect(() => {
    setCreateMeditationLottieIndex(
      Math.floor(Math.random() * meditationLotties.length)
    );
  }, [loadingModalVisible]);

  return (
    loadingModalVisible && (
      <View
        style={{
          display: loadingModalVisible ? "flex" : "none",
          backgroundColor: "rgba(37, 53, 66, 0.5)",
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 30,
          paddingBottom: "15%",
        }}
      >
        <View style={{ width: "80%", alignItems: "center" }}>
          <Lottie
            source={meditationLotties[createMeditationLottieIndex].lottie}
            style={{
              position: "relative",
              resizeMode: "cover",
              flexGrow: 1,
              opacity: 1,
              width: "100%",
            }}
            speed={meditationLotties[createMeditationLottieIndex].speed}
            autoPlay
            loop
          ></Lottie>
          <View
            style={{
              backgroundColor: Colors.whiteDarker,
              borderRadius: 10,
              padding: 10,
              width: "90%",
              alignItems: "center",
            }}
          >
            <Text style={Fonts.loadingText}>Loading...</Text>
          </View>
        </View>
      </View>
    )
  );
};

export default loadingModal;
