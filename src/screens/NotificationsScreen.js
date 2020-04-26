import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings')}
          />
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
  }
}