import React, { Fragment, useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { meditationScreenCustomizeables } from "../../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import useAuth from "../../hooks/useAuth";

const ShopScreen = ({ navigation }) => {
  const initDimensions = Dimensions.get("window");
  const [width, setWidth] = useState(initDimensions.width);
  const [height, setHeight] = useState(initDimensions.height);
  const [wasPopped, setWasPopped] = useState(false);
  const { userValues } = useAuth();
  const nbGems = userValues.coins;
  const styles = createStyles(width);

  useEffect(() => {
    function onChangeDimensions({ window }) {
      const { width, height } = window;
      setWidth(width);
      setHeight(height);
    }

    const subscription = Dimensions.addEventListener(
      "change",
      onChangeDimensions
    );

    return () => subscription.remove();
  }, [setWidth, setHeight]);

  function formatNumber(num) {
    if (!num) return 0;
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 10000) {
      return (num / 1000).toFixed(2) + "k";
    } else {
      return num.toString();
    }
  }

  const [debounceFlag, setDebounceFlag] = useState(true);

  const petYogis = meditationScreenCustomizeables?.meditation?.map((item) => ({
    id: item.id,
    component: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (debounceFlag) {
            setDebounceFlag(false);

            navigation.navigate("PurchaseWithGems", {
              id: item.id,
              type: "meditation",
              amount: item.gems,
            });

            // Set a timeout to reset the debounce flag after a delay (e.g., 1000 milliseconds)
            setTimeout(() => {
              setDebounceFlag(true);
            }, 1000);
          }
        }}
        style={{
          width: width / 4 > 230 ? 250 : width / 3.3,
          paddingTop: 8,
          borderRadius: 10,
          borderWidth: 3,
          borderColor: "#39474f",
          marginTop: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
        }}
        key={item.id}
      >
        <Image
          style={{
            width: width / 4 > 230 ? 230 : width / 4,
            height: width / 4 > 230 ? 230 : width / 4,
            borderRadius: 10,
          }}
          source={item.image}
        ></Image>
        <Text style={[Fonts.purchaseScreenSubtitle, { marginTop: 5 }]}>
          {item.name}
        </Text>
        {item.gems == "Free" ||
        userValues?.customizeables?.["meditation"]?.[item.id] ? (
          <Text
            style={[
              Fonts.purchaseScreenSubtitle,
              { marginBottom: 5, color: Colors.successColor, fontSize: 12 },
            ]}
          >
            Owned
          </Text>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Text
              style={[
                Fonts.purchaseScreenSubtitle,
                { marginBottom: 5, color: "#3ec1fa" },
              ]}
            >
              {item?.gems}
            </Text>
            <View>
              <Image
                source={require("../../assets/images/icons/gem.png")}
                style={{
                  position: "relative",
                  width: 15,
                  height: 15,
                  marginBottom: 3,
                  resizeMode: "contain",
                  marginLeft: 2,
                }}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    ),
  }));

  const backgrounds = meditationScreenCustomizeables?.background?.map(
    (item) => ({
      id: item.id,
      component: (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (debounceFlag) {
              setDebounceFlag(false);
              navigation.navigate("PurchaseWithGems", {
                id: item.id,
                type: "background",
                amount: item.gems,
              });

              // Set a timeout to reset the debounce flag after a delay (e.g., 1000 milliseconds)
              setTimeout(() => {
                setDebounceFlag(true);
              }, 1000);
            }
          }}
          style={{
            width: width / 3.5 > 270 ? 290 : width / 3,
            paddingTop: 8,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: "#39474f",
            marginTop: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
          key={item.id}
        >
          <Image
            style={{
              width: width / 3.5 > 270 ? 270 : width / 3.5,
              aspectRatio: 2 / 3,
              height: undefined,
              borderRadius: 10,
            }}
            source={item.image}
          ></Image>
          <Text style={[Fonts.purchaseScreenSubtitle, { marginTop: 5 }]}>
            {item?.name}
          </Text>
          {item.gems == "Free" ||
          userValues?.customizeables?.["background"]?.[item.id] ? (
            <Text
              style={[
                Fonts.purchaseScreenSubtitle,
                { marginBottom: 5, color: Colors.successColor, fontSize: 12 },
              ]}
            >
              Owned
            </Text>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={[
                  Fonts.purchaseScreenSubtitle,
                  { marginBottom: 5, color: "#3ec1fa" },
                ]}
              >
                {item?.gems}
              </Text>
              <Image
                source={require("../../assets/images/icons/gem.png")}
                style={{
                  position: "relative",
                  width: 15,
                  height: 15,
                  marginBottom: 3,
                  resizeMode: "contain",
                  marginLeft: 2,
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      ),
    })
  );

  const music = meditationScreenCustomizeables?.music
    ?.filter((item) => {
      return item.title !== "No music";
    })
    .map((item) => ({
      id: item.id,
      component: (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (debounceFlag) {
              setDebounceFlag(false);
              navigation.navigate("PurchaseWithGems", {
                id: item.id,
                type: "music",
                amount: item.gems,
              });
              // Set a timeout to reset the debounce flag after a delay (e.g., 1000 milliseconds)
              setTimeout(() => {
                setDebounceFlag(true);
              }, 1000);
            }
          }}
          style={{
            width: width / 3.5 > 250 ? 270 : width / 3,
            paddingTop: 8,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: "#39474f",
            marginTop: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
          key={item.id}
        >
          <Image
            style={{
              width: width / 3.5 > 250 ? 250 : width / 3.5,
              height: undefined,
              aspectRatio: 4 / 3,
              borderRadius: 10,
            }}
            source={item.image}
          ></Image>
          <Text
            style={[
              Fonts.purchaseScreenSubtitle,
              { marginTop: 5, textAlign: "center" },
            ]}
          >
            {item?.name}
          </Text>
          {item.gems == "Free" ||
          userValues?.customizeables?.["music"]?.[item.id] ? (
            <Text
              style={[
                Fonts.purchaseScreenSubtitle,
                { marginBottom: 5, color: Colors.successColor, fontSize: 12 },
              ]}
            >
              Owned
            </Text>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={[
                  Fonts.purchaseScreenSubtitle,
                  {
                    marginBottom: 5,
                    color: "#3ec1fa",
                  },
                ]}
              >
                {item?.gems}
              </Text>
              <Image
                source={require("../../assets/images/icons/gem.png")}
                style={{
                  position: "relative",
                  width: 15,
                  height: 15,
                  marginBottom: 3,
                  resizeMode: "contain",
                  marginLeft: 2,
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      ),
    }));

  return (
    <Fragment>
      <StatusBar translucent={false} backgroundColor="#15a2de" />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 2,
          backgroundColor: "#15a2de",
        }}
      >
        <View
          style={{
            backgroundColor: "#15a2de",
            paddingBottom: 20,
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
                if (wasPopped) return;
                setWasPopped(true);
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
              <Text style={Fonts.streakNumberText}>{formatNumber(nbGems)}</Text>
              <Text style={Fonts.streakSecondaryText}>yogi crystals</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: width > height ? 10 : 10 * (width / 414),
              }}
            >
              <Image
                source={require("../../assets/images/icons/gem.png")}
                style={{
                  width:
                    (150.0 * width) / 414 > 200 ? 200 : (150.0 * width) / 414,
                  height:
                    (150.0 * width) / 414 > 200 ? 200 : (150.0 * width) / 414,

                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView
          style={{
            flexGrow: 1,
            backgroundColor: Colors.bodyBackColor2,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.bodyBackColor2,
              paddingTop: 18,
              paddingLeft: 5,
            }}
          >
            <Text style={[Fonts.purchaseScreenTitle, { marginLeft: 8 }]}>
              Pet Yogis
            </Text>
            <ScrollView horizontal={true}>
              {petYogis.map((item) => item.component)}
            </ScrollView>
          </View>
          <View
            style={{
              backgroundColor: Colors.bodyBackColor2,
              paddingTop: 14,
              paddingLeft: 5,
            }}
          >
            <Text style={[Fonts.purchaseScreenTitle, { marginLeft: 8 }]}>
              Sounds
            </Text>
            <ScrollView horizontal={true}>
              {music.map((item) => item.component)}
            </ScrollView>
          </View>
          <View
            style={{
              backgroundColor: Colors.bodyBackColor2,
              paddingTop: 14,
              paddingLeft: 5,
              paddingBottom: 20,
            }}
          >
            <Text style={[Fonts.purchaseScreenTitle, { marginLeft: 8 }]}>
              Backgrounds
            </Text>
            <ScrollView horizontal={true}>
              {backgrounds.map((item) => item.component)}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: Colors.bodyBackColor2 }}
      />
    </Fragment>
  );
};

function createStyles(width) {
  return StyleSheet.create({
    closeButtonStyle: {
      margin: (20.0 * width) / 414 > 30 ? 30 : (20.0 * width) / 414,
      zIndex: 4,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });
}

export default ShopScreen;
