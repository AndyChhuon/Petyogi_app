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
import { ref, onValue, update } from "firebase/database";
import { useNavigation, StackActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [streakObj, setStreakObj] = useState();
  const [creditsObj, setCreditsObj] = useState();
  const [appInitialized, setAppInitialized] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [updateTutorialModalVisible, setUpdateTutorialModalVisible] =
    useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [checkIfUserHasCreditsCalled, setCheckIfUserHasCreditsCalled] =
    useState(false);
  const [currentOffering, setCurrentOffering] = useState(null);
  const [revenueCatCustomerInfo, setRevenueCatCustomerInfo] = useState(null);
  const [planWasChecked, setPlanWasChecked] = useState("");
  const [userValues, setUserValues] = useState({});
  const dbRef = ref(db);
  const [isWaitingOnEmailVerification, setIsWaitingOnEmailVerification] =
    useState(false);
  const [revenueCatInitialized, setRevenueCatInitialized] = useState(false);
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const [initDayMode, setDayMode] = useState(false);
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
                    Purchases.syncPurchases();
                  })
                  .catch((err) => {
                    addToUserLogs(`Error getting offerings again: ${err}.`);
                    showMessage({
                      message: "There was an error fetching in app purchases.",
                      type: "danger",
                    });
                  });
              }, 300);
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

  const generateNewMeditation = (
    user,
    userInput,
    meditationType,
    number,
    setLoadingClicked,
    meditationPreferences
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

            const tutorialShouldShow = number == 1;

            const propsToPass = {
              shouldListenRealTime: true,
              tutorialShouldShow: tutorialShouldShow,
              number: number,
              meditationPreferences: meditationPreferences,
            };
            setUserValues(data.userValues);
            setStreakObj(data.streakObj);
            setLoadingClicked(false);
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

  const listenMeditationUpdate = (number, setMeditationInfo) => {
    const meditationRef = ref(db, `meditations/${user.uid}/${number}`);

    return onValue(meditationRef, (snapshot) => {
      const phrases = snapshot.val()?.phrases;
      const meditationUrls = snapshot.val()?.meditationUrls;
      const finishedGenerating = snapshot.val()?.finishedGenerating;

      const shouldListenRealTime = !(
        finishedGenerating &&
        meditationUrls &&
        meditationUrls.hasOwnProperty("count") &&
        meditationUrls.count in meditationUrls
      );

      const propsToPass = {
        phrases: phrases,
        meditationUrls: meditationUrls,
        shouldListenRealTime: shouldListenRealTime,
        number: number,
      };

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
      userLogs,
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
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
