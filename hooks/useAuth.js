import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { auth, db } from "../config/firebaseConfig";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getIdToken,
} from "firebase/auth";
import { ref, child, get, onValue, off, getDatabase } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appInitialized, setAppInitialized] = useState(false);
  const [userValues, setUserValues] = useState({});
  const dbRef = ref(db);

  const navigation = useNavigation();

  useEffect(() => {
    if (appInitialized) {
      var unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          setUser(user);
          if (user.emailVerified) {
            //
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
                  setUserValues(data);
                  navigation.navigate("BottomTabBar");
                })
                .catch((err) => {
                  showMessage({
                    message: "There was an error fetching your data.",
                    type: "danger",
                  });
                });
            });
          }
        } else {
          navigation.navigate("Register");
        }
      });

      return unsubscribe;
    }
  }, [appInitialized]);

  const generateNewMeditation = (
    userInput,
    meditationType,
    number,
    setLoadingClicked
  ) => {
    getIdToken(user).then((idToken) => {
      console.log({
        idToken: idToken,
        userInput: userInput,
        meditationType: meditationType,
      });
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
            // Check if the response status is in the range of 200-299 (indicating success)
            if (res.headers.get("Content-Type").includes("application/json")) {
              // Response is JSON
              return res.json();
            } else {
              // Response is not JSON, handle it accordingly
              return res.text(); // Or any other processing you need
            }
          }
        })
        .then((data) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          console.log(data);
          const propsToPass = {
            shouldListenRealTime: true,
            number: number,
          };
          setUserValues(data);
          setLoadingClicked(false);
          navigation.navigate("MeditationScreen", propsToPass);
          console.log("success");
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

        navigation.navigate("Verification");

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
    sendEmailVerification(user)
      .then(() => {
        // Verification email sent.
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setSuccessMsg("Verification email sent. Please check your inbox.");
      })
      .catch((error) => {
        // Error occurred. Inspect error.code.
        setError(error.code);
      });
  };

  function emailLogin(setError, email, password, isRegister = false) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (userCredential.user.emailVerified) {
          navigation.navigate("BottomTabBar");
        } else {
          navigation.navigate("Verification");
        }
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
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
