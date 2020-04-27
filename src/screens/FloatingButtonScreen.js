import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableHighlight, Dimensions} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FromInput from './Forminput';
import Map from './Map';

const height = Dimensions.get('window').height
export default class FloatingButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    console.log('xxxxxxxxxxxxxxxx')
    console.log('StatusModal:', this.state.isModalVisible)
    return (
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            {/* <-------------------------------------------------------------------Map-------------------------------------------------------------- */} 
            <Map/>
            {/* <-------------------------------------------------------------------Modal-------------------------------------------------------------- */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.modalView}>
                <FromInput/>
              </View>
            </Modal>
            <ActionButton buttonColor="rgb(120, 224, 143)">
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={() => console.log("notes tapped!")}>
                    <Icon name="key" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={() => {}}>
                    <Icon name="share-alt" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={ () => this.setState({isModalVisible: !this.state.isModalVisible}) }>
                    <Icon name="search-location" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: '#2d3436',
    },
    modalView:{
      flex:1,
      margin:20,
      marginTop:height*0.22,
      backgroundColor:'white',
      borderRadius:10
    }
});