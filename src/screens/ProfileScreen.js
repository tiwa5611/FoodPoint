import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Go to Notifications"
            onPress={() => this.props.navigation.navigate('Notifications')}
          />
          <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
        </View>
    );
  }
}
