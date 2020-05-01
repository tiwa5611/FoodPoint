import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Modal, Image, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FromInput from './Forminput'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

var arraytest = [
  {
    name:'ต๋องไง',
    location:{
      latitude:37.421998333333,
      longitude:-122.084
    }
  },
  {
    name:'ต๋องจ๋า',
    location:{
      latitude:37.41733778570779,
      longitude:-122.06795454025267
    }
  },
  {
    name:'ทุกอย่าง 20',
    location:{
      latitude:37.418160074287115,
      longitude:-122.09267444908618
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
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition( (position) => {
      // console.log('position: ', position)
      this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
        coor:position.coords
      })
      // console.log('coords', position)
      this.props.handleResponse(this.state.lat, this.state.lng)
    }, (err) => {
      // console.log('error:', err)
    },
    { enableHighAccuracy: true, timeout: 20000 , maximumAge: 2000,})
    this.fetchAPIGet_Shop()
  }



  randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
        },
      ],
    });
    console.log('marker: ', ...this.state.markers)
  }

  render() {
    console.log('--------------------')
    console.log('lng:', this.state.lng)
    console.log('lat:', this.state.lat)
    console.log('lssssss:', this.state.markers)
    console.log('dataFromApi:', this.state.dataFromApi)
    console.log('arraytest:', arraytest)
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
            console.log('xxdddddd', marker.coordinate),
            <MapView.Marker
                key = {index}
                coordinate={marker.location}
                title={marker.name}
                description={marker.des}
                // onMapPress
            >
              <MapView.Callout onPress={() => {this.setState({isModalVisible: !this.state.isModalVisible})}} />
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
                  onPress={() => { {this.setState({isModalVisible: !this.state.isModalVisible})}}} >
                  <Icon name={'times'} size={25} color={'#ecf0f1'}></Icon>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row',position:'absolute', top:15}}>
                <View>
                  <Image style={styles.imageStyle}  source={require('../../android/assets/images/logo-icon.png')}></Image>
                </View>
                <View style={{justifyContent:'space-between'}}>
                  <Text style={{marginLeft:10}} >ชื่อ - สกุล</Text>
                </View>                
              </View>
              <View style={{position:'absolute', top:height*0.19}}>
                <View style={styles.viewModalDetail}>
                  <Icon name={'line'} style={styles.textModalDetail} color={'#3ae374'}/>
                </View>
                <View style={styles.viewModalDetail}>
                  <Icon name={'phone'} style={styles.textModalDetail} color={'gray'}/>
                </View>
              </View>
            </View>
          </Modal>
      </View>
    );
  }

  fetchAPIGet_Shop() {
    console.log('***************fetchAPIGet_category************')
      fetch('http://sharing.greenmile.co.th/api/get_shop')
      .then((response) => response.json())
      .then((json) => {
        console.log('Map response: ', json)
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
  actionButton: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 10,
    left: 10,
    zIndex: 10
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
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
  imageStyle:{
    width:100,
    height:100,
    marginLeft:20,
  },
  viewModalDetail:{
    margin:10,
  },
  textModalDetail:{
    fontSize:width*0.09,
    marginLeft:15
  }
});
