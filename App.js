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
import LoginScreen from './src/screens/Login';
import Register from './src/screens/Register'
import SettingsScreen from './src/screens/SettingsScreen';
import MapAndButton from './src/screens/Mapandbutton';
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
      <Stack.Screen name="ลงทะเบียน" component={Register}/>
    </Stack.Navigator>
  );
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisibleScreen:false
    };
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer >
          <MyStack/>
          {/* <LoginScreen/> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
