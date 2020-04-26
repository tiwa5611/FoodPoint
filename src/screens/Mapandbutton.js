import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const markersArray = [
  {
    title: 'point A',
    des:'ร้านขายอาหาร',
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
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition( (position) => {
      console.log('position: ', position)
      this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
        coor:position.coords
      })
      console.log('coords', position)
    }, (err) => {
      console.log('error:', err)
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
    console.log('latitude', this.state.lat)
    console.log('longitude', this.state.lng)
    console.log('Markers', this.state.markers)
    return (
    <SafeAreaView>
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                <ActionButton buttonColor="rgb(120, 224, 143)">
                    <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={() => console.log("notes tapped!")}>
                        <Icon name="key" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={() => {}}>
                        <Icon name="share-alt" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgb(255, 255, 255)' onPress={ () => { testFunction }}>
                        <Icon name="search-location" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
            <MapView 
            ref="map" 
            mapType="terrain" 
            style={styles.map} 
            onLongPress={e => this.onMapPress(e)}
            initialRegion={{latitude: this.state.lat == null ? 37.419499: this.state.lat,
                            longitude:this.state.lng == null ? -122.080525: this.state.lng,
                            latitudeDelta: 0.0922, 
                            longitudeDelta: 0.0421}}
            >
            {
            this.state.markers != null && this.state.markers.map((marker, index) => (
                <MapView.Marker
                    key = {index}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.des}
                >
                {console.log('index:', index)}
                {console.log('test:', marker)}
                {console.log('coor state:', this.state.coor)}
                </MapView.Marker>
            ))
            }
            </MapView>
            
        </View>
    </SafeAreaView>
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#2d3436',
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
  }
});
