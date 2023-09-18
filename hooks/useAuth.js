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
} from "firebase/auth";
import { ref, child, get, onValue, off, getDatabase } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";

const AuthContext = createContext({});
const APIKeys = {
  apple: "appl_mTTdHSJWtMTIsPypmaQXWiXGVzs",
  google: "",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [streakObj, setStreakObj] = useState();
  const [appInitialized, setAppInitialized] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [currentOffering, setCurrentOffering] = useState(null);
  const [revenueCatCustomerInfo, setRevenueCatCustomerInfo] = useState(null);
  const [userValues, setUserValues] = useState({});
  const dbRef = ref(db);
  const [isWaitingOnEmailVerification, setIsWaitingOnEmailVerification] =
    useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (appInitialized) {
      var unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log(user);
          setUser(user);

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
            )
              .then((res) => res.json())
              .then((data) => {
                setUserValues(data.userValues);
                setStreakObj(data.streakObj);
                navigation.navigate("BottomTabBar");
              })
              .catch((err) => {
                console.log(err);
                showMessage({
                  message: "There was an error fetching your data.",
                  type: "danger",
                });
              });
          });

          if (!user.displayName) {
            updateProfile(user, { displayName: "fellow yogi" });
          }

          //setup Revenue Cat
          if (Platform.OS === "android") {
            await Purchases.configure({
              apiKey: APIKeys.google,
              appUserID: user.uid,
            });
          } else {
            await Purchases.configure({
              apiKey: APIKeys.apple,
              appUserID: user.uid,
            });
          }

          await Purchases.syncPurchases();

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

          Purchases.logIn(user.uid)
            .then((infoCustomer) => {
              console.log("login");
              console.log(infoCustomer);
              setRevenueCatCustomerInfo(infoCustomer.customerInfo);
            })
            .catch((err) => {
              showMessage({
                message: "There was an error fetching your customer info.",
                type: "danger",
              });
            });
        } else {
          navigation.navigate("Register");
        }
      });

      return unsubscribe;
    }
  }, [appInitialized]);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      console.log(purchaserInfo);
      setRevenueCatCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);

    return () =>
      Purchases.removeCustomerInfoUpdateListener(customerInfoUpdated);
  }, [appInitialized]);

  const generateNewMeditation = (
    userInput,
    meditationType,
    number,
    setLoadingClicked
  ) => {
    getIdToken(user).then((idToken) => {
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
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          const propsToPass = {
            shouldListenRealTime: true,
            number: number,
          };
          setUserValues(data.userValues);
          setStreakObj(data.streakObj);
          setLoadingClicked(false);
          navigation.navigate("MeditationScreen", propsToPass);
        })
        .catch((err) => {
          console.log(err);
          setLoadingClicked(false);
          showMessage({
            message: "There was an error creating your meditation.",
            type: "danger",
          });
        });
    });
  };

  const saveStreak = () => {
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
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            res.text().then((text) => {
              console.log(text);
              showMessage({
                message: text,
                type: "danger",
              });
            });
          }
        })
        .then((data) => {
          setLoadingModalVisible(false);
          setUserValues(data.userValues);
          setStreakObj(data.streakObj);
        })
        .catch((err) => {
          setLoadingModalVisible(false);
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
          )
            .then((res) => res.json())
            .then((data) => {
              setUserValues(data.userValues);
              setStreakObj(data.streakObj);
              setIsWaitingOnEmailVerification(false);
            })
            .catch((err) => {
              showMessage({
                message: "There was an error fetching your data.",
                type: "danger",
              });
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

        navigation.navigate("BottomTabBar");

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
        navigation.navigate("BottomTabBar");
      })
      .catch((error) => {
        if (isRegister) {
          //Login from register page
          setError("auth/email-already-in-use");
        } else {
          console.log("Error signing in:", error.code);
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
      appInitialized,
      saveStreak,
      loadingModalVisible,
      setLoadingModalVisible,
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
      appInitialized,
      saveStreak,
      loadingModalVisible,
      setLoadingModalVisible,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
