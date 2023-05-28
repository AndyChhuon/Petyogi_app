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
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import AwesomeButton from "react-native-really-awesome-button";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [dayMode, setDayMode] = useState(false);

  const onModeChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDayMode(!dayMode);
  };

  return (
    <SafeAreaView
      style={
        dayMode
          ? { flex: 1, backgroundColor: "#f9c96c" }
          : { flex: 1, backgroundColor: "#535cb3" }
      }
    >
      <ImageBackground
        source={
          dayMode
            ? require("../../assets/Day_Background.png")
            : require("../../assets/Night_Background.png")
        }
        style={styles.BackgroundImage}
        backgroundColor="none"
      >
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {userInfo()}
          <FlatList
            //   style={{ backgroundColor: "#64ABE3" }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View
                style={{
                  marginTop: (10 * width) / 414,
                  marginLeft: (80 * width) / 414,
                  marginRight: (80 * width) / 414,
                }}
              >
                {Button(1)}
                {Button(2)}
              </View>
            }
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

  function userInfo() {
    return (
      <View style={styles.userInfoWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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

function Button(number) {
  return (
    <View width={width / 6}>
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
          {number}
        </Text>
      </AwesomeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  topBarStyle: {},
  notificationIconWrapStyle: {
    borderRadius: (Sizes.fixPadding * width) / 414,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
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
    padding: (Sizes.fixPadding * 1.5 * width) / 414,
    paddingTop: 3,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default HomeScreen;
