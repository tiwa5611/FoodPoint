import React, { Component, useState } from 'react';
import { Alert, View, Text, StyleSheet, Button, TextInput, Modal, Dimensions, AsyncStorage, ScrollView, Picker, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Register from '../screens/Register'
import FromInput from './Forminput';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager}from 'react-native-fbsdk';
import Map from './Map';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
var user_name_face = ''
var pic_url_face= ''

var province_th = [
  'กรุงเทพฯ',
  'กระบี่',
  'กาญจนบุรี',
  'กาฬสินธุ์',
  'กำแพงเพชร',
  'ขอนแก่น',
  'จันทบุรี',
  'ฉะเชิงเทรา',
  'ชลบุรี',
  'ชัยนาท',
  'ชัยภูมิ',
  'ชุมพร',
  'เชียงใหม่',
  'เชียงราย',
  'ตรัง',
  'ตราด',
  'ตาก',
  'นครนายก',
  'นครปฐม',
  'นครพนม',
  'นครราชสีมา',
  'นครศรีธรรมราช',
  'นครสวรรค์',
  'นนทบุรี',
  'นราธิวาส',
  'น่าน',
  'บึงกาฬ',
  'บุรีรัมย์',
  'ปทุมธานี',
  'ประจวบคีรีขันธ์',
  'ปราจีนบุรี',
  'ปัตตานี',
  'พระนครศรีอยุธยา',
  'พะเยา',
  'พังงา',
  'พัทลุง',
  'พิจิตร',
  'พิษณุโลก',
  'เพชรบุรี',
  'เพชรบูรณ์',
  'แพร่',
  'ภูเก็ต',
  'มหาสารคาม',
  'มุกดาหาร',
  'แม่ฮ่องสอน',
  'ยโสธร',
  'ยะลา',
  'ร้อยเอ็ด',
  'ระนอง',
  'ระยอง',
  'ราชบุรี',
  'ลพบุรี',
  'ลำปาง',
  'ลำพูน',
  'เลย',
  'ศรีสะเกษ',
  'สกลนคร',
  'สงขลา',
  'สตูล',
  'สมุทรปราการ',
  'สมุทรสงคราม',
  'สมุทรสาคร',
  'สระแก้ว',
  'สระบุรี',
  'สิงห์บุรี',
  'สุโขทัย',
  'สุพรรณบุรี',
  'สุราษฎร์ธานี',
  'สุรินทร์',
  'หนองคาย',
  'หนองบัวลำภู',
  'อ่างทอง',
  'อำนาจเจริญ',
  'อุดรธานี',
  'อุตรดิตถ์',
  'อุทัยธานี',
  'อุบลราชธานี',
];

export default class FloatingButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisibleInput: false,
      isModalVisibleSearch:false,
      statusUserLogin:false,
      //-------------------------- variable facebook ----------------------------
      token:'',
      userID:'',
      profile_pic:'',
      user_name:'',
      get_categorial:[]
    };
  }



  async componentDidMount () {
    var token = await AsyncStorage.getItem('token')
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
      this.fetchAPIGet_category()
  }

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({ profile_pic: result.picture.data.url, user_name: result.name });
      user_name_face = result.name
      pic_url_face = result.picture.data.url
      this.firstLogin
      // this.setValue(token, userID, result.name, result.picture.data.url)
    }
  };

  fbAuthen = () => {
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
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  }

  firstLogin() {
    console.log('http://sharing.greenmile.co.th/api/profile/'+this.state.userID)
    let url = 'http://sharing.greenmile.co.th/api/profile/'+this.state.userID
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log('data:', json.data)
      if( json.data == 'not found' ) {
        this.props.navigation.navigate('ลงทะเบียน', { name:this.state.user_name, pic: this.state.profile_pic ,userID:this.state.userID })
      }
    })
    .catch((error) => {
      console.error('profile',error);
    });
  }

  fetchAPIGet_category = () => {
    console.log('***************fetchAPIGet_category************')
    fetch('http://sharing.greenmile.co.th/api/get_category')
    .then((response) => response.json())
    .then((json) => {
      console.log('APIGet_category:', json.data)
      this.setState({get_categorial:json.data})
    })
    .catch((error) => {
      console.error('Error in fetchAPIGet_category: ',error);
    });
  }

  async setValue(toKen, userID) {
    await AsyncStorage.setItem('token', toKen)
    await AsyncStorage.setItem('userID', userID)
    await AsyncStorage.setItem('name', user_name_face)
    await AsyncStorage.setItem('get_categorial', get_categorial)
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
    console.log('get_categorial: ', this.state.get_categorial)
    const { lat, lng } = this.props.route.params
    return (
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            {/* <---------------------------------------------------------------------------Map--------------------------------------------------------------------- */} 
            <Map/>
            {/* <------------------------------------------------------------------- Modal form Search -------------------------------------------------------------- */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isModalVisibleSearch}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={{flex:1, backgroundColor:'white', marginLeft:30, marginRight:30, marginTop:height*0.3, marginBottom:height*0.3, borderRadius:5,}}>
                  <View style={{flexDirection:'row', marginLeft:30, marginRight:30, marginTop:20, borderWidth:1, borderColor:'gray', marginBottom:10, borderRadius:5}}>
                      <Text style={{fontFamily:'Kanit-Thin' , fontSize:20, padding:10}}>Province |</Text>
                      <View style={{flex:1}}>
                          <Picker
                          selectedValue={this.state.language}
                          style={{flex:1}}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                          }>
                            <Picker.Item label="เลือกจังหวัด"/>
                            <Picker.Item label="JavaScript1" value="js1" />
                            <Picker.Item label="JavaScript2" value="js2" />
                            <Picker.Item label="JavaScript3" value="js3" />
                        </Picker>
                      </View>
                  </View>
                  <View style={{flexDirection:'row',  marginLeft:30, marginRight:30, borderWidth:1, borderColor:'gray',borderRadius:5}}>
                      <Text style={{fontFamily:'Kanit-Thin', fontSize:20, padding:10}}>Categories |</Text>
                      <View style={{flex:1}}>
                          <Picker
                          selectedValue={this.state.language}
                          style={{flex:1}}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                          }>
                            
                            <Picker.Item label="JavaScript1" value="js1" />
                            <Picker.Item label="JavaScript2" value="js2" />
                            <Picker.Item label="JavaScript3" value="js3" />
                        </Picker>
                      </View>
                  </View>
                <TouchableOpacity 
                style={{flexDirection:'row', backgroundColor:'#78e08f', justifyContent:'center', alignItems:'center', marginLeft:width*0.25, marginRight:width*0.25, borderRadius:5, marginTop:height*0.025}}
                activeOpacity={0.5} 
                onPress={() => { {this.setState({isModalVisibleSearch: !this.state.isModalVisibleSearch})}}}>
                  <Icon name={'search'}></Icon>
                    <Text style={{fontSize:20, fontFamily:'Kanit-Thin', padding:5}}>ค้นหา</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            {/* <------------------------------------------------------------------- Modal form input -------------------------------------------------------------- */} 
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isModalVisibleInput}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
            <View style={styles.modalView}>
            <ScrollView>
              <View style={styles.container}>
                  <View>
                      <Text style={styles.textHeader}>ชื่อร้าน</Text>
                      <TextInput
                        style={styles.textInput}
                      />
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <Text style={styles.textHeader}>Categories</Text>
                      <View style={{ flex:1, borderWidth:1, borderColor:'#dfe6e9', margin:5, borderRadius:5}}>
                        <Picker
                          selectedValue={this.state.language}
                          style={{flex:1}}
                          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})
                          }>
                            { this.state.get_categorial !== null && this.state.get_categorial.map((value) => {
                                {console.log('name:'+value.name +'     ', 'ID: '+value.id)}
                                return <Picker.Item label={value.name} value={value.id} />
                              })
                            }
                        </Picker>
                      </View>
                  </View>
                  <View>
                      <Text style={styles.textHeader}>รายละเอียดสินค้า</Text>
                      <TextInput
                        style={{height:height*0.13, borderWidth:2, borderRadius:4, borderColor:'#dfe6e9'}}
                        multiline
                        numberOfLines={4}
                      />
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <Text style={styles.textHeader}>Tel</Text>
                      <View style={{ flex:1}}>
                          <TextInput
                            style={styles.textInput}
                            keyboardType={"numeric"}
                            maxLength={10}
                          />
                        </View>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}> 
                        <Text style={styles.textHeader}>Line ID.</Text>
                        <View style={{ flex:1}}>
                          <TextInput
                            style={styles.textInput}
                          />
                        </View>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}> 
                        <Text style={styles.textHeader}>Facebook</Text>
                        <View style={{ flex:1}}>
                          <TextInput
                            style={styles.textInput}
                          />
                        </View>
                  </View>
                  <View>
                      <Text style={styles.textHeader}>Province</Text>
                      <View style={{ flex:1, borderWidth:1, borderColor:'#dfe6e9', margin:5, borderRadius:5}}>
                        <Picker
                          selectedValue={this.state.language}
                          style={{flex:1}}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                          }>
                            { province_th.map((value) => {
                                return <Picker.Item label={value} value={value}/>
                              }) 
                            }
                        </Picker>
                      </View>
                  </View>
                  <View>
                      <Text style={styles.textHeader}>พิกัด</Text>
                      <TextInput
                        style={styles.textInput}
                        editable={false}
                        value={}
                      />
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>
                    <TouchableOpacity style={styles.buttonSuccess} activeOpacity={0.5}>
                      <Text style={{fontSize:20, fontFamily:'Kanit-Thin'}}>บันทึก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCancel} activeOpacity={0.5} onPress={ () => this.setState({isModalVisibleInput: !this.state.isModalVisibleInput})}>
                      <Text style={{fontSize:20, fontFamily:'Kanit-Thin'}}>ยกเลิก</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </ScrollView>
            </View>
            </Modal>
            {/* <------------------------------------------------------------------- end modal form input -------------------------------------------------------------- */} 

            <ActionButton buttonColor="rgb(120, 224, 143)">
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={ this.state.statusUserLogin? this.logOut : this.fbAuthen}>
                    <Icon name="facebook" style={styles.actionButtonIcon} color={this.state.statusUserLogin?'#4267B2':'gray'}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={() => {{this.setState({isModalVisibleSearch: !this.state.isModalVisibleSearch})}}}>
                    <Icon name="search-location" style={styles.actionButtonIcon} color='#2ecc71' />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={ () => this.setState({isModalVisibleInput: !this.state.isModalVisibleInput})}>
                    <Icon name="map-marker-alt"  style={styles.actionButtonIcon} color='#e74c3c' />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
  }
}
// 

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
    },
    container: {
      flex:1,
      margin:20
  },
  textHeader:{
    fontSize:width*0.05,
    marginBottom:10,
    marginTop:20,
    marginRight:10,
    // fontFamily:'DancingScript-Regular' 
  },
  textInput: {
    borderWidth:2,
    borderColor:'#dfe6e9',
    padding:0,
    borderRadius:5,
    height:height*0.06,
    marginBottom:10,
  }, 
  buttonSuccess: {
    backgroundColor:'#2ecc71',
    height:50,
    width:80,
    borderRadius:5,
    justifyContent:'center', 
    alignItems:'center',
    marginRight:10
  },
  buttonCancel: {
    backgroundColor:'#e74c3c',
    height:50,
    width:80,
    borderRadius:5,
    justifyContent:'center', 
    alignItems:'center',
    marginLeft:10
  }
});