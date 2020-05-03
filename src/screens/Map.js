import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FromInput from './Forminput'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

var arraytest = [
  {
    "id": 23,
    "name": "ต๋องชาบู",
    "description": "บาชูหัวหมา",
    "phonenumber": "191",
    "line_id": null,
    "facebook_id": null,
    "category": {
        "id": 21,
        "name": "ที่ปรึกษา"
    },
    "province": {
        "id": 64,
        "name": "กระบี่"
    },
    "location": {
        "latitude": 37.413022220357,
        "longitude": -122.0810906589
    },
    "user": {
        "facebook_id": "1090377851317204"
    }
  },
  {
    "id": 24,
    "name": "ร้านยืมเพื่อน",
    "description": "ยืนเพื่อนมาขาย",
    "phonenumber": "191",
    "line_id": "Friend.polic",
    "facebook_id": "ต๋องไงจะไคนละ",
    "category": {
        "id": 4,
        "name": "นาฬิกาและแว่นตา"
    },
    "province": {
        "id": 35,
        "name": "สกลนคร"
    },
    "location": {
        "latitude": 37.435735930867,
        "longitude": -122.08341982216
    },
    "user": {
        "facebook_id": "1090377851317204"
    }
  },
  {
    "id": 25,
    "name": "สุขภาพดี",
    "description": "สุขภาพดีๆมีขายที่นี้",
    "phonenumber": "0899999999",
    "line_id": "T.op",
    "facebook_id": "Poal.dee",
    "category": {
        "id": 12,
        "name": "สุขภาพและความงาม"
    },
    "province": {
        "id": 59,
        "name": "สมุทรสาคร"
    },
    "location": {
        "latitude": 37.394360650186,
        "longitude": -122.0765138045
    },
    "user": {
        "facebook_id": "1090377851317204"
    }
  }
]
export default class Mapview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat:null,
      lng:null,
      coor:null,
      markers: [],
      dataFromApi:[],
      isModalVisible: false,
      statusUser:false,
      //------------------------ state detail -------------------
      id_detail:'',
      name_detail:'',
      des_detail:'',
      phon_detail:'',
      line_detail:'',
      facebook_detail:'',
      name_detail:'',
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition( (position) => {
      this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
        coor:position.coords,
      })
      this.props.handleResponse(this.state.lat, this.state.lng)
    }, (err) => {
    },
    { enableHighAccuracy: true, timeout: 20000 , maximumAge: 2000,})
    this.fetchAPIGet_Shop()
  }
//   this.setState({
//     markers: [ ...this.state.markers,
//       {
//          coordinate: e.nativeEvent.coordinate,              
//       },
//     ],
// });
    onMapPress(e) {
      if(this.props.handleUser){
        this.props.hadlePoint(true, e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
    } else {
      Alert.alert(
        'คำเตือน',
        'คุณต้องล๊อกอินเข้าสู่ระบบ เพื่อใช้งานฟังก์ชัน',
        [
          {
            text:"ยกเลิก",
            style:'cancel'
          },
          {
            text:"ยืนยัน",
            onPress: this.props.haddleManageLoginUser 
          }
        ]
      )
    }
  }

  render() {
    // console.log('lng:', this.state.lng)
    // console.log('lat:', this.state.lat)
    // console.log('statusUser Child:', this.props.handleUser)
    // console.log('arraytest:', arraytest)
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <MapView 
          ref="map" 
          mapType="terrain" 
          style={styles.map} 
          onLongPress={e => this.onMapPress(e)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{latitude: this.state.lat == null ? 37.419499: this.state.lat,
                          longitude:this.state.lng == null ? -122.080525: this.state.lng,
                          latitudeDelta: 0.0922, 
                          longitudeDelta: 0.0421}}
        >
        {
          arraytest != null && arraytest.map((marker, index) => (
            <MapView.Marker
                key = {index}
                coordinate={marker.location}
                title={marker.name}
                description={marker.des}
                onMapPress
            >
              <MapView.Callout onPress={() => {this.modalDetailPoint(marker.id)}} />
            </MapView.Marker>
          ))
        }
        </MapView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
          >
            <ScrollView style={styles.modalView}>
                <View style={styles.buttonModal}>
                  <TouchableOpacity
                    onPress={() => { this.setState({isModalVisible: !this.state.isModalVisible})}} >
                    <Icon name={'times'} size={25} color={'#ecf0f1'}></Icon>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <View style={{justifyContent:'space-between'}}>
                      <Text style={{marginLeft:10, fontSize:width*0.06, fontFamily:'Kanit-ExtraLight'}} >{this.state.name_detail}</Text>
                  </View>                
                </View>
                <View style={styles.viewModalDetail}>
                    <Icon name={'facebook'} style={styles.iconModalDetail} color={'#4267B2'}/>
                    <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}} >{this.state.facebook_detail}</Text>
                </View>
                <View style={styles.viewModalDetail}>
                  <Icon name={'line'} style={styles.iconModalDetail} color={'#3ae374'}/>
                  <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}} >{this.state.line_detail}</Text>
                </View>
                <View style={styles.viewModalDetail}>
                  <Icon name={'phone'} style={styles.iconModalDetail} color={'gray'}/>
                  <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}} >{this.state.phon_detail}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <View style={styles.stylebuutonInModal}>
                      <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#b2bec3', borderRadius:5 }} activeOpacity={0.5} onPress={() => {} }>
                        <Icon name={'pencil-alt'} size={20} color={'#ffffff'}/>
                        <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>แก้ไข</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.stylebuutonInModal}>
                      <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#ff7675', borderRadius:5}} activeOpacity={0.5} 
                        onPress={ this.modalDeletePoint.bind(this) }>
                        <Icon name={'trash-alt'} size={20}  color={'#ffffff'}/>
                        <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>ลบ</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
          </Modal>
      </View>
    );
  }

  modalDeletePoint() {
    console.log('ID: ', this.state.id_detail)
    console.log('user_facebook_id: ', this.props.handleFacebookId)
    fetch('http://sharing.greenmile.co.th/api/delete_shop',{
      method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:this.state.id_detail,
          user_facebook_id:this.props.handleFacebookId,
        }),
    })
    .then((response) => response.json())
    .then((json) => {
      console.log('response', json.data)
      this.setState({isModalVisible: !this.state.isModalVisible})
    })
    .catch((error) => {
      console.error('Fetch API error in add_shop', error);
    });
  }

  modalDetailPoint( id ) {
    console.log('http://sharing.greenmile.co.th/api/get_shop/'+id)
    fetch('http://sharing.greenmile.co.th/api/get_shop/'+id)
    .then((response) => response.json())
    .then((json) => {
      console.log('data : ', json.data)
      this.setState({
        id_detail:json.data.id,
        name_detail:json.data.name,
        des_detail:json.data.description,
        phon_detail:json.data.phonenumber,
        line_detail:json.data.line_id,
        facebook_detail:json.data.facebook_id,
        isModalVisible: true
      })
    })
    .catch((error) => {
      console.error('Error in fetchAPIGet_category: ',error);
    });
  }

  fetchAPIGet_Shop() {
    console.log('***************fetchAPIGet_category************')
      fetch('http://sharing.greenmile.co.th/api/get_shop')
      .then((response) => response.json())
      .then((json) => {
        this.setState({dataFromApi:json.data})
      })
      .catch((error) => {
        console.error('Error in fetchAPIGet_category: ',error);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  stylebuutonInModal:{
    margin:5
  },
  map: {
    width: width,
    height: height,
    zIndex: -1
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  modalView:{
    flex:1,
    margin:20,
    marginTop:height*0.5,
    backgroundColor:'white',
    borderRadius:10
  },
  buttonModal:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:15,
    marginRight:15,
  },
  viewModalDetail:{
    flexDirection:'row',
    margin:10,
  },
  iconModalDetail:{
    fontSize:width*0.09,
    marginLeft:15
  }
});
