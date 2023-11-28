import React, { Fragment, useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import useAuth from "../../hooks/useAuth";
import { meditationScreenCustomizeables } from "../../constants/constants";
import Lottie from "lottie-react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { Audio } from "expo-av";

const PurchaseWithGems = ({ navigation, route }) => {
  const {
    userValues,
    purchaseItem,
    setLoadingModalVisible,
    loadingModalVisible,
  } = useAuth();
  const nbGems = userValues.coins;
  const [music, setMusic] = useState(null);

  const initDimensions = Dimensions.get("window");
  const [width, setWidth] = useState(initDimensions.width);
  const [height, setHeight] = useState(initDimensions.height);

  const styles = createStyles(width);
  console.log("width: " + width);

  useEffect(() => {
    function onChangeDimensions({ window }) {
      const { width, height } = window;
      setWidth(width);
      setHeight(height);
      console.log("width: " + width + " height: " + height);
    }

    const subscription = Dimensions.addEventListener(
      "change",
      onChangeDimensions
    );

    return () => subscription.remove();
  }, [setWidth, setHeight]);

  const { id, type, amount, musicIsPlaying, MusicRef } = route.params;

  const isOwned = amount == "Free" || userValues?.customizeables?.[type]?.[id];

  const [errSuccessMsg, setErrSuccessMsg] = useState("");

  const customizeable =
    type == "meditation"
      ? meditationScreenCustomizeables.meditation.find((item) => item.id == id)
      : type == "background"
      ? meditationScreenCustomizeables.background.find((item) => item.id == id)
      : meditationScreenCustomizeables.music.find((item) => item.id == id);

  const onButtonPress = () => {
    if (loadingModalVisible) return;
    if (nbGems < amount) {
      setErrSuccessMsg("You don't have enough gems!");
    } else {
      setLoadingModalVisible(true);
      purchaseItem(id, type, setErrSuccessMsg);
    }
  };

  const loadMusic = async () => {
    if (type == "music" && musicIsPlaying && MusicRef) {
      MusicRef.pauseAsync();
    }
    if (type == "music") {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: customizeable.sound },
        { shouldPlay: true }
      );
      setMusic(newSound);
    }
  };

  useEffect(() => {
    loadMusic();
  }, []);

  return (
    <Fragment>
      <StatusBar
        translucent={false}
        backgroundColor={
          customizeable.backgroundColor
            ? customizeable.backgroundColor
            : Colors.bodyBackColor2
        }
      />
      {(type == "background" || type == "music") && (
        <Lottie
          source={
            customizeable?.lottie
              ? customizeable?.lottie
              : require("../../assets/background_svg/starry_night.json")
          }
          style={{
            position: "absolute",
            zIndex: 1,
            resizeMode: "cover",
            width: "100%",
            height: "100%",
            aspectRatio: width / height,
            backgroundColor: "#341c72",
          }}
          speed={0.5}
          autoPlay
          loop
        ></Lottie>
      )}

      <SafeAreaView
        style={[
          {
            flex: 1,
            width: "100%",
            height: "100%",
            zIndex: 2,
          },
          type == "meditation" && {
            backgroundColor: customizeable.backgroundColor
              ? customizeable.backgroundColor
              : Colors.bodyBackColor2,
          },
        ]}
      >
        <View style={[styles.closeButtonStyle]}>
          <Ionicons
            name="close"
            color={Colors.whiteColor}
            size={32}
            onPress={() => {
              navigation.pop();
              if (type == "music" && musicIsPlaying && MusicRef) {
                MusicRef.playAsync();
              }
              if (type == "music" && music) {
                music.unloadAsync();
              }
            }}
          />
          {type == "music" && (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Image
                style={{
                  width: width / 3.5,
                  height: undefined,
                  aspectRatio: 4 / 3,
                  borderRadius: 10,
                }}
                source={customizeable.image}
              ></Image>
              <Text
                style={[
                  Fonts.purchaseScreenSubtitle,
                  { marginTop: 5, fontSize: 12, textAlign: "center" },
                ]}
              >
                Currently Playing...
              </Text>
            </View>
          )}
        </View>
        {(type == "meditation" || type == "music") && (
          <View
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 1,
              marginTop: height > width ? (height * 0.1) / 2 : 0,
            }}
          >
            <Lottie
              source={
                customizeable?.lottie
                  ? customizeable?.lottie
                  : require("../../assets/Meditation/sloth.json")
              }
              style={{
                resizeMode: "contain",
              }}
              speed={customizeable?.speed ? customizeable?.speed : 0.6}
              loop
              autoPlay
            ></Lottie>
          </View>
        )}
        <View
          style={[
            { alignItems: "center", marginBottom: 30 },
            (type == "background" || type == "music") && {
              flexGrow: 1,
              justifyContent: "flex-end",
              marginBottom: 20,
            },
          ]}
        >
          <AwesomeButton
            paddingHorizontal={2}
            width={width * 0.9}
            height={50}
            backgroundColor="#ffffff"
            backgroundDarker="#4589cf"
            backgroundShadow="#365f89"
            raiseLevel={3}
            borderWidth={1}
            borderColor="#719cc9"
            borderRadius={8}
            onPressOut={onButtonPress}
            disabled={isOwned}
          >
            {isOwned ? (
              <Text style={[Fonts.generateQuestionsText]}>You own this!</Text>
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <Text style={Fonts.generateQuestionsText}>
                  Get for {amount}
                </Text>
                <Image
                  source={require("../../assets/images/icons/gem.png")}
                  style={{
                    position: "relative",
                    width: 17,
                    height: 17,
                    resizeMode: "contain",
                    marginBottom: 2,
                    marginLeft: 2,
                  }}
                />
              </View>
            )}
          </AwesomeButton>
          {errSuccessMsg && (
            <Text
              style={[
                Fonts.displayScreensText,
                { color: Colors.errorColor, fontSize: 15 },
                errSuccessMsg == "success" && { color: Colors.successColor },
              ]}
            >
              {errSuccessMsg == "success"
                ? "Purchase successful!"
                : errSuccessMsg}
            </Text>
          )}
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: customizeable.backgroundColor
            ? customizeable.backgroundColor
            : Colors.bodyBackColor2,
        }}
      />
    </Fragment>
  );
};

function createStyles(width) {
  return StyleSheet.create({
    closeButtonStyle: {
      padding: (20.0 * width) / 414,
      zIndex: 4,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
}

export default PurchaseWithGems;
