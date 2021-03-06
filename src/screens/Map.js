import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Animated  } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import mapStyle from '../json/mapStyle.json'
import AlertPro from "react-native-alert-pro";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

var text_null = 'ไม่มีข้อมูล'

export default class Mapview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat:null,
      lng:null,
      isModalVisible: false,
      //------------------------ state detail -------------------
      id_detail:'',
      name_detail:'',
      des_detail:'',
      phon_detail:'',
      line_detail:'',
      facebook_detail:'',
      facebook_id:''
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
        this.setState({lat:e.nativeEvent.coordinate.latitude, lng:e.nativeEvent.coordinate.longitude})
        this.props.hadlePoint(true, e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
    } else {
      // this.AlertPro.open()
      // this.AlertPro.close()
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
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <MapView 
          ref="map" 
          mapType="terrain"   //terrain//standard//satellite
          style={styles.map} 
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          onLongPress={ e => this.onMapPress(e) }
          showsUserLocation provider="google"
          showsMyLocationButton={true}
          // showsTraffic={true}
          showsIndoors={true}
          // showsScale={true}
          showsCompass={true}
          showsBuildings
          followsUserLocation={true}
          loadingBackgroundColor={'#81ecec'}
          region={{
            latitude: this.state.lat == null ? 13.0110712: this.state.lat,
            longitude:this.state.lng == null ? 96.9949203: this.state.lng,
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421
          }}
          // initialRegion
        >
        {
         this.props.handleGetShop != null && this.props.handleGetShop.map((marker, index) => (
            <MapView.Marker
                key = {index}
                coordinate={marker.location}
                title={marker.name}
                description={marker.des}
                pinColor={marker.pinColor}
                opacity={marker.id == undefined? 0.4 : 1}
                // onMapPress
                onPress={ () => {this.modalDetailPoint(marker.id) } }
            >
                <MapView.Callout >
                  {marker.id == undefined? <View/> : 
                  <View style={{flex:1, borderRadius:40, padding:5}}>
                    <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}}>{marker.name}</Text>
                  </View>
                  }
                </MapView.Callout>
            </MapView.Marker>
          ))
        }
        </MapView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
          >
            <View style={styles.modalView}>
              <View style={styles.buttonModal}>
                <TouchableOpacity
                  onPress={() => { this.setState({isModalVisible: !this.state.isModalVisible})}} >
                  <Icon name={'times'} size={25} color={'#ecf0f1'}></Icon>
                </TouchableOpacity>
              </View>
              <ScrollView >
                  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'space-between'}}>
                        <Text style={{marginLeft:10, fontSize:width*0.06, fontFamily:'Kanit-ExtraLight'}} >{this.state.name_detail}</Text>
                    </View>                
                  </View>
                  <View style={{justifyContent:'center', alignItems:'center', marginBottom:5, marginTop:5}}>
                      <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}} >{this.state.facebook_detail == null ? text_null : this.state.des_detail}</Text>
                  </View>
                  <View style={styles.viewModalDetail}>
                      <Icon name={'facebook'} style={styles.iconModalDetail} color={'#4267B2'}/>
                      <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}} >{this.state.facebook_detail == null ? text_null : this.state.facebook_detail}</Text>
                  </View>
                  <View style={styles.viewModalDetail}>
                    <Icon name={'line'} style={styles.iconModalDetail} color={'#3ae374'}/>
                    <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}} >{this.state.line_detail  == null ? text_null : this.state.line_detail}</Text>
                  </View>
                  <View style={styles.viewModalDetail}>
                    <Icon name={'phone'} style={styles.iconModalDetail} color={'gray'}/>
                    <Text style={{marginLeft:10, fontSize:width*0.04, fontFamily:'Kanit-ExtraLight'}} >{this.state.phon_detail  == null ? text_null : this.state.phon_detail}</Text>
                  </View>
                  { this.props.handleUser || ( this.props.handleFacebookId == this.state.facebook_detail ) ?  
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <View style={styles.stylebuutonInModal}>
                          <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#b2bec3', borderRadius:5 }} activeOpacity={0.5} onPress={() => {} }>
                            <Icon name={'pencil-alt'} size={20} color={'#ffffff'}/>
                            <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>แก้ไข</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.stylebuutonInModal}>
                          <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#ff7675', borderRadius:5}} activeOpacity={0.5} 
                            onPress={ this.modalDeletePoint.bind(this)} >
                            <Icon name={'trash-alt'} size={20}  color={'#ffffff'}/>
                            <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>ลบ</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                    : null
                  }
              </ScrollView>
            </View>
          </Modal>
      </View>
    );
  }

  modalDeletePoint() {
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
      this.props.handleRefetchGetShop(true)
      this.setState({isModalVisible: !this.state.isModalVisible})
    })
    .catch((error) => {
      console.error('Fetch API error in add_shop', error);
    });
     
  }

  modalDetailPoint( id ) {
    if( id != undefined) {
      fetch('http://sharing.greenmile.co.th/api/get_shop/'+id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          id_detail:json.data.id,
          name_detail:json.data.name,
          des_detail:json.data.description,
          phon_detail:json.data.phonenumber,
          line_detail:json.data.line_id,
          facebook_detail:json.data.facebook_id,
          facebook_id:json.data.user.facebook_id,
          isModalVisible: true,
          lat:json.data.location.latitude,
          lng:json.data.location.longitude
        })
      })
      .catch((error) => {
        console.error('Error in fetchAPIGet_category: ',error);
      });
    }
  }

  fetchAPIGet_Shop() {
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
    // width: width,
    // height: height,
    // zIndex: -10
    ...StyleSheet.absoluteFillObject,
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
    backgroundColor:'transparent'
  },
  viewModalDetail:{
    flexDirection:'row',
    margin:10,
  },
  iconModalDetail:{
    fontSize:width*0.07,
    marginLeft:15
  }
});
