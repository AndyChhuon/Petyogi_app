import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import AppContent from "./screens/AppContent";
import useAuth, { AuthProvider } from "./hooks/useAuth";
import * as Linking from "expo-linking";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const prefix = Linking.createURL("/");
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      BottomTabBar: "*",
    },
  },
};

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
