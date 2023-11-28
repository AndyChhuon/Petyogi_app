import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { auth, db } from "../config/firebaseConfig";
import Purchases from "react-native-purchases";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getIdToken,
  updateProfile,
  signOut,
} from "firebase/auth";
import { ref, onValue, update, set } from "firebase/database";
import { useNavigation, StackActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { notificationsMessages } from "../constants/constants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [streakObj, setStreakObj] = useState();
  const [creditsObj, setCreditsObj] = useState();
  const [appInitialized, setAppInitialized] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [updateTutorialModalVisible, setUpdateTutorialModalVisible] =
    useState("none");
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [checkIfUserHasCreditsCalled, setCheckIfUserHasCreditsCalled] =
    useState(false);
  const [currentOffering, setCurrentOffering] = useState(null);
  const [revenueCatCustomerInfo, setRevenueCatCustomerInfo] = useState(null);
  const [planWasChecked, setPlanWasChecked] = useState("");
  const [userValues, setUserValues] = useState({});
  const [isWaitingOnEmailVerification, setIsWaitingOnEmailVerification] =
    useState(false);
  const [revenueCatInitialized, setRevenueCatInitialized] = useState(false);
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const [initDayMode, setDayMode] = useState(false);
  const [questionsAreGenerating, setQuestionsAreGenerating] = useState(false);
  const APIKeys = {
    apple: "appl_mTTdHSJWtMTIsPypmaQXWiXGVzs",
    google: "",
  };
  const [deviceUUID, setDeviceUUID] = useState("");
  const [userLogs, setUserLogs] = useState({});
  const navigation = useNavigation();
  const userLogsRef = ref(db, `userlogs/${deviceUUID}`);

  const customerInfoUpdated = async (purchaserInfo) => {
    // purchase not currently happening (will manually update on purchase)
    setRevenueCatCustomerInfo(purchaserInfo);
  };

  const planOrder = ["yogi_plan", "turtle_plan", "sloth_plan"];

  useEffect(() => {
    if (
      revenueCatCustomerInfo?.activeSubscriptions &&
      creditsObj?.subscriptionWithPrevDate
    ) {
      const subscriptionWithPrevDate = creditsObj.subscriptionWithPrevDate;
      const activeSubscriptionsArray =
        revenueCatCustomerInfo.activeSubscriptions;
      let selectedPlan = "noSubscription";
      for (const plan of planOrder) {
        if (activeSubscriptionsArray.includes(plan)) {
          selectedPlan = plan;
          break;
        }
      }

      if (
        subscriptionWithPrevDate[0] !== selectedPlan &&
        planWasChecked !== selectedPlan &&
        revenueCatInitialized &&
        !loadingModalVisible &&
        !checkIfUserHasCreditsCalled
      ) {
        addToUserLogs("Check if user has credits from useEffect");
        setPlanWasChecked(selectedPlan);
        setTimeout(() => {
          checkIfUserHasCredits(user);
        }, 300);
      }
    }
  }, [revenueCatCustomerInfo, creditsObj, checkIfUserHasCreditsCalled]);

  const getDayMode = async () => {
    try {
      const value = await AsyncStorage.getItem("dayMode");
      if (value !== null) {
        setDayMode(value === "true");
      }
    } catch (e) {}
  };

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const getDeviceUUID = async () => {
    try {
      const value = await AsyncStorage.getItem("deviceUUID");
      if (value !== null) {
        setDeviceUUID(value);
      } else {
        const newUUID = uuidv4();
        setDeviceUUID(newUUID);
        await AsyncStorage.setItem("deviceUUID", newUUID);
      }
    } catch (e) {}
  };

  const getLogsFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("userlogs");
      if (value !== null) {
        setUserLogs(JSON.parse(value));
      }
    } catch (e) {}
  };

  const getSubscriptionWithPrevDateFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("subscriptionWithPrevDate");
      if (value !== null) {
        setCreditsObj((prevCreditsObj) => {
          return {
            ...prevCreditsObj,
            subscriptionWithPrevDate: JSON.parse(value),
          };
        });
      }
    } catch (e) {}
  };

  const pushLogsToServer = (userLogs) => {
    if (Object.keys(userLogs).length > 0) {
      update(userLogsRef, userLogs);

      // delete logs from async storage
      AsyncStorage.removeItem("userlogs");
      setUserLogs({});
    }
  };

  const addToUserLogs = (message) => {
    setUserLogs((prevLogs) => {
      const dateNowString = new Date().toISOString().replace(/\./g, "_");
      const newLogs = { ...prevLogs, [dateNowString]: message };

      if (Object.keys(newLogs).length > 10) {
        pushLogsToServer(newLogs);
      } else {
        AsyncStorage.setItem("userlogs", JSON.stringify(newLogs));
      }

      return newLogs; // Return the updated state
    });
  };

  useEffect(() => {
    //revenue cat configure
    if (Platform.OS === "android") {
      Purchases.configure({
        apiKey: APIKeys.google,
      });
    } else {
      Purchases.configure({
        apiKey: APIKeys.apple,
      });
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // get dayMode from async storage
    getDayMode();
    getDeviceUUID();
    getLogsFromAsyncStorage();
    getSubscriptionWithPrevDateFromAsyncStorage();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  useEffect(() => {
    if (appInitialized) {
      var unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          setRevenueCatInitialized(false);

          //setup Revenue Cat
          addToUserLogs(`logged in with id ${user.uid} setting up revenue cat`);
          if (Platform.OS === "android") {
            Purchases.configure({
              apiKey: APIKeys.google,
              appUserID: user.uid,
            });
          } else {
            Purchases.configure({
              apiKey: APIKeys.apple,
              appUserID: user.uid,
            });
          }
          Purchases.getOfferings()
            .then((offerings) => {
              setCurrentOffering(offerings.current);
              Purchases.syncPurchases();
            })
            .catch((err) => {
              addToUserLogs(`Error getting offerings: ${err}. Trying again.`);
              // try again
              setTimeout(() => {
                Purchases.getOfferings()
                  .then((offerings) => {
                    setCurrentOffering(offerings.current);
                    Purchases.syncPurchases();
                  })
                  .catch((err) => {
                    addToUserLogs(`Error getting offerings again: ${err}.`);
                    showMessage({
                      message:
                        "There was a network error while fetching in app purchases. Try reloading app.",
                      type: "warning",
                    });
                  });
              }, 450);
            });

          Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);

          getIdToken(user).then((idToken) => {
            //post request
            fetch(
              "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/initializeUser",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  idToken: idToken,
                }),
              }
            ).then((res) => {
              if (res.ok) {
                return res.json().then(async (data) => {
                  setUserValues(data.userValues);

                  //set notifications
                  const todayStreakCompleted =
                    new Date(data.userValues.lastMeditationDate) >=
                    new Date(new Date().toISOString().slice(0, 10));
                  setNotifications(
                    !todayStreakCompleted,
                    data.userValues.streak
                  );

                  setStreakObj(data.streakObj);
                  const isNewlyVerified = data.isNewlyVerified;
                  if (isNewlyVerified) {
                    setIsWaitingOnEmailVerification(false);
                    setVerificationModalVisible(true);
                  }

                  if (!user.displayName) {
                    updateProfile(user, { displayName: "fellow yogi" });
                  }

                  navigation.navigate("BottomTabBar", { screen: "Home" });

                  await Purchases.logIn(user.uid)
                    .then((infoCustomer) => {
                      setRevenueCatCustomerInfo(infoCustomer);
                      setTimeout(() => {
                        checkIfUserHasCredits(user);
                      }, 300);
                    })
                    .catch((err) => {
                      setTimeout(() => {
                        //try logging in again
                        addToUserLogs(`Error log in but try again: ${err}.`);

                        Purchases.logIn(user.uid)
                          .then((infoCustomer) => {
                            setRevenueCatCustomerInfo(infoCustomer);
                            setTimeout(() => {
                              checkIfUserHasCredits(user);
                            }, 300);
                          })
                          .catch((err) => {
                            setTimeout(() => {
                              checkIfUserHasCredits(user);
                            }, 300);
                            addToUserLogs(`Error logging in again: ${err}.`);

                            showMessage({
                              message:
                                "There was an error configuring your account. Try reloading app.",
                              type: "warning",
                            });
                          });
                      }, 300);
                    });
                });
              } else {
                res.text().then((text) => {
                  addToUserLogs(`Error initializing user: ${text}.`);
                  showMessage({
                    message: text,
                    type: "danger",
                  });
                  navigation.navigate("Register");
                  signOut(auth);
                });
              }
            });
          });
        } else {
          navigation.navigate("Register");
          //check purchases was initialized
          if (userValues) {
            setUserValues({});
          }

          Purchases.isConfigured().then((isConfigured) => {
            if (isConfigured) {
              Purchases.removeCustomerInfoUpdateListener(customerInfoUpdated);
              Purchases.isAnonymous().then((isAnonymous) => {
                if (!isAnonymous) {
                  Purchases.logOut();
                }
              });
            }
          });
        }
      });

      return () => {
        unsubscribe();
        Purchases.removeCustomerInfoUpdateListener(customerInfoUpdated);
      };
    }
  }, [appInitialized]);

  const generateMeditationQuestions = (prompt) => {
    addToUserLogs("Called generateMeditationQuestions with prompt " + prompt);
    setQuestionsAreGenerating(true);
    const meditationQuestionsRef = ref(
      db,
      `userValues/${user.uid}/questionsPromptsGenerated`
    );

    const unsubscribe = onValue(meditationQuestionsRef, (snapshot) => {
      const questionsPromptsGenerated = snapshot.val();

      setUserValues((prevUserValues) => {
        return {
          ...prevUserValues,
          questionsPromptsGenerated: questionsPromptsGenerated,
        };
      });
    });

    getIdToken(user, true).then((idToken) => {
      fetch(
        "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/generateQuestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
            prompt: prompt,
          }),
        }
      )
        .then((response) => {
          setQuestionsAreGenerating(false);

          if (response.ok) {
            return response.text().then((data) => {
              addToUserLogs("Successfully generated questions.");
              setTimeout(() => {
                unsubscribe();
              }, 1000);
            });
          } else {
            response.text().then((text) => {
              addToUserLogs(`Error generating questions: ${text}.`);
              setTimeout(() => {
                unsubscribe();
              }, 1000);

              showMessage({
                message: "There was an error generating journaling questions.",
                type: "danger",
              });
            });
          }
        })
        .catch((err) => {
          setQuestionsAreGenerating(false);
          addToUserLogs(`Error generating questions: ${err}.`);
          setTimeout(() => {
            unsubscribe();
          }, 1000);
        });
    });
  };

  const generateNewMeditation = (
    user,
    userInput,
    meditationType,
    number,
    setLoadingClicked,
    meditationPreferences,
    IntroOutroJson
  ) => {
    getIdToken(user, true).then((idToken) => {
      //post request
      fetch(
        "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/createMeditation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
            userInput: userInput,
            meditationType: meditationType,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            addToUserLogs("Successfully generating meditation.");
            AsyncStorage.removeItem("AsyncStoredMeditationJson");

            const tutorialShouldShow = number == 1;

            const propsToPass = {
              initMeditationInfo: {
                shouldListenRealTime: true,
                tutorialShouldShow: tutorialShouldShow,
              },
              number: number,
              meditationPreferences: meditationPreferences,
              ...IntroOutroJson,
            };
            setUserValues(data.userValues);
            setStreakObj(data.streakObj);
            setLoadingClicked(false);
            setNotifications(false);
            navigation.navigate("MeditationScreen", propsToPass);
          });
        } else {
          res.text().then((text) => {
            addToUserLogs(`Error generating meditation: ${text}.`);
            showMessage({
              message: text,
              type: "danger",
            });
          });
        }
      });
    });
  };

  const accountSignOut = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    signOut(auth);
    setPlanWasChecked("");
    setRevenueCatCustomerInfo(null);
    setCreditsObj(null);
    setUserValues({});
    navigation.dispatch(StackActions.popToTop());
    addToUserLogs(`User logged out.`);
  };

  const claimGems = (amountGems) => {
    getIdToken(user).then((idToken) => {
      //post request
      fetch(
        "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/claimGems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
            amountGems: amountGems,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            addToUserLogs("Claim gems successful.");
            setUserValues(data.userValues);
            setUpdateTutorialModalVisible("gem" + amountGems);
          });
        } else {
          res.text().then((text) => {
            addToUserLogs(`Error claiming gems: ${text}.`);
          });
        }
      });
    });
  };

  const purchaseItem = (purchaseId, purchaseType, setMessage) => {
    addToUserLogs(
      "Purchasing item with gems with id " +
        purchaseId +
        " and type " +
        purchaseType
    );
    getIdToken(user)
      .then((idToken) => {
        //post request
        fetch(
          "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/purchaseWithGems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: idToken,
              purchaseId: purchaseId,
              purchaseType: purchaseType,
            }),
          }
        ).then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              addToUserLogs("Purchase with gems successful.");
              setUserValues(data.userValues);
              setMessage("success");
              setLoadingModalVisible(false);
            });
          } else {
            res.text().then((text) => {
              addToUserLogs(`Error purchasing item: ${text}.`);
              setMessage("There was an error purchasing this item.");
              setLoadingModalVisible(false);
            });
          }
        });
      })
      .catch((err) => {
        addToUserLogs(`Error purchasing item: ${err}.`);
        setMessage("There was an error purchasing this item.");
        setLoadingModalVisible(false);
      });
  };

  const checkStreaks = () => {
    getIdToken(user).then((idToken) => {
      //post request
      fetch(
        "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/initializeUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            addToUserLogs("Check streaks successful.");
            setUserValues(data.userValues);
            setStreakObj(data.streakObj);
            const isNewlyVerified = data.isNewlyVerified;
            if (isNewlyVerified) {
              setIsWaitingOnEmailVerification(false);
              setVerificationModalVisible(true);
            }
          });
        } else {
          res.text().then((text) => {
            addToUserLogs(`Error checking streaks: ${text}.`);
            showMessage({
              message: text,
              type: "danger",
            });
          });
        }
      });
    });
  };

  const saveStreak = (user) => {
    setLoadingModalVisible(true);
    getIdToken(user).then((idToken) => {
      //post request
      fetch(
        "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/saveStreak",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            addToUserLogs("Streak saved successfully.");
            setLoadingModalVisible(false);
            setUserValues(data.userValues);
            setStreakObj(data.streakObj);
            setNotifications(true);
          });
        } else {
          res.text().then((text) => {
            addToUserLogs(`Error saving streak: ${text}.`);
            setLoadingModalVisible(false);

            showMessage({
              message: text,
              type: "danger",
            });
          });
        }
      });
    });
  };

  const returnRandomFromArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const requestNotificationsPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        return;
      } else {
        // set first notification
        const todayStreakCompleted =
          new Date(userValues?.lastMeditationDate) >=
          new Date(new Date().toISOString().slice(0, 10));
        setNotifications(!todayStreakCompleted);
      }
    }
  };

  const setNotifications = async (isSaveStreak = false, streakNb = null) => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule notification for 7 am
    await Notifications.scheduleNotificationAsync({
      content: returnRandomFromArray(notificationsMessages["morning"]),
      trigger: {
        hour: 7,
        minute: 0,
        repeats: true,
      },
    });

    // Schedule notification for lunch
    await Notifications.scheduleNotificationAsync({
      content: returnRandomFromArray(notificationsMessages["checkup"]),
      trigger: {
        hour: 12,
        minute: 0,
        repeats: true,
      },
    });

    // Schedule notification for 10 pm
    await Notifications.scheduleNotificationAsync({
      content: returnRandomFromArray(notificationsMessages["nightTime"]),
      trigger: {
        hour: 22,
        minute: 0,
        repeats: true,
      },
    });

    const increment = isSaveStreak ? 1 : 2;
    const streak = streakNb ? streakNb : userValues?.streak;

    if (streak == 0) {
      return;
    }
    // Set reminder to meditate 1 hour before UTC

    //date tomorrow
    const currentUTC = new Date();
    const midnightUTC = new Date(currentUTC);
    midnightUTC.setDate(midnightUTC.getDate() + increment);
    midnightUTC.setUTCHours(0, 0, 0, 0);

    const minutesLeft = (midnightUTC - currentUTC) / 1000 / 60;

    // date 2 hour before tomorrow
    const minutesLeftMinusTwoHours = minutesLeft - 120;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget to meditate today!",
        body: "Let's take some time for yourself, Yogi.",
      },
      trigger: {
        seconds: minutesLeftMinusTwoHours * 60,
      },
    });

    // date 1 hour before tomorrow
    const minutesLeftMinusAnHour = minutesLeft - 60;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Only an hour left!",
        body: streak
          ? `Let's keep your ${streak} day streak going yogi. Your mental health is important.`
          : "Let's keep your streak going yogi. Your mental health is important.",
      },
      trigger: {
        seconds: minutesLeftMinusAnHour * 60,
      },
    });

    // date 30 minutes before tomorrow
    const minutesLeftMinusThirtyMinutes = minutesLeft - 30;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You still have 30 minutes!",
        body: "Don't let yourself lose your streak, Yogi.",
      },
      trigger: {
        seconds: minutesLeftMinusThirtyMinutes * 60,
      },
    });

    // date 15 minutes before tomorrow
    const minutesLeftMinusFifteenMinutes = minutesLeft - 15;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚨 The last reminder!",
        body: streak
          ? `You have 15 minutes to extend your ${streak} day streak. Let's go!`
          : "You have 15 minutes to extend your streak. Let's go!",
      },
      trigger: {
        seconds: minutesLeftMinusFifteenMinutes * 60,
      },
    });

    // Missed streak notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "😢 You lost your streak",
        body: "It's okay! Save your streak with 300 gems.",
      },
      trigger: {
        seconds: minutesLeft * 60,
      },
    });
  };

  const checkIfUserHasCredits = (user, isTryAgain = 0) => {
    // await Purchases.syncPurchases();
    setCheckIfUserHasCreditsCalled(true);
    getIdToken(user).then((idToken) => {
      //post request
      fetch(
        "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/updateCredits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            addToUserLogs("Successfully updated credits.");
            setUserValues(data.userValues);
            setLoadingModalVisible(false);
            setRevenueCatInitialized(true);
            // Modal not currently displayed
            setCreditsObj(data.modalDisplay);
            setCheckIfUserHasCreditsCalled(false);
            AsyncStorage.setItem(
              "subscriptionWithPrevDate",
              JSON.stringify(data.modalDisplay.subscriptionWithPrevDate)
            );
          });
        } else {
          if (isTryAgain <= 3) {
            const newTryAgain = isTryAgain + 1;
            addToUserLogs("Error updating credits. Trying again.");
            setTimeout(() => {
              checkIfUserHasCredits(user, newTryAgain);
            }, newTryAgain * 1000);
          } else {
            setCheckIfUserHasCreditsCalled(false);
            setLoadingModalVisible(false);
            setRevenueCatInitialized(true);
            res.text().then((text) => {
              addToUserLogs(`Error updating credits final: ${text}.`);
              showMessage({
                message: text,
                type: "danger",
              });
            });
          }
        }
      });
    });
  };

  const reloadUser = async () => {
    if (user) {
      await user.reload();

      if (userValues.accountType == "free" && user.emailVerified) {
        getIdToken(user).then((idToken) => {
          //post request
          fetch(
            "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/initializeUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken: idToken,
              }),
            }
          ).then((res) => {
            if (res.ok) {
              addToUserLogs("Successfully reloaded user.");
              return res.json().then((data) => {
                setUserValues(data.userValues);
                setStreakObj(data.streakObj);

                const isNewlyVerified = data.isNewlyVerified;
                if (isNewlyVerified) {
                  setIsWaitingOnEmailVerification(false);
                  setVerificationModalVisible(true);
                }
              });
            } else {
              res.text().then((text) => {
                addToUserLogs(`Error reloading user: ${text}.`);
                showMessage({
                  message: text,
                  type: "danger",
                });
              });
            }
          });
        });
      }
    }
  };

  const listenMeditationUpdate = (
    number,
    setMeditationInfo,
    introPhraseArr,
    outroPhraseArr,
    introUrlArr,
    outroUrlArr
  ) => {
    const meditationRef = ref(db, `meditations/${user.uid}/${number}`);

    return onValue(meditationRef, (snapshot) => {
      const phrases = snapshot.val()?.phrases;
      const meditationUrls = snapshot.val()?.meditationUrls;
      const finishedGenerating = snapshot.val()?.finishedGenerating;
      const promptIndexes = snapshot.val()?.promptIndexes;

      const shouldListenRealTime = !(
        finishedGenerating &&
        meditationUrls &&
        meditationUrls.hasOwnProperty("count") &&
        meditationUrls.count in meditationUrls
      );

      const maxNumPhrases = meditationUrls
        ? meditationUrls
          ? Object.keys(meditationUrls).length - 1
          : Object.keys(meditationUrls).length
        : 0;

      // First line has not been generated, play pre recorded audio
      const isWaitingOnFirstLineGeneration = maxNumPhrases == 0;
      let propsToPass = {
        phrases: phrases,
        meditationUrls: meditationUrls,
        shouldListenRealTime: shouldListenRealTime,
        promptIndexes: promptIndexes,
      };

      if (!isWaitingOnFirstLineGeneration) {
        const increment = introPhraseArr.length + outroPhraseArr.length;
        const newPhrasesObj = {};
        const newUrlsObj = {};
        let phraseIncrement = 1;

        introPhraseArr.forEach((phrase, index) => {
          newPhrasesObj[phraseIncrement] = phrase;
          newUrlsObj[phraseIncrement] = { url: introUrlArr[index] };
          phraseIncrement++;
        });

        outroPhraseArr.forEach((phrase, index) => {
          newPhrasesObj[phraseIncrement] = phrase;
          newUrlsObj[phraseIncrement] = { url: outroUrlArr[index] };
          phraseIncrement++;
        });

        for (const key in phrases) {
          if (phrases.hasOwnProperty(key)) {
            const newKey = parseInt(key) + increment;
            newPhrasesObj[newKey] = phrases[key];
          }
          if (meditationUrls.hasOwnProperty(key)) {
            const newKey = parseInt(key) + increment;
            newUrlsObj[newKey] = meditationUrls[key];
          }
        }

        newUrlsObj.count = meditationUrls.count + increment;

        propsToPass = {
          phrases: newPhrasesObj,
          meditationUrls: newUrlsObj,
          shouldListenRealTime: shouldListenRealTime,
          promptIndexes: promptIndexes,
        };
      }
      setMeditationInfo(propsToPass);
    });
  };

  const emailSignup = (setError, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        addToUserLogs(`User signed up.`);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Signed in successfully
      })
      .catch((error) => {
        // An error occurred during sign in

        if (error.code === "auth/email-already-in-use") {
          emailLogin(setError, email, password, true);
        } else {
          setError(error.code);
        }
      });
  };

  const emailVerification = (setError, setSuccessMsg) => {
    if (!user.emailVerifiedemailVerified) {
      sendEmailVerification(user, {
        url: "https://petyogi.com/?redirect=true",
      })
        .then(() => {
          // Verification email sent.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setSuccessMsg("Verification email sent. Please check your inbox.");
          setIsWaitingOnEmailVerification(true);
          addToUserLogs(`Verification email sent.`);
        })
        .catch((error) => {
          // Error occurred. Inspect error.code.
          setError(error.code);
          addToUserLogs(`Error sending verification email: ${error.code}.`);
        });
    }
  };

  function emailLogin(setError, email, password, isRegister = false) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        addToUserLogs(`User logged in.`);
      })
      .catch((error) => {
        addToUserLogs(`Error logging in: ${error.code}.`);
        if (isRegister) {
          //Login from register page
          setError("auth/email-already-in-use");
        } else {
          setError(error.code);
        }
      });
  }

  function passwordReset(setError, setSent, setSuccessMsg, setLoading, email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMsg(
          `Password reset email sent to ${email}. Please check your inbox.`
        );
      })
      .catch((error) => {
        setError(error.code);
        setSuccessMsg(null);
        setSent(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const memoedValue = useMemo(
    () => ({
      user,
      emailSignup,
      emailVerification,
      emailLogin,
      setAppInitialized,
      passwordReset,
      userValues,
      listenMeditationUpdate,
      generateNewMeditation,
      reloadUser,
      isWaitingOnEmailVerification,
      currentOffering,
      revenueCatCustomerInfo,
      streakObj,
      setStreakObj,
      appInitialized,
      saveStreak,
      loadingModalVisible,
      setLoadingModalVisible,
      creditsObj,
      setCreditsObj,
      checkIfUserHasCredits,
      checkStreaks,
      verificationModalVisible,
      setVerificationModalVisible,
      updateTutorialModalVisible,
      setUpdateTutorialModalVisible,
      accountSignOut,
      setRevenueCatCustomerInfo,
      revenueCatInitialized,
      checkIfUserHasCreditsCalled,
      isSplashScreenVisible,
      setIsSplashScreenVisible,
      initDayMode,
      pushLogsToServer,
      addToUserLogs,
      questionsAreGenerating,
      userLogs,
      generateMeditationQuestions,
      claimGems,
      purchaseItem,
      requestNotificationsPermission,
    }),
    [
      user,
      emailSignup,
      emailVerification,
      emailLogin,
      setAppInitialized,
      userValues,
      listenMeditationUpdate,
      generateNewMeditation,
      reloadUser,
      isWaitingOnEmailVerification,
      currentOffering,
      revenueCatCustomerInfo,
      streakObj,
      setStreakObj,
      appInitialized,
      saveStreak,
      loadingModalVisible,
      setLoadingModalVisible,
      creditsObj,
      setCreditsObj,
      checkIfUserHasCredits,
      checkStreaks,
      verificationModalVisible,
      setVerificationModalVisible,
      updateTutorialModalVisible,
      setUpdateTutorialModalVisible,
      accountSignOut,
      setRevenueCatCustomerInfo,
      revenueCatInitialized,
      checkIfUserHasCreditsCalled,
      isSplashScreenVisible,
      setIsSplashScreenVisible,
      initDayMode,
      pushLogsToServer,
      addToUserLogs,
      userLogs,
      questionsAreGenerating,
      generateMeditationQuestions,
      claimGems,
      purchaseItem,
      requestNotificationsPermission,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
