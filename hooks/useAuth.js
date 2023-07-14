import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { auth } from "../config/firebaseConfig";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getIdToken,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appInitialized, setAppInitialized] = useState(false);
  const [userValues, setUserValues] = useState({});

  const navigation = useNavigation();

  // useEffect(() => {
  //   if (appInitialized) {
  //     var unsubscribe = onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUser(user);

  //         if (user.emailVerified) {
  //           //
  //           getIdToken(user).then((idToken) => {
  //             //post request
  //             fetch(
  //               "https://sleepy-bastion-87226-0172f309845e.herokuapp.com/initializeUser",
  //               {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify({
  //                   idToken: idToken,
  //                 }),
  //               }
  //             )
  //               .then((res) => res.json())
  //               .then((data) => {
  //                 setUserValues(data);
  //                 navigation.navigate("BottomTabBar");
  //               })
  //               .catch((err) => {
  //                 showMessage({
  //                   message: "There was an error fetching your data.",
  //                   type: "danger",
  //                 });
  //               });
  //           });
  //         }
  //       } else {
  //         navigation.navigate("Register");
  //       }
  //     });

  //     return unsubscribe;
  //   }
  // }, [appInitialized]);

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
      userValues,
    }),
    [
      user,
      emailSignup,
      emailVerification,
      emailLogin,
      setAppInitialized,
      userValues,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
