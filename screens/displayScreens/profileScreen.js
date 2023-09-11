import React, { Fragment, useEffect } from "react";

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
import Dialog from "react-native-dialog";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { purchaseScreenCTA } from "../../constants/constants";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";

const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const { userValues, reloadUser, isWaitingOnEmailVerification } = useAuth();
  const { remainingCredits, accountType, hasFreeTrial, coins, streak } =
    userValues;
  const accountPlan =
    accountType == "freeVerified"
      ? hasFreeTrial
        ? "freeVerifiedTrial"
        : "freeVerifiedNoTrial"
      : accountType;

  const noCreditsLeft = remainingCredits == 0;

  useEffect(() => {
    if (isWaitingOnEmailVerification) {
      reloadUser();
    }
  }, []);

  return (
    <Fragment>
      <StatusBar translucent={false} backgroundColor={Colors.bodyBackColor2} />
      <SafeAreaView
        style={{ flex: 0, backgroundColor: Colors.bodyBackColor2 }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 2,
          backgroundColor: Colors.bodyBackColor2,
        }}
      >
        <View style={{ borderBottomWidth: 2, borderBottomColor: "#53666c" }}>
          <Text
            style={[
              Fonts.displayScreensText,
              {
                paddingBottom: (12 * height) / 850,
                textAlign: "center",
              },
            ]}
          >
            Profile
          </Text>
        </View>
        <View>
          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Account delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this account? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Button
              label="Cancel"
              onPress={() => setDialogVisible(false)}
            />
            <Dialog.Button
              color="red"
              label="Delete"
              onPress={() => setDialogVisible(false)}
            />
          </Dialog.Container>
        </View>

        <ScrollView
          style={{
            flexGrow: 1,
            backgroundColor: Colors.bodyBackColor2,
            paddingTop: 5,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("PurchaseScreen");
            }}
            style={{ marginHorizontal: 10 }}
          >
            <View
              style={{
                width: "100%",
                marginTop: 9,
                display: "flex",
              }}
            >
              <View
                style={{
                  paddingVertical: (12 * height) / 850,
                  borderBottomWidth: 2,
                  borderBottomColor: "#121f24",
                  backgroundColor: "#5760b5",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#39474f",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={Fonts.streakNumberText}>
                      {remainingCredits}
                    </Text>
                    <Text style={[Fonts.streakSecondaryText, { fontSize: 21 }]}>
                      Meditation credits
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/icons/tiger_meditation.jpg")}
                      style={{
                        width: noCreditsLeft
                          ? (130.0 * width) / 414
                          : (140.0 * width) / 414,
                        height: noCreditsLeft
                          ? (130.0 * width) / 414
                          : (140.0 * width) / 414,
                        borderRadius: 20,
                        resizeMode: "contain",
                        borderColor: Colors.bodyBackColor,
                        borderWidth: 2,
                        //grey out
                      }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={
                    noCreditsLeft
                      ? {
                          backgroundColor: Colors.bodyBackColor2,
                          flexDirection: "row",
                          marginHorizontal: 10,
                          paddingLeft: 8,
                          paddingRight: 15,
                          paddingVertical: 15,
                          marginTop: 10,
                          borderRadius: 7,
                        }
                      : { display: "none" }
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      marginTop: 2,
                      paddingRight: 2,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/icons/bell_red.png")}
                      style={{
                        width: (32.0 * width) / 414,
                        height: (32.0 * width) / 414,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                  <View style={{ flex: 6 }}>
                    <Text
                      style={[
                        Fonts.purchaseScreenDescription,
                        { fontSize: 16.5 },
                      ]}
                    >
                      {purchaseScreenCTA[accountPlan].noCreditsText}
                    </Text>
                    <TouchableOpacity
                      style={
                        purchaseScreenCTA[accountPlan].noCreditsCTA
                          ? {}
                          : { display: "none" }
                      }
                    >
                      <Text
                        style={[
                          Fonts.purchaseScreenTitle,
                          { fontSize: 17, color: "#42c2fa", marginTop: 9 },
                        ]}
                      >
                        {purchaseScreenCTA[accountPlan].noCreditsCTA}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("StreakScreen");
            }}
            style={{ marginHorizontal: 10 }}
          >
            <View
              style={{
                width: "100%",
                marginTop: 9,
                display: "flex",
              }}
            >
              <View
                style={{
                  paddingVertical: (8 * height) / 850,
                  borderBottomWidth: 2,
                  borderBottomColor: "#121f24",
                  backgroundColor: "#feaa34",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#39474f",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={Fonts.streakNumberText2}>{streak}</Text>
                    <Text style={Fonts.streakSecondaryText2}>day streak!</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/icons/streak.png")}
                      style={{
                        width: (115.0 * width) / 414,
                        height: (115.0 * width) / 414,
                        marginVertical: 10,
                        resizeMode: "contain",
                        //grey out
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("ShopScreen");
            }}
            style={{ marginHorizontal: 10 }}
          >
            <View
              style={{
                width: "100%",
                marginTop: 9,
                display: "flex",
              }}
            >
              <View
                style={{
                  paddingVertical: (12 * height) / 850,
                  borderBottomWidth: 2,
                  borderBottomColor: "#121f24",
                  backgroundColor: "#15a2de",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#39474f",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={Fonts.streakNumberText2}>{coins}</Text>
                    <Text style={Fonts.streakSecondaryText2}>
                      yogi crystals
                    </Text>
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
                        width: (115.0 * width) / 414,
                        height: (115.0 * width) / 414,
                        resizeMode: "contain",
                        //grey out
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{ marginHorizontal: 10 }}>
            <Text style={[Fonts.purchaseScreenTitle, { marginTop: 8 }]}>
              Current Plan
            </Text>
            <View
              style={{
                width: "100%",
                marginTop: 9,
                display: "flex",
                minHeight:
                  accountPlan == "yogiPlan" ? width / 3.5 : width / 2.2,
                backgroundColor: "#262674",
              }}
            >
              <ImageBackground
                source={purchaseScreenCTA[accountPlan].background}
                style={[
                  styles.BackgroundImage,
                  { borderRadius: 10, borderWidth: 3, borderColor: "#39474f" },
                ]}
                borderRadius={6}
                backgroundColor="none"
              >
                <View
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ marginRight: 4 }}>
                    <Text style={[Fonts.tryForFreeTitle, { marginLeft: 8 }]}>
                      {purchaseScreenCTA[accountPlan].title}
                    </Text>
                    <Text
                      style={[
                        Fonts.purchaseScreenDescription,
                        {
                          marginLeft: 8,
                          paddingTop: 5,
                          flexGrow: 1,
                          width: width - width / 4 - 46,
                        },
                      ]}
                    >
                      {purchaseScreenCTA[accountPlan].subtitleOne}{" "}
                      <Text style={Fonts.decriptionSemiBold}>
                        {purchaseScreenCTA[accountPlan].subtitleBold}
                      </Text>{" "}
                      {purchaseScreenCTA[accountPlan].subtitleTwo}
                    </Text>
                  </View>
                  <Image
                    style={{
                      width: width / 4.5,
                      height: width / 4.5,
                      borderRadius: 10,
                      borderColor: Colors.bodyBackColor,
                      borderWidth: 2,
                    }}
                    source={purchaseScreenCTA[accountPlan].image}
                  ></Image>
                </View>
                <AwesomeButton
                  backgroundColor="#f1f6fb"
                  borderColor={purchaseScreenCTA[accountPlan].borderColor}
                  backgroundDarker={
                    purchaseScreenCTA[accountPlan].backgroundDarker
                  }
                  borderWidth={2}
                  paddingHorizontal={0}
                  borderRadius={8}
                  raiseLevel={3}
                  width="100%"
                  height={width / 8}
                  style={
                    accountPlan == "yogiPlan"
                      ? { display: "none" }
                      : { marginTop: 5 }
                  }
                  onPress={() => {
                    navigation.navigate("Verification");
                  }}
                >
                  <Text style={Fonts.tryForFreeButton}>
                    {purchaseScreenCTA[accountPlan].cta}
                  </Text>
                </AwesomeButton>
              </ImageBackground>
            </View>

            <Text style={[Fonts.purchaseScreenTitle, { marginTop: 10 }]}>
              Subscription Plans
            </Text>
            <TouchableOpacity
              style={
                accountPlan == "slothPlan" ? { opacity: 0.5 } : { opacity: 1 }
              }
              activeOpacity={accountPlan == "slothPlan" ? 0.5 : 0.8}
              onPress={() => {
                if (accountPlan == "slothPlan") return;
                setDialogVisible(true);
              }}
            >
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/sloth_meditating.png")}
                ></Image>
                <View
                  style={{
                    width: width - width / 4 - 36,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={[Fonts.purchaseScreenSubtitle, { marginLeft: 10 }]}
                  >
                    Sloth Plan
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenDescription,
                      {
                        marginLeft: 10,
                        paddingTop: 5,
                        flexGrow: 1,
                        width: width - width / 4 - 46,
                      },
                    ]}
                  >
                    For the casual meditator.{" "}
                    <Text style={Fonts.decriptionSemiBold}>
                      1 credit every 2 days.
                    </Text>{" "}
                    Max accumulated credits:{" "}
                    <Text style={Fonts.decriptionSemiBold}>3</Text>.
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenPricing,
                      {
                        marginLeft: 10,
                        width: width - width / 4 - 46,
                        color: "#dc9afe",
                      },
                    ]}
                  >
                    $9.99
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                accountPlan == "turtlePlan" ? { opacity: 0.5 } : { opacity: 1 }
              }
              activeOpacity={accountPlan == "turtlePlan" ? 0.5 : 0.8}
              onPress={() => {
                if (accountPlan == "turtlePlan") return;
                setDialogVisible(true);
              }}
            >
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/turtle_meditating.png")}
                ></Image>
                <View
                  style={{
                    width: width - width / 4 - 36,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={[Fonts.purchaseScreenSubtitle, { marginLeft: 10 }]}
                  >
                    Turtle Plan
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenDescription,
                      {
                        marginLeft: 10,
                        paddingTop: 5,
                        flexGrow: 1,
                        width: width - width / 4 - 46,
                      },
                    ]}
                  >
                    For the regular meditator.{" "}
                    <Text style={Fonts.decriptionSemiBold}>
                      1 credit per day.
                    </Text>{" "}
                    Max accumulated credits:{" "}
                    <Text style={Fonts.decriptionSemiBold}>5</Text>.
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenPricing,
                      {
                        marginLeft: 10,
                        width: width - width / 4 - 46,
                        color: "#66feff",
                      },
                    ]}
                  >
                    $12.99
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                accountPlan == "yogiPlan" ? { opacity: 0.5 } : { opacity: 1 }
              }
              activeOpacity={accountPlan == "yogiPlan" ? 0.5 : 0.8}
              onPress={() => {
                if (accountPlan == "yogiPlan") return;
                setDialogVisible(true);
              }}
            >
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/dog_meditating.png")}
                ></Image>
                <View
                  style={{
                    width: width - width / 4 - 36,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={[Fonts.purchaseScreenSubtitle, { marginLeft: 10 }]}
                  >
                    Yogi Plan
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenDescription,
                      {
                        marginLeft: 10,
                        paddingTop: 5,
                        flexGrow: 1,
                        width: width - width / 4 - 46,
                      },
                    ]}
                  >
                    For the dedicated meditator.{" "}
                    <Text style={Fonts.decriptionSemiBold}>
                      2 credits per day.
                    </Text>{" "}
                    Max accumulated credits:{" "}
                    <Text style={Fonts.decriptionSemiBold}>8</Text>.
                  </Text>
                  <Text
                    style={[
                      Fonts.purchaseScreenPricing,
                      {
                        marginLeft: 10,
                        width: width - width / 4 - 46,
                        color: "#a6dcf4",
                      },
                    ]}
                  >
                    $14.99
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={[Fonts.purchaseScreenTitle, { paddingTop: 20 }]}>
              Credit Top-Up
            </Text>
            <View
              style={{
                paddingBottom: 35,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDialogVisible(true)}
                style={{
                  width: width / 3.3,
                  paddingTop: 8,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/cat_holding_bones.png")}
                ></Image>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginTop: 5 },
                  ]}
                >
                  3 Credits
                </Text>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginBottom: 5, color: "#3ec1fa" },
                  ]}
                >
                  $3.99
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDialogVisible(true)}
                style={{
                  width: width / 3.3,
                  paddingTop: 8,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/red_panda_holding_bamboo.png")}
                ></Image>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginTop: 5 },
                  ]}
                >
                  8 Credits
                </Text>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginBottom: 5, color: "#3ec1fa" },
                  ]}
                >
                  $7.99
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDialogVisible(true)}
                style={{
                  width: width / 3.3,
                  paddingTop: 8,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#39474f",
                  marginTop: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 10,
                  }}
                  source={require("../../assets/images/purchaseScreen/hamster_holding_seeds.png")}
                ></Image>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginTop: 5 },
                  ]}
                >
                  22 Credits
                </Text>
                <Text
                  style={[
                    Fonts.purchaseScreenSubtitle,
                    { marginLeft: 10, marginBottom: 5, color: "#3ec1fa" },
                  ]}
                >
                  $15.99
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 10,
  },
});

export default ProfileScreen;
