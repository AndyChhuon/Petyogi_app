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

const HomeScreen = ({ navigation }) => {
  const [dayMode, setDayMode] = useState(false);

  const onModeChange = () => {
    setDayMode(!dayMode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#212f36" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {userInfo()}
        <ImageBackground
          source={
            dayMode
              ? require("../../assets/Day_Background.png")
              : require("../../assets/Night_Background.png")
          }
          style={styles.BackgroundImage}
          backgroundColor="none"
        >
          <FlatList
            //   style={{ backgroundColor: "#64ABE3" }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View
                style={{
                  marginTop: (10 * width) / 414,
                  marginLeft: (5 * width) / 414,
                  marginRight: (5 * width) / 414,
                }}
              >
                {Button()}
              </View>
            }
          />
        </ImageBackground>
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
              marginLeft: ((Sizes.fixPadding + 5.0) * width) / 414,
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
                  style={{
                    width: (14.0 * width) / 414,
                    height: (20.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginLeft: ((Sizes.fixPadding - 5.0) * width) / 414,
                    ...Fonts.whiteColor20Bold,
                    fontSize: (20.0 * width) / 414,
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
                  style={{
                    width: (14.0 * width) / 414,
                    height: (20.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginLeft: ((Sizes.fixPadding - 5.0) * width) / 414,
                    ...Fonts.whiteColor20Bold,
                    fontSize: (20.0 * width) / 414,
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
                  style={{
                    width: (14.0 * width) / 414,
                    height: (20.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    marginLeft: ((Sizes.fixPadding - 5.0) * width) / 414,
                    ...Fonts.whiteColor20Bold,
                    fontSize: (20.0 * width) / 414,
                  }}
                >
                  5
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onModeChange()}
                style={styles.notificationIconWrapStyle}
              >
                <Image
                  source={
                    dayMode
                      ? require("../../assets/images/icons/sun.png")
                      : require("../../assets/images/icons/moon.png")
                  }
                  style={{
                    width: (22.0 * width) / 414,
                    height: (22.0 * width) / 414,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
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
      raiseLevel={(8 * width) / 414}
      width={width / 6}
      height={width / 6}
    >
      <Text
        style={{
          ...Fonts.blackMicroma,
          fontSize: (25 * width) / 414,
        }}
      >
        1
      </Text>
    </AwesomeButton>
  );
}

const styles = StyleSheet.create({
  notificationIconWrapStyle: {
    borderRadius: (Sizes.fixPadding * width) / 414,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: (40.0 * width) / 414,
    height: (40.0 * width) / 414,
  },
  userImageStyle: {
    width: (50.0 * width) / 414,
    height: (50.0 * width) / 414,
    borderRadius: (25.0 * width) / 414,
    borderColor: Colors.primaryColor,
    borderWidth: (1.5 * width) / 414,
  },
  userInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: (Sizes.fixPadding * 1.5 * width) / 414,
    paddingBottom: (5 * width) / 414,
  },
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default HomeScreen;
