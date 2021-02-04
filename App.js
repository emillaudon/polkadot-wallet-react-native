
import { StatusBar } from "expo-status-bar";
//import './shim';
import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import { context } from './AuthContext'
import AuthContextProvider from './AuthContext';
import AuthNavigation from './navigation /AuthNavigation';
//import Identicon from '@polkadot/reactnative-identicon';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <AuthNavigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  

});
