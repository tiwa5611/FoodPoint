/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StatusBar,
  Dimensions,
  Picker
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Register from './src/screens/Register'
import FloatingButtonScreen from './src/screens/FloatingButtonScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const width = Dimensions.get('screen').width
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
                      marginLeft:20,

                    },
                    headerTitleStyle: {
                      fontFamily:'Kanit-Bold',
                      color:'#ffff',
                    },
                    headerRight: () => (
                      <Icon
                        name={"list-ul"}
                        size={width*0.06}
                        onPress={() => alert('This is a button!')}
                        color="#fff"
                        style={{marginRight:15}}

                      />
                    ),
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

  componentDidMount() {
    StatusBar.setHidden(true)
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer >
          <StatusBar barStyle="light-content" backgroundColor="#01a69f" hidden={false}/> 
          <MyStack/>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
