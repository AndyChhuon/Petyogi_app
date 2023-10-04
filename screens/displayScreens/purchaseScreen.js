import React, { Fragment, useState, useEffect } from "react";

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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/styles";
import { purchaseScreenCTA } from "../../constants/constants";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import Purchases from "react-native-purchases";
import { showMessage } from "react-native-flash-message";
import FloatingAnimation from "../../Animations/FloatingAnimation";
import Lottie from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const ShopScreen = ({ navigation }) => {
  const {
    userValues,
    isWaitingOnEmailVerification,
    currentOffering,
    loadingModalVisible,
    setLoadingModalVisible,
    checkIfUserHasCredits,
    user,
    creditsObj,
    revenueCatInitialized,
  } = useAuth();
  const { remainingCredits, accountType, hasFreeTrial } = userValues;
  const [newlyPurchased, setNewlyPurchased] = useState(false);
  const [hasTriedAgain, setHasTriedAgain] = useState(false);

  const tutorialShouldShow =
    userValues.numMeditations === 0 &&
    userValues.remainingCredits == 0 &&
    !isWaitingOnEmailVerification;

  const noCreditsLeft = remainingCredits == 0;
  const subscriptionWithPrevDate = creditsObj?.subscriptionWithPrevDate
    ? creditsObj?.subscriptionWithPrevDate
    : ["noSubscription", new Date()];

  const accountPlan =
    subscriptionWithPrevDate[0] != "noSubscription"
      ? subscriptionWithPrevDate[0]
      : accountType == "freeVerified"
      ? hasFreeTrial
        ? "freeVerifiedTrial"
        : "freeVerifiedNoTrial"
      : accountType;

  const hoursIncrementBySubscriptionType = {
    sloth_plan: 48,
    turtle_plan: 24,
    yogi_plan: 12,
  };

  useEffect(() => {
    if (!revenueCatInitialized) {
      setLoadingModalVisible(true);
    }
  }, []);

  const getTimeRemaining = (date, subscriptionType) => {
    const nextDate = new Date(date);

    nextDate.setHours(
      nextDate.getHours() + hoursIncrementBySubscriptionType[subscriptionType]
    );

    const minutesLeft = (nextDate - new Date()) / 1000 / 60;

    if (minutesLeft < 0) {
      return "0 minutes";
    } else if (minutesLeft > 60) {
      return Math.ceil(minutesLeft / 60) + " hours";
    } else {
      return Math.ceil(minutesLeft) + " minutes";
    }
  };

  const timeRemaining =
    subscriptionWithPrevDate[0] != "noSubscription" && !newlyPurchased
      ? getTimeRemaining(
          subscriptionWithPrevDate[1],
          subscriptionWithPrevDate[0]
        )
      : "";

  const handlePurchase = async (packageID, isTopUp = false) => {
    if (loadingModalVisible) return;
    setLoadingModalVisible(true);
    Purchases.purchasePackage(packageID)
      .then((purchase) => {
        checkIfUserHasCredits(user);
        setNewlyPurchased(true);
      })
      .catch((err) => {
        if (!err.userCancelled && err.code != 15) {
          if (!hasTriedAgain) {
            setHasTriedAgain(true);
            setTimeout(() => {
              checkIfUserHasCredits(user);
            }, 1000);
          } else {
            showMessage({
              message:
                "There was an error purchasing the subscription plan. Try reloading app.",
              type: "danger",
            });
          }
        }
        if (err.userCancelled) {
          showMessage({
            message: "Purchase cancelled.",
            type: "warning",
          });
        }
        if (err.code != 15) setLoadingModalVisible(false);
      });
  };

  const onUpgradeClick = () => {
    if (accountPlan == "free") {
      navigation.navigate("Verification");
    } else if (accountPlan == "freeVerifiedTrial") {
      handlePurchase(
        currentOffering?.availablePackages.find(
          (item) => item.identifier === "Turtle Plan"
        )
      );
    } else if (
      accountPlan == "freeVerifiedNoTrial" ||
      accountPlan == "sloth_plan"
    ) {
      handlePurchase(
        currentOffering?.availablePackages.find(
          (item) => item.identifier === "Turtle Plan"
        )
      );
    } else if (accountPlan == "turtle_plan") {
      handlePurchase(
        currentOffering?.availablePackages.find(
          (item) => item.identifier === "Yogi Plan"
        )
      );
    }
  };

  return (
    <Fragment>
      <StatusBar translucent={false} backgroundColor="#5f94ae" />
      <SafeAreaView style={{ flex: 0, backgroundColor: "#5f94ae" }} />
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          zIndex: 2,
          backgroundColor: Colors.bodyBackColor2,
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
            style={[Fonts.displayScreensText, { flex: 1, textAlign: "center" }]}
          >
            Meditations
          </Text>
          <Ionicons
            name="share-outline"
            color={Colors.whiteDarker}
            size={32}
            style={{ opacity: 0 }}
          />
        </View>
        <View
          style={{
            paddingBottom: (12 * height) / 850,
            borderBottomWidth: 2,
            borderBottomColor: "#121f24",
            backgroundColor: "#5f94ae",
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
              <Text style={Fonts.streakNumberText}>{remainingCredits}</Text>
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
                }}
              />
            </View>
          </View>
          <View
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
                style={[Fonts.purchaseScreenDescription, { fontSize: 16.5 }]}
              >
                {purchaseScreenCTA[accountPlan]?.noCreditsText}
                {subscriptionWithPrevDate[0] != "noSubscription" &&
                  ` Less than ${timeRemaining} before your next credit fill.`}
              </Text>
              <TouchableOpacity
                style={
                  purchaseScreenCTA[accountPlan]?.noCreditsCTA
                    ? {}
                    : { display: "none" }
                }
                onPress={onUpgradeClick}
              >
                <Text
                  style={[
                    Fonts.purchaseScreenTitle,
                    { fontSize: 17, color: "#42c2fa", marginTop: 9 },
                  ]}
                >
                  {purchaseScreenCTA[accountPlan]?.noCreditsCTA}
                </Text>
                {tutorialShouldShow && (
                  <FloatingAnimation
                    style={{
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                      bottom: -(30.0 * width) / 414,
                      paddingLeft: (28.0 * width) / 414,
                    }}
                    duration={1200}
                  >
                    <Lottie
                      source={require("../../assets/Lottie/click.json")}
                      style={{
                        position: "relative",
                        width: (60.0 * width) / 414,
                        height: (60.0 * width) / 414,
                        resizeMode: "contain",
                      }}
                      speed={0.5}
                      autoPlay
                      loop
                    />
                  </FloatingAnimation>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            flexGrow: 1,
            backgroundColor: Colors.bodyBackColor2,
            paddingTop: 5,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                width: "100%",
                marginTop: 9,
                display: "flex",
                minHeight:
                  accountPlan == "yogi_plan" ? width / 3.5 : width / 2.2,
                backgroundColor: "#262674",
              }}
            >
              <ImageBackground
                source={purchaseScreenCTA[accountPlan]?.background}
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
                      {purchaseScreenCTA[accountPlan]?.title}
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
                      {purchaseScreenCTA[accountPlan]?.subtitleOne}{" "}
                      <Text style={Fonts.decriptionSemiBold}>
                        {purchaseScreenCTA[accountPlan]?.subtitleBold}
                      </Text>{" "}
                      {purchaseScreenCTA[accountPlan]?.subtitleTwo}
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
                    source={purchaseScreenCTA[accountPlan]?.image}
                  ></Image>
                </View>
                <AwesomeButton
                  backgroundColor="#f1f6fb"
                  borderColor={purchaseScreenCTA[accountPlan]?.borderColor}
                  backgroundDarker={
                    purchaseScreenCTA[accountPlan]?.backgroundDarker
                  }
                  borderWidth={2}
                  paddingHorizontal={0}
                  borderRadius={8}
                  raiseLevel={3}
                  width="100%"
                  height={width / 8}
                  style={
                    accountPlan == "yogi_plan"
                      ? { display: "none" }
                      : { marginTop: 5 }
                  }
                  onPress={() => {
                    onUpgradeClick();
                  }}
                >
                  <Text style={Fonts.tryForFreeButton}>
                    {purchaseScreenCTA[accountPlan]?.cta}
                  </Text>
                </AwesomeButton>
              </ImageBackground>
            </View>

            <Text style={[Fonts.purchaseScreenTitle, { marginTop: 10 }]}>
              Subscription Plans
              <Text style={[Fonts.purchaseScreenSubtitle]}>*</Text>
            </Text>

            <TouchableOpacity
              style={
                accountPlan == "sloth_plan" ||
                accountPlan == "yogi_plan" ||
                accountPlan == "turtle_plan"
                  ? { opacity: 0.5 }
                  : { opacity: 1 }
              }
              activeOpacity={
                accountPlan == "sloth_plan" ||
                accountPlan == "yogi_plan" ||
                accountPlan == "turtle_plan"
                  ? 0.5
                  : 0.8
              }
              onPress={() => {
                if (
                  accountPlan == "sloth_plan" ||
                  accountPlan == "yogi_plan" ||
                  accountPlan == "turtle_plan"
                )
                  return;
                handlePurchase(
                  currentOffering?.availablePackages.find(
                    (item) => item.identifier === "Sloth Plan"
                  )
                );
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
                accountPlan == "turtle_plan" || accountPlan == "yogi_plan"
                  ? { opacity: 0.5 }
                  : { opacity: 1 }
              }
              activeOpacity={
                accountPlan == "turtle_plan" || accountPlan == "yogi_plan"
                  ? 0.5
                  : 0.8
              }
              onPress={() => {
                if (accountPlan == "turtle_plan" || accountPlan == "yogi_plan")
                  return;
                handlePurchase(
                  currentOffering?.availablePackages.find(
                    (item) => item.identifier === "Turtle Plan"
                  )
                );
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
                accountPlan == "yogi_plan" ? { opacity: 0.5 } : { opacity: 1 }
              }
              activeOpacity={accountPlan == "yogi_plan" ? 0.5 : 0.8}
              onPress={() => {
                if (accountPlan == "yogi_plan") return;
                handlePurchase(
                  currentOffering?.availablePackages.find(
                    (item) => item.identifier === "Yogi Plan"
                  )
                );
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
              <Text style={[Fonts.purchaseScreenSubtitle]}>*</Text>
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  handlePurchase(
                    currentOffering?.availablePackages.find(
                      (item) => item.identifier === "3_credits"
                    ),
                    true
                  )
                }
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
                onPress={() =>
                  handlePurchase(
                    currentOffering?.availablePackages.find(
                      (item) => item.identifier === "8_credits"
                    ),
                    true
                  )
                }
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
                onPress={() =>
                  handlePurchase(
                    currentOffering?.availablePackages.find(
                      (item) => item.identifier === "22_credits"
                    ),
                    true
                  )
                }
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
                  $17.99
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                Fonts.purchaseScreenDescription,
                { paddingTop: 8, fontSize: 12 },
              ]}
            >
              * prices may fluctuate based on location
            </Text>
            <Text
              style={[
                Fonts.purchaseScreenDescription,
                { paddingBottom: 35, paddingTop: 2, fontSize: 12 },
              ]}
            >
              * max accumulated credits are credits given while offline, resets
              every month.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  closeButtonStyle: {
    paddingHorizontal: (20.0 * width) / 414,
    paddingVertical: (5.0 * width) / 414,
    zIndex: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5f94ae",
  },
  BackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 10,
  },
});

export default ShopScreen;
