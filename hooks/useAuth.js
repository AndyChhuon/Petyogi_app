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
import { ref, child, get, onValue, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";

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
  const APIKeys = {
    apple: "appl_mTTdHSJWtMTIsPypmaQXWiXGVzs",
    google: "",
  };
  const navigation = useNavigation();

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
        console.log("check if user has credits from useEffect");
        setPlanWasChecked(selectedPlan);
        setTimeout(() => {
          checkIfUserHasCredits(user);
        }, 300);
      }
    }
  }, [revenueCatCustomerInfo, creditsObj, checkIfUserHasCreditsCalled]);

  useEffect(() => {
    console.log("Calling configure");
    if (Platform.OS === "android") {
      Purchases.configure({
        apiKey: APIKeys.google,
      });
    } else {
      Purchases.configure({
        apiKey: APIKeys.apple,
      });
    }
  }, []);

  useEffect(() => {
    if (appInitialized) {
      var unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);

          //setup Revenue Cat
          console.log("setting up revenue cat");
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

          console.log("getting offerings");
          Purchases.getOfferings()
            .then((offerings) => {
              setCurrentOffering(offerings.current);
            })
            .catch((err) => {
              // try again
              setTimeout(() => {
                Purchases.getOfferings()
                  .then((offerings) => {
                    setCurrentOffering(offerings.current);
                  })
                  .catch((err) => {
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
            setRevenueCatInitialized(false);
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

                  // revenuecat setup continued
                  await Purchases.syncPurchases();

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
                        console.log("error log in but try again");
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
    setLoadingClicked
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

            const tutorialShouldShow = number == 1;

            const propsToPass = {
              shouldListenRealTime: true,
              tutorialShouldShow: tutorialShouldShow,
              number: number,
            };
            setUserValues(data.userValues);
            setStreakObj(data.streakObj);
            setLoadingClicked(false);
            navigation.navigate("MeditationScreen", propsToPass);
          });
        } else {
          res.text().then((text) => {
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
            setUserValues(data.userValues);
            setStreakObj(data.streakObj);
            const isNewlyVerified = data.isNewlyVerified;
            if (isNewlyVerified) {
              setIsWaitingOnEmailVerification(false);
              setVerificationModalVisible(true);
            }
            setIsCheckingStreaks(false);
          });
        } else {
          res.text().then((text) => {
            showMessage({
              message: text,
              type: "danger",
            });
          });
          setIsCheckingStreaks(false);
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
            setLoadingModalVisible(false);
            setUserValues(data.userValues);
            setStreakObj(data.streakObj);
          });
        } else {
          res.text().then((text) => {
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

  const checkIfUserHasCredits = (user, isTryAgain = false) => {
    // await Purchases.syncPurchases();
    console.log("inside check if user has credits");
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
            setUserValues(data.userValues);
            setLoadingModalVisible(false);
            setRevenueCatInitialized(true);
            // Modal not currently displayed
            setCreditsObj(data.modalDisplay);
            setCheckIfUserHasCreditsCalled(false);
          });
        } else {
          if (!isTryAgain) {
            console.log("try again");
            setTimeout(() => {
              checkIfUserHasCredits(user, true);
            }, 1000);
          } else {
            setCheckIfUserHasCreditsCalled(false);
            setLoadingModalVisible(false);
            setRevenueCatInitialized(true);
            res.text().then((text) => {
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
  const getPastMeditationJson = (number, setMeditateButtonIsPressed) => {
    get(child(dbRef, `meditations/${user.uid}/${number}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const propsToPass = {
            initMeditationQuestionsJson: snapshot.val().userInput,
            phrases: snapshot.val().phrases,
            meditationUrls: snapshot.val().meditationUrls,
            finishedGenerating: snapshot.val().finishedGenerating,
            number: number,
            readOnly: true,
          };
          navigation.navigate("Meditation", propsToPass);
        } else {
          showMessage({
            message: "No past meditation was found.",
            type: "danger",
          });
        }
        setMeditateButtonIsPressed(false);
      })
      .catch((error) => {
        showMessage({
          message: "There was an error fetching your meditation.",
          type: "danger",
        });
        setMeditateButtonIsPressed(false);
      });
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
        })
        .catch((error) => {
          // Error occurred. Inspect error.code.
          setError(error.code);
        });
    }
  };

  function emailLogin(setError, email, password, isRegister = false) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      })
      .catch((error) => {
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
      getPastMeditationJson,
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
    }),
    [
      user,
      emailSignup,
      emailVerification,
      emailLogin,
      getPastMeditationJson,
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
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
