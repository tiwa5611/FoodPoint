/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  SafeAreaViewBase
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import LoginScreen from './src/screens/Login';
import SettingsScreen from './src/screens/SettingsScreen';
import MapAndButton from './src/screens/Mapandbutton';
import MapScreen from './src/screens/Map';
import FloatingButtonScreen from './src/screens/FloatingButtonScreen'
import Forminput from './src/screens/Forminput'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalStyle from './src/GlobalStyles'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ตำแหน่งร้านอาหาร" component={FloatingButtonScreen} />
      <Stack.Screen name="กรอกข้อมูล" component={Forminput}/>
    </Stack.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer >
          <MyStack />
          {/* <LoginScreen/> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
