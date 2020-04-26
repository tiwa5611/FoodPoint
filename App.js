/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MapScreen from './src/screens/Map';
import FloatingButtonScreen from './src/screens/FloatingButtonScreen'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
createHomeStack = () =>
  <Stack.Navigator>
    <Stack.Screen
      name="MapScreen"
      children={this.createDrawer}
      options={{
        title: "Navigation Hooks & Themes"
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: "Detail Screen"
      }}
    />
  </Stack.Navigator>

export default class App extends Component {
  render() {
    return (
      // <NavigationContainer>
      //   <MyStack />
      // </NavigationContainer>
      <FloatingButtonScreen/>
    );
  }
}
