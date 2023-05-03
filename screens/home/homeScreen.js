import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel-v4";
import { BottomSheet } from "@rneui/themed";
import Dialog from "react-native-dialog";
import AwesomeButton from "react-native-really-awesome-button";

const { width } = Dimensions.get("window");

const itemWidth = Math.round(width * 0.8);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212f36" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {userInfo()}
        <FlatList
          //   style={{ backgroundColor: "#64ABE3" }}
          style={{ backgroundColor: "#64ABE3" }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
              {Button()}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );

  function userInfo() {
    return (
      <View style={styles.userInfoWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/users/user1.png")}
            style={styles.userImageStyle}
          />
          <View
            style={{
              marginLeft: Sizes.fixPadding + 5.0,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/icons/eth.png")}
                  style={{ width: 14.0, height: 20.0, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    marginLeft: Sizes.fixPadding - 5.0,
                    ...Fonts.whiteColor20Bold,
                  }}
                >
                  5
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/icons/eth.png")}
                  style={{ width: 14.0, height: 20.0, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    marginLeft: Sizes.fixPadding - 5.0,
                    ...Fonts.whiteColor20Bold,
                  }}
                >
                  5
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/icons/eth.png")}
                  style={{ width: 14.0, height: 20.0, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    marginLeft: Sizes.fixPadding - 5.0,
                    ...Fonts.whiteColor20Bold,
                  }}
                >
                  5
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

function Button() {
  return (
    <AwesomeButton
      backgroundColor={Colors.goldColor}
      borderRadius={100}
      raiseLevel={8}
      width={70}
      height={70}
    >
      <Text
        style={{
          ...Fonts.blackMicroma,
        }}
      >
        1
      </Text>
    </AwesomeButton>
  );
}

const styles = StyleSheet.create({
  notificationIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  userImageStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.5,
  },
  userInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: Sizes.fixPadding * 1.5,
    paddingBottom: 5,
  },
  bannerImageStyle: {
    width: itemWidth,
    height: 150,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bannerCategoryWrapStyle: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: Sizes.fixPadding * 2.8,
    paddingVertical: Sizes.fixPadding - 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
  },
  auctionImageStyle: {
    height: 200.0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
  },
  auctionDetailWrapStyle: {
    marginTop: Sizes.fixPadding - 18.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeLeftWrapStyle: {
    alignSelf: "flex-start",
    marginTop: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding - 7.0,
  },
  titleWrapStyle: {
    marginBottom: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  favoriteAndShareIconWrapStyle: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  timeLeftAndFavoriteShareIconWrapStyle: {
    marginHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomSheetWrapStyle: {
    paddingHorizontal: 20.0,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding * 2.0,
    borderTopLeftRadius: Sizes.fixPadding * 3.0,
    borderTopRightRadius: Sizes.fixPadding * 3.0,
    backgroundColor: Colors.bodyBackColor,
  },
  createNewButtonWrapStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding,
  },
  dialogWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    width: width - 40,
    padding: 0.0,
  },
  collectionNameFieldStyle: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    ...Fonts.grayColor12Regular,
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding * 3.0,
  },
  createCollectionButtonStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContentWrapStyle: {
    paddingTop: Sizes.fixPadding + 5.0,
    paddingBottom: Sizes.fixPadding * 3.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.bodyBackColor,
  },
  favoriteAndShareIconContainStyle: {
    backgroundColor: "rgba(255,255,255,0.07)",
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
