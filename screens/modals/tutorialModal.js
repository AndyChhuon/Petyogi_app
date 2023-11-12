import React, { useEffect, useState, useRef } from "react";

import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  AppState,
} from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import ScaleInOut from "../../Animations/ScaleInOut";
import * as Haptics from "expo-haptics";
import { useNavigationState } from "@react-navigation/native";
import Purchases from "react-native-purchases";
import { surprisedImage } from "../../constants/constants";

const { width, height } = Dimensions.get("window");

const TutorialModal = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [displayTutorial, setDisplayTutorial] = useState(false);
  const [lastCheck, setLastCheck] = useState(Date.now());
  const [shouldCheckUpdateCredits, setShouldCheckUpdateCredits] =
    useState(false);
  const state = useNavigationState((state) => state);
  const {
    userValues,
    user,
    isWaitingOnEmailVerification,
    reloadUser,
    updateTutorialModalVisible,
    setUpdateTutorialModalVisible,
    setLoadingModalVisible,
    revenueCatInitialized,
    streakObj,
    checkIfUserHasCreditsCalled,
    checkIfUserHasCredits,
    setRevenueCatCustomerInfo,
    creditsObj,
    checkStreaks,
    pushLogsToServer,
    addToUserLogs,
    userLogs,
  } = useAuth();

  const email = user?.email;

  const routeObj = state?.routes[state.routes.length - 1];
  const isTutorial =
    userValues?.numMeditations == 0 ||
    (updateTutorialModalVisible && updateTutorialModalVisible != "none");
  const isVerified = userValues?.remainingCredits > 0;

  const subscriptionWithPrevDate = creditsObj?.subscriptionWithPrevDate
    ? creditsObj?.subscriptionWithPrevDate
    : ["noSubscription", new Date()];

  const creditsDelay = 200;
  const [nbGemsToDisplay, setNbGemsToDisplay] = useState(0);
  const [newGemsImageIndex, setNewGemsImageIndex] = useState(0);

  const tutorialObj = {
    welcome: {
      title: "Welcome fellow Yogi!",
      text: "I am PetYogi",
      bottomText: "Let me introduce you!",
      image: require("../../assets/images/icons/heart.png"),
      nextModal: "verifyEmailHome",
      displayType: "center",
    },

    gem: {
      title: "PetYogi found new gems!",
      text: `Claimed: ${nbGemsToDisplay}`,
      bottomText: "Thank you for meditating!",
      image: require("../../assets/images/icons/gem.png"),
      displayType: "center",
    },

    verifyEmailHome: {
      title: "Let's get started!",
      text: "You have no meditation credits. Press on the icon above and claim some!",
      image: require("../../assets/images/tutorialModal/surprised_panda.png"),
    },
    verifyEmailPurchase: {
      title: "Claim your credits!",
      text: "Press VERIFY ACCOUNT and claim your 2 free meditation credits!",
      image: require("../../assets/images/tutorialModal/excited_monkey.png"),
      colorTop: "#fbdc6a",
      colorBottom: Colors.goldColor,
    },
    verifyEmailSent: {
      title: "Verify your email!",
      text: `An email has been sent to your inbox at ${email}. Go claim your 2 free credits!`,
      image: require("../../assets/images/tutorialModal/happy_monkey.png"),
      colorTop: "#5f94ae",
      colorBottom: "#b7dffd",
    },
    firstMeditation: {
      title: "Your first meditation!",
      text: "You are set to generate your first meditation! Start by pressing the button above.",
      image: require("../../assets/images/tutorialModal/meditating_bear.png"),
      colorTop: "#FFA226",
      colorBottom: "#FFE5AB",
    },
    meditationTutorialQuestions: {
      title: "Journal your emotions!",
      text: "PetYogi will generate the perfect meditation based on your journal entry!",
      image: require("../../assets/images/tutorialModal/meditating_bear_2.png"),
      colorTop: "#00CCBB",
      colorBottom: "#A0DED9",
    },
    meditationLoading: {
      title: "Your meditation begins!",
      text: "While PetYogi generates your personalized meditation, listen to these tips and relax!",
      image: require("../../assets/images/tutorialModal/relaxing_panda.png"),
      colorTop: "#FFA226",
      colorBottom: "#FFE5AB",
    },
    meditationTutorialIcons: {
      title: "Customize your meditation!",
      text: "Feel free to change the background, PetYogi avatar, or music, with the icons above!",
      image: require("../../assets/images/tutorialModal/relaxing_panda.png"),
      colorTop: "#00CCBB",
      colorBottom: "#A0DED9",
    },
  };
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // from background to active, sync purchases and check if user has credits
      if (appState.current === "background" && nextAppState === "active") {
        addToUserLogs("app opened background to active");
        setShouldCheckUpdateCredits(true);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (shouldCheckUpdateCredits) {
      if (lastCheck + 1000 * 15 < Date.now()) {
        reloadUserAndCheckCredits();
        pushLogsToServer(userLogs);
        setLastCheck(Date.now());
      }
      setShouldCheckUpdateCredits(false);
    }
  }, [shouldCheckUpdateCredits]);

  const reloadUserAndCheckCredits = () => {
    Purchases.isConfigured().then((isConfigured) => {
      if (
        isConfigured &&
        revenueCatInitialized &&
        !checkIfUserHasCreditsCalled &&
        user?.uid
      ) {
        Purchases.syncPurchases().then(() => {
          Purchases.logIn(user.uid)
            .then((infoCustomer) => {
              setTimeout(() => {
                checkIfUserHasCredits(user);
                setRevenueCatCustomerInfo(infoCustomer);
                checkStreaksUpdates();
              }, 300);
            })
            .catch((err) => {
              setTimeout(() => {
                checkIfUserHasCredits(user);
                checkStreaksUpdates();
              }, 300);
            });
        });
      }
    });
  };

  const checkStreaksUpdates = () => {
    if (streakObj?.dateToday) {
      const currentUTC = new Date();
      const currentUTCString = currentUTC.toISOString().slice(0, 10);
      const lastStreakChecked = streakObj.dateToday;

      if (lastStreakChecked != currentUTCString) {
        addToUserLogs(
          "Inside check streaks updates with last streak checked " +
            lastStreakChecked +
            " and current UTC string " +
            currentUTCString
        );

        checkStreaks();
      }
    }
  };

  const hoursIncrementBySubscriptionType = {
    sloth_plan: 48,
    turtle_plan: 24,
    yogi_plan: 12,
  };

  const checkCreditsUpdate = () => {
    if (subscriptionWithPrevDate[0] != "noSubscription") {
      const nextDate = new Date(subscriptionWithPrevDate[1]);

      nextDate.setHours(
        nextDate.getHours() +
          hoursIncrementBySubscriptionType[subscriptionWithPrevDate[0]]
      );

      const millisecondsLeft = nextDate - new Date();

      if (millisecondsLeft < 0) {
        addToUserLogs(
          "Inside check credits update with milliseconds left " +
            millisecondsLeft
        );

        checkIfUserHasCredits(user);
      }
    }
  };

  useEffect(() => {
    if (isWaitingOnEmailVerification) {
      reloadUser();
    }
    if (lastCheck + 1000 * 15 < Date.now() && revenueCatInitialized) {
      checkStreaksUpdates();
      checkCreditsUpdate();

      setLastCheck(Date.now());
    }

    const routeName = routeObj?.name;

    // log route name
    if (routeName == "BottomTabBar") {
      const bottomTabIndex = routeObj?.state?.index
        ? routeObj?.state?.index
        : 0;
      const currentBottomTab = bottomTabIndex == 0 ? "Home" : "Profile";

      addToUserLogs("Viewing route " + currentBottomTab);
    } else {
      addToUserLogs("Viewing route " + routeName);
    }

    // check tutorial modal
    if (isTutorial && updateTutorialModalVisible == "none") {
      if (routeName == "BottomTabBar") {
        const bottomTabIndex = routeObj?.state?.index
          ? routeObj?.state?.index
          : 0;
        const currentBottomTab = bottomTabIndex == 0 ? "Home" : "Profile";

        if (currentBottomTab == "Home" && !isVerified) {
          if (isWaitingOnEmailVerification) {
            setCurrentModal("verifyEmailSent");
          } else {
            if (!currentModal || currentModal == "none") {
              setCurrentModal("welcome");
              setDisplayTutorial(true);
            } else {
              setCurrentModal("verifyEmailHome");
            }
          }
        } else if (currentBottomTab == "Home" && isVerified) {
          setCurrentModal("firstMeditation");
          setDisplayTutorial(true);
        } else if (!isVerified) {
          if (isWaitingOnEmailVerification) {
            setCurrentModal("verifyEmailSent");
            setDisplayTutorial(true);
          } else {
            setCurrentModal("verifyEmailPurchase");
            setDisplayTutorial(true);
          }
        } else {
          setCurrentModal("none");
        }
      } else if (routeName == "PurchaseScreen" && !isVerified) {
        if (isWaitingOnEmailVerification) {
          setCurrentModal("verifyEmailSent");
          setDisplayTutorial(true);
        } else {
          setCurrentModal("verifyEmailPurchase");
          setDisplayTutorial(true);
        }
      } else if (
        routeName == "Verification" &&
        isWaitingOnEmailVerification &&
        !isVerified
      ) {
        setCurrentModal("verifyEmailSent");
        setDisplayTutorial(true);
      } else if (routeName == "Meditation" && isTutorial) {
        setCurrentModal("meditationTutorialQuestions");
        setDisplayTutorial(true);
      } else {
        setCurrentModal("none");
      }
    }

    return () => {
      if (isTutorial && currentModal && updateTutorialModalVisible == "none") {
        setDisplayTutorial(false);
      }
    };
  }, [routeObj, isTutorial]);

  useEffect(() => {
    if (updateTutorialModalVisible) {
      if (updateTutorialModalVisible?.includes("gem")) {
        setCurrentModal("gem");
        setNbGemsToDisplay(
          typeof updateTutorialModalVisible === "string" &&
            updateTutorialModalVisible?.split("gem")[1]
            ? updateTutorialModalVisible?.split("gem")[1]
            : 0
        );
        setNewGemsImageIndex(Math.floor(Math.random() * surprisedImage.length));
      } else {
        setCurrentModal(updateTutorialModalVisible);
      }
      if (updateTutorialModalVisible != "none") {
        setDisplayTutorial(true);
      } else {
        setDisplayTutorial(false);
      }
    }
  }, [updateTutorialModalVisible]);

  useEffect(() => {
    if (displayTutorial) {
      setTimeout(
        () => {
          if (currentModal?.includes("gem")) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
        },
        currentModal == "welcome" ? 1000 : creditsDelay
      );
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [displayTutorial]);
  return (
    isTutorial &&
    currentModal && (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setDisplayTutorial(true);
          }}
          style={[
            {
              position: "absolute",
              bottom:
                routeObj?.name == "BottomTabBar"
                  ? (90.0 * height) / 880
                  : (30.0 * height) / 880,
              right: (20.0 * width) / 414,
              zIndex: 20,
              display:
                !displayTutorial &&
                currentModal != "none" &&
                currentModal != "meditationTutorialQuestions" &&
                updateTutorialModalVisible != "none"
                  ? "flex"
                  : "none",
            },
          ]}
        >
          <Image
            source={require("../../assets/images/icons/exclamation.png")}
            style={{
              width: 20.0,
              height: 20.0,
              resizeMode: "contain",
              position: "relative",
              top: 25,
              left: 5,
              zIndex: 20,
            }}
          />
          <Image
            source={tutorialObj[currentModal]?.image}
            style={{
              position: "relative",
              width: (75.0 * width) / 414,
              height: (75.0 * width) / 414,
              borderRadius: 10,
              borderColor: "#C59FAA",
              borderWidth: 2,
            }}
          ></Image>
        </TouchableOpacity>
        <ScaleInOut
          visible={displayTutorial && currentModal != "none"}
          delayIn={
            currentModal == "welcome" || currentModal?.includes("gem")
              ? 1000
              : creditsDelay
          }
          style={[
            {
              display: displayTutorial ? "flex" : "none",
              backgroundColor: "rgba(37, 53, 66, 0.5)",
              position: "absolute",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
            },
            currentModal == "welcome" || currentModal?.includes("gem")
              ? { paddingBottom: "15%", height: "100%" }
              : {
                  bottom: 0,
                  paddingBottom: "8%",
                  paddingTop: 10,
                },
          ]}
        >
          {currentModal == "welcome" || currentModal?.includes("gem") ? (
            <>
              <View
                style={{
                  width: "80%",
                  paddingVertical: (20 * height) / 880,
                  backgroundColor:
                    currentModal == "welcome" ? "#5ea591" : "#00CCBB",
                  paddingHorizontal: 5,
                  alignItems: "center",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderWidth: 0,
                  borderBottomColor:
                    currentModal == "welcome" ? "#5f94ae" : "#00CCBB",
                }}
              >
                <Text style={[Fonts.streakModalTitle, { textAlign: "center" }]}>
                  {tutorialObj[currentModal]?.title}
                </Text>
              </View>

              <View
                style={{
                  width: "80%",
                  alignItems: "center",
                  backgroundColor:
                    currentModal == "welcome" ? "#9be1cd" : "#A0DED9",
                  paddingVertical: (35 * height) / 880,
                  paddingBottom: (25 * height) / 880,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderWidth: 0,
                  borderTopWidth: 0,
                }}
              >
                <Image
                  source={
                    currentModal == "welcome"
                      ? require("../../assets/images/tutorialModal/waving_penguin.png")
                      : surprisedImage[newGemsImageIndex].image
                  }
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
                    {tutorialObj[currentModal]?.text}
                    <Image
                      source={tutorialObj[currentModal]?.image}
                      style={{
                        width: 19,
                        height: 19,
                        resizeMode: "contain",
                        marginLeft: 5,
                        //grey out
                      }}
                    />
                  </Text>
                </View>
                <View style={{ paddingTop: 5, justifyContent: "center" }}>
                  <Text
                    style={[
                      Fonts.streakSavecreditsText,
                      { textAlign: "center" },
                    ]}
                  >
                    {tutorialObj[currentModal]?.bottomText}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  width: "95%",
                  paddingVertical: (10 * height) / 880,
                  backgroundColor: tutorialObj[currentModal]?.colorTop
                    ? tutorialObj[currentModal]?.colorTop
                    : "#5ea591",
                  paddingHorizontal: 5,
                  alignItems: "center",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderWidth: 0,
                  borderBottomColor: "#5f94ae",
                }}
              >
                <Text style={[Fonts.streakModalTitle, { textAlign: "center" }]}>
                  {tutorialObj[currentModal]?.title}
                </Text>
              </View>

              <View
                style={{
                  width: "95%",
                  alignItems: "center",
                  backgroundColor: tutorialObj[currentModal]?.colorBottom
                    ? tutorialObj[currentModal]?.colorBottom
                    : "#9be1cd",
                  paddingVertical: (10 * height) / 880,
                  paddingBottom: (25 * height) / 880,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderWidth: 0,
                  borderTopWidth: 0,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: (100.0 * width) / 414,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.whiteColor,
                      flex: 1,
                      borderRadius: 10,
                      padding: 10,
                      borderColor: "#e9d076",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={[Fonts.streakModalText, { fontSize: 13.5 }]}>
                      {tutorialObj[currentModal]?.text}
                    </Text>
                  </View>
                  <Image
                    source={tutorialObj[currentModal]?.image}
                    style={{
                      position: "relative",
                      width: (100.0 * width) / 414,
                      height: (100.0 * width) / 414,
                      marginBottom: 30,
                      borderRadius: 10,
                      borderColor: "#C59FAA",
                      borderWidth: 2,
                    }}
                  ></Image>
                </View>
              </View>
            </>
          )}

          <View style={{ marginTop: 10 }}>
            <AwesomeButton
              paddingHorizontal={2}
              width={(120 * width) / 414}
              height={50}
              backgroundColor="#e367c7"
              backgroundDarker="#8e1979"
              backgroundShadow="#173746"
              raiseLevel={5}
              borderWidth={1}
              borderColor="#a82e92"
              borderRadius={8}
              onPressOut={() => {
                if (currentModal == "welcome") {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setCurrentModal(tutorialObj[currentModal]?.nextModal);
                } else if (currentModal?.includes("gem")) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setUpdateTutorialModalVisible("none");
                } else if (updateTutorialModalVisible == "meditationLoading") {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setUpdateTutorialModalVisible("meditationTutorialIcons");
                } else if (
                  updateTutorialModalVisible == "meditationTutorialIcons"
                ) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setUpdateTutorialModalVisible("none");
                } else {
                  setDisplayTutorial(false);
                }
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {currentModal == "welcome" ? (
                  <>
                    <Text style={Fonts.streakModalButton}>Begin</Text>
                    <Text style={Fonts.streakModalButton}>Intro</Text>
                  </>
                ) : (
                  <Text style={[Fonts.streakModalButton, { fontSize: 16 }]}>
                    Got it!
                  </Text>
                )}
              </View>
            </AwesomeButton>
          </View>
        </ScaleInOut>
      </>
    )
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TutorialModal;
