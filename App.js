/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/screens/Register'
import FloatingButtonScreen from './src/screens/FloatingButtonScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ร้านอาหาร" 
                  component={FloatingButtonScreen} 
                  options={{
                    // headerTitleAlign:"center",
                    headerStyle: {
                      backgroundColor:'#01a69f',
                    },
                    headerTitleStyle: {
                      fontFamily:'Kanit-Bold',
                      color:'#ffff',
                    }
                  }}/>
      <Stack.Screen name="ลงทะเบียน" 
                    component={Register} 
                    options={{
                      headerLeft: null,
                      headerStyle: {
                        backgroundColor:'#01a69f',
                      },
                      headerTitleStyle: {
                        fontFamily:'Kanit-Bold',
                        color:'#ffff',
                      }
                  }}/>
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
          <StatusBar barStyle="light-content" backgroundColor="#01a69f" /> 
          <MyStack/>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
