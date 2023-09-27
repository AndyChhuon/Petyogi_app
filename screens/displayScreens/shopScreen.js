import React, { Fragment, useEffect } from "react";

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
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes, Fonts } from "../../constants/styles";
const { width, height } = Dimensions.get("window");
import useAuth from "../../hooks/useAuth";

const ShopScreen = ({ navigation }) => {
  const { userValues } = useAuth();
  const nbGems = userValues.coins;

  return (
    <Fragment>
      <StatusBar translucent={false} backgroundColor="#15a2de" />
      <SafeAreaView style={{ flex: 0, backgroundColor: "#15a2de" }} />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 2,
          backgroundColor: Colors.bodyBackColor2,
        }}
      >
        <View
          style={{
            backgroundColor: "#15a2de",
            paddingBottom: 28,
            borderBottomWidth: 2,
            borderBottomColor: "#121f24",
          }}
        >
          <View style={[styles.closeButtonStyle]}>
            <Ionicons
              name="close"
              color={Colors.whiteDarker}
              size={32}
              onPress={() => {
                navigation.pop();
              }}
            />
            <Text
              style={[
                Fonts.displayScreensText,
                { flex: 1, textAlign: "center" },
              ]}
            >
              Shop
            </Text>
            <Ionicons
              name="share-outline"
              color={Colors.whiteDarker}
              size={32}
              style={{ opacity: 0 }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={Fonts.streakNumberText}>{nbGems}</Text>
              <Text style={Fonts.streakSecondaryText}>yogi crystals</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/images/icons/gem.png")}
                style={{
                  width: (150.0 * width) / 414,
                  height: (150.0 * width) / 414,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            backgroundColor: Colors.bodyBackColor2,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text style={Fonts.streakPrimaryText}>Shop coming soon!</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  closeButtonStyle: {
    margin: (20.0 * width) / 414,
    zIndex: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ShopScreen;
