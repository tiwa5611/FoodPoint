import React, { Component, useState } from 'react';
import { Alert, View, Text, StyleSheet, Button, TextInput, Modal, Dimensions, AsyncStorage} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FromInput from './Forminput';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager}from 'react-native-fbsdk';
import Map from './Map';

const height = Dimensions.get('window').height
var user_name_face = ''
var pic_url_face= ''
export default class FloatingButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      statusUserLogin:false,
      //-------------------------- variable facebook ----------------------------
      token:'',
      userID:'',
      profile_pic:'',
      user_name:''
    };
  }

  async componentDidMount () {
    var token = await AsyncStorage.getItem('token')
    console.log('in componentDidMount:', await AsyncStorage.getItem('name') )
      try{
        if (token !== null ) { 
          this.setState({token:token, userID:await AsyncStorage.getItem('userID'), 
                        user_name:await AsyncStorage.getItem('name'), 
                        pic_url:await AsyncStorage.getItem('pic_url'), 
                        statusUserLogin:true})
        }
      }catch(err){
        console.error('Error:', err)
      }
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({ profile_pic: result.picture.data.url, user_name: result.name });
      user_name_face = result.name
      pic_url_face = result.picture.data.url
      this.firstLogin()
      // this.setValue(token, userID, result.name, result.picture.data.url)
    }
  };

  fbAuthen = () => {
    console.log('fbAuthen1')
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (result) => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log('fbAuthen2')
          var toKen
          var userId
          AccessToken.getCurrentAccessToken().then((data) => {
            toKen = data.accessToken.toString()
            userId = data.userID.toString()
            this.setState({token:toKen, userID:userId, statusUserLogin:true})
            this.setValue(toKen, userId)
            const infoRequest = new GraphRequest('/me?fields=name,picture.type(large)',null,this.get_Response_Info);
            new GraphRequestManager().addRequest(infoRequest).start();
          })
          console.log('fbAuthen() userID: ', this.state.userID)
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  }

  firstLogin = () => {
    let url = 'www.sharing.greenmile.co.th/api/profile/'+this.state.userID
    console.log('********************first login funtion********************')
    console.log('url: ', url)
    const response = fetch(url)
    console.log('response', response)
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   console.log('responseJson', responseJson.data)
    // })
    // .catch( error => {
    //   console.error("Error in fetch get profile: ", error);
    // });
  }

  async setValue(toKen, userID) {
    await AsyncStorage.setItem('token', toKen)
    await AsyncStorage.setItem('userID', userID)
    await AsyncStorage.setItem('name', user_name_face)
    await AsyncStorage.setItem('pic_url', pic_url_face)
  }

  logOut = () => {
    Alert.alert(
      'คำเตือน',
      'คุณต้องการออกจากระบบ คุณจะไม่สามารถใช้งานบางฟังก์ชันของระบบได้',
      [
        {
          text:"ยกเลิก",
          style:'cancel'
        },
        {
          text:"ยืนยัน",
          onPress: async () => { 
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('userID')
            await AsyncStorage.removeItem('name')
            await AsyncStorage.removeItem('pic_url')
            this.setState({token:'', userID:'', user_name:'', profile_pic:'', statusUserLogin:false})
           }
        }
      ]
    )
  }

  render() {
    console.log('Status user in system: ', this.state.statusUserLogin)
    console.log('token: ', this.state.token)
    console.log('userID: ', this.state.userID)
    console.log('user_name: ', this.state.user_name)
    console.log('Pictur_url: ', this.state.profile_pic)
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
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={ this.state.statusUserLogin? this.logOut : this.fbAuthen}>
                    <Icon name="facebook" style={styles.actionButtonIcon} color={this.state.statusUserLogin?'#4267B2':'gray'}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={() => {this.props.navigation.navigate('ลงทะเบียน')}}>
                    <Icon name="search-location" style={styles.actionButtonIcon} color='#2ecc71' />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={ () => this.setState({isModalVisible: !this.state.isModalVisible}) }>
                    <Icon name="map-marker-alt"  style={styles.actionButtonIcon} color='#e74c3c' />
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
    },
    modalView:{
      flex:1,
      margin:20,
      marginTop:height*0.22,
      backgroundColor:'white',
      borderRadius:10
    }
});