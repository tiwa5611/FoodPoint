import React, { Component, useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, Modal, Dimensions, AsyncStorage, ScrollView, Picker, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
// import { Icon } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Register from '../screens/Register'
import FromInput from './Forminput';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager}from 'react-native-fbsdk';
import Map from './Map';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
var user_name_face = ''
var pic_url_face= ''


export default class FloatingButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisibleInput:false,
      isModalVisibleSearch:false,
      statusUserLogin:false,
      //-------------------------- variable facebook ----------------------------
      token:'',
      userID:'',
      profile_pic:'',
      user_name:'',
      get_categorial:[],
      get_province:[],
      //--------------------------- variable for input form ----------------------
      shop_name_state:'',
      description_state:'',
      phonenumber_state:'',
      line_id_state:'',
      facebook_id_state:'',
      category_state:'',
      province_state:'',
      latitude_state:'',
      longitude_state:'',
    };
    this.handleLatLong = this.handleLatLong.bind(this)
    this.handleMarkPoint = this.handleMarkPoint.bind(this)
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
  }

  handleMarkPoint(visibleModal, lat, lng) {
    console.log('visibleModal', visibleModal)
    console.log('lat', lat)
    console.log('lng', lng)
    this.fetchAPIGet_category()
    this.fetchAPIGet_province()
    this.setState({
      isModalVisibleInput:visibleModal, 
      latitude_state:lat, 
      longitude_state:lng
    })
  }

  handleLatLong (lat, lng) {
    this.setState({
      latitude_state:lat,
      longitude_state:lng
    })
  }

  get_Response_Info = (error, result) => {
    console.log('get_Response_Info')
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({ profile_pic: result.picture.data.url, user_name: result.name });
      user_name_face = result.name
      pic_url_face = result.picture.data.url
      this.firstUserLogin()
    }
  };

  firstUserLogin() {
    console.log('firstUserLogin')
    console.log('http://sharing.greenmile.co.th/api/profile/'+this.state.userID)
    let url = 'http://sharing.greenmile.co.th/api/profile/'+this.state.userID
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log('data:', json.data)
      if( json.data == 'not found' ) {
        this.props.navigation.navigate('ลงทะเบียน', { data:{
          username:user_name_face,
          imageProfile:pic_url_face,
          user_id:this.state.userID
        }})
      }
    })
    .catch((error) => {
      console.error('profile',error);
    });
  }
  // 
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

  async setValue(toKen, userID) {
    await AsyncStorage.setItem('token',toKen)
    await AsyncStorage.setItem('userID',userID)
    await AsyncStorage.setItem('name',user_name_face)
    await AsyncStorage.setItem('pic_url',pic_url_face)
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
    // console.log('Status user in parent: ',this.state.statusUserLogin)
    // console.log('name : ',this.state.shop_name_state)
    // console.log('description: ',this.state.description_state)
    // console.log('phonenumber: ',this.state.phonenumber_state)
    // console.log('line_id :',this.state.line_id_state)
    // console.log('user_facebook_id:',this.state.userID)
    // console.log('category:',this.state.category_state)
    // console.log('province:',this.state.province_state)
    // console.log('location:',this.state.latitude_state+' , '+this.state.longitude_state)
    // console.log('facebook_id:',this.state.facebook_id_state)
    // console.log('user_name: ', this.state.user_name)
    // console.log('get_categorial: ', this.state.get_categorial)
    return (
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            {/* <---------------------------------------------------------------------------Map--------------------------------------------------------------------- */} 
            <Map 
              handleResponse={this.handleLatLong} 
              handleUser={this.state.statusUserLogin}
              haddleManageLoginUser={this.fbAuthen}
              hadlePoint={this.handleMarkPoint}
              handleFacebookId={this.state.userID}
            />
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
                    <Text style={{fontFamily:'Kanit-ExtraLight' , fontSize:20, padding:10}}>Province |</Text>
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
                    <Text style={{fontFamily:'Kanit-ExtraLight', fontSize:20, padding:10}}>Categories |</Text>
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
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:height*0.04}}>
                  <View style={{marginLeft:5}}>
                    <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#b2bec3', borderRadius:5 }} activeOpacity={0.5} 
                   onPress={() =>  { this.setState({isModalVisibleSearch: !this.state.isModalVisibleSearch}) }
                  }
                    >
                      <Icon name={'search'} size={20} color={'#ffffff'}/>
                      <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>ค้นหา</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginLeft:5}}>
                    <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#ff7675', borderRadius:5}} activeOpacity={0.5} 
                    onPress={() =>  { this.setState({isModalVisibleSearch: !this.state.isModalVisibleSearch}) }}
                    >
                      <Icon name={'brush'} size={20}  color={'#ffffff'}/>
                      <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>ล้างข้อมูล</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
                        onChangeText={(text) => this.setState({shop_name_state:text})}
                      />
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <Text style={styles.textHeader}>Categories</Text>
                      <View style={{ flex:1, borderWidth:1, borderColor:'#dfe6e9', margin:5, borderRadius:5}}>
                        <Picker
                          selectedValue={this.state.category_state == ''? 'กระเป๋า': this.state.category_state}
                          style={{flex:1}}
                          onValueChange={(itemValue, itemIndex) => this.setState({category_state: itemValue})
                          }>
                            { this.state.get_categorial !== null && this.state.get_categorial.map((value) => {
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
                        onChangeText={(text) => this.setState({description_state:text})}
                      />
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:15}}>
                      <Text style={styles.textHeader}>Tel</Text>
                      <View style={{ flex:1}}>
                          <TextInput
                            style={styles.textInput}
                            keyboardType={"numeric"}
                            maxLength={10}
                            onChangeText={(text) => this.setState({phonenumber_state:text})}
                          />
                        </View>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}> 
                        <Text style={styles.textHeader}>Line ID.</Text>
                        <View style={{ flex:1}}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({line_id_state:text})}
                          />
                        </View>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}> 
                        <Text style={styles.textHeader}>Facebook</Text>
                        <View style={{ flex:1}}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({facebook_id_state:text})}
                          />
                        </View>
                  </View>
                  <View>
                      <Text style={styles.textHeader}>Province</Text>
                      <View style={{ flex:1, borderWidth:1, borderColor:'#dfe6e9', margin:5, borderRadius:5}}>
                        <Picker
                          selectedValue={this.state.province_state == ''? 'กระบี่': this.state.province_state}
                          style={{flex:1}}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({province_state: itemValue})
                          }>
                            { this.state.get_province.map((value) => {
                                return <Picker.Item label={value.name} value={value.id}/>
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
                        value={this.state.latitude_state+','+this.state.longitude_state}
                      />
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>
                    <TouchableOpacity style={styles.buttonSuccess} activeOpacity={0.5} onPress={ this.fetchAPIAdd_shop }>
                      <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight'}}>บันทึก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCancel} activeOpacity={0.5} onPress={ () => this.setState({isModalVisibleInput: !this.state.isModalVisibleInput})}>
                      <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight'}}>ยกเลิก</Text>
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
                <ActionButton.Item buttonColor='rgb(255, 255, 255)' 
                  onPress={ () => this.setState({isModalVisibleSearch: !this.state.isModalVisibleSearch})}
                  >
                    <Icon name="search-location" style={styles.actionButtonIcon} color='#2ecc71' />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='rgb(255, 255, 255)'
                   onPress={() => { this.state.statusUserLogin ? this.fetchApiForInputForm() : 
                   Alert.alert('คำเตือน','คุณต้องล๊อกอินเข้าสู่ระบบ เพื่อใช้งานฟังก์ชัน',
                    [
                      {
                        text:"ยกเลิก",
                        style:'cancel'
                      },
                      {
                        text:"ยืนยัน",
                        onPress: this.fbAuthen
                      }
                    ]
                   )}
                  }
                >
                    <Icon name="map-marker-alt"  style={styles.actionButtonIcon} color='#e74c3c'/>
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
  }

  fetchAPIAdd_shop = () => {
    console.log('fetchAPIAdd_shop success')
    if(this.state.shop_name_state == ''){
      alert('กรุณาใส่ชื่อร้าน')
    } else {
      fetch('http://sharing.greenmile.co.th/api/add_shop',{
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name:this.state.shop_name_state,
              description:this.state.description_state,
              phonenumber:this.state.phonenumber_state,
              line_id:this.state.line_id_state,
              user_facebook_id:this.state.userID,
              category_id:this.state.category_state,
              province_id:this.state.province_state,
              latitude:this.state.latitude_state,
              longitude:this.state.longitude_state,
              facebook_id:this.state.facebook_id_state,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
          console.log('response', json.data)
          this.setState({isModalVisibleInput: !this.state.isModalVisibleInput})
        })
        .catch((error) => {
          console.error('Fetch API error in add_shop', error);
        });
      }
  }

  fetchApiForInputForm ()  {
    this.fetchAPIGet_category()
    this.fetchAPIGet_province()
    this.setState({isModalVisibleInput: !this.state.isModalVisibleInput})
  }

  fetchAPIGet_category = () => {
    console.log('***************fetchAPIGet_category************')
    if(this.state.category_state == '') {
      fetch('http://sharing.greenmile.co.th/api/get_category')
      .then((response) => response.json())
      .then((json) => {
        this.setState({get_categorial:json.data})
      })
      .catch((error) => {
        console.error('Error in fetchAPIGet_category: ',error);
      });
    }
  }

  fetchAPIGet_province() {
    console.log('***************fetchAPIGet_province************')
    if(this.state.province_state == '') {
      fetch('http://sharing.greenmile.co.th/api/get_province')
      .then((response) => response.json())
      .then((json) => {
        this.setState({get_province:json.data})
      })
      .catch((error) => {
        console.error('Error in fetchAPIGet_province: ',error);
      });
    }
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
      marginRight:10,
      marginLeft:10,
      marginBottom:10
  },
  textHeader:{
    fontSize:width*0.05,
    marginBottom:10,
    marginTop:20,
    marginRight:10,
    fontFamily:'Kanit-ExtraLight' 
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