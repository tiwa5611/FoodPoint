import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Modal, Image, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FromInput from './Forminput'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const name = "ต๋องนะ"
const markersArray = [
  {
    title: 'point A',
    des:
      'title:ร้านขายข้าว\n'+'${name}\n'+'Tel:0833397464',
    coordinate: {
      latitude:37.419499,
      longitude:-122.080525
    }
  },
  {
    title: 'point B',
    des:'ร้านขายรองเท้า',
    coordinate: {
      latitude:37.421971,
      longitude:-122.089740
    }
  },
  {
    title: 'point C',
    des:'ร้านขายเสื้อผ้า',
    coordinate: {
      latitude:37.426593,
      longitude:-122.081076
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
    }, (err) => {
      // console.log('error:', err)
    },
    { enableHighAccuracy: true, timeout: 20000 , maximumAge: 2000,})
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
  }

  render() {
    console.log('-------------------')
    // console.log('Marker', this.state.lng)
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
          markersArray != null && markersArray.map((marker, index) => (
            <MapView.Marker
                key = {index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.des}
                onMapPress
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
                  <Icon name={'window-close'} size={40} color={'#ecf0f1'}></Icon>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row',position:'absolute', top:15}}>
                <View>
                  <Image style={styles.imageStyle}  source={require('../../android/assets/images/logo-icon.png')}></Image>
                </View>
                <View style={{justifyContent:'space-between'}}>
                  <Text style={{marginLeft:10}}>ชื่อ - สกุล</Text>
                </View>                
              </View>
              <View style={{position:'absolute', top:height*0.19}}>
                <View style={styles.viewModalDetail}>
                  <Text style={styles.textModalDetail}>Line:</Text>
                </View>
                <View style={styles.viewModalDetail}>
                  <Text style={styles.textModalDetail}>Tel:</Text>
                </View>
              </View>
            </View>
          </Modal>
      </View>
    );
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
    fontSize:20,
    marginLeft:15
  }
});
