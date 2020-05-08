import React, { Component, useState } from 'react';
import { View, Text, Modal, Dimensions, Picker, TouchableOpacity, ProgressViewIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalVisibleSearch:false,
        get_province:[],
        province_state:'',
        get_categorial:[],
        category_state:'',
    };
  }

componentDidMount() {
  fetch('http://sharing.greenmile.co.th/api/get_province')
  .then((response) => response.json())
  .then((json) => {
    this.setState({get_province:json.data})
  })
  .catch((error) => {
    console.error('Error in fetchAPIGet_province: ',error);
  })

  fetch('http://sharing.greenmile.co.th/api/get_category')
      .then((response) => response.json())
      .then((json) => {
        this.setState({get_categorial:json.data})
      })
      .catch((error) => {
        console.error('Error in fetchAPIGet_category: ',error);
      })
}

  render() {
      console.log('this.state.isModalVisibleSearch:', this.state.isModalVisibleSearch)
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.hadleModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
      <View style={{flex:1, backgroundColor:'white', marginLeft:30, marginRight:30, marginTop:height*0.3, marginBottom:height*0.3, borderRadius:5,}}>
          <View style={{flexDirection:'row', marginLeft:30, marginRight:30, marginTop:20, borderWidth:1, borderColor:'gray', marginBottom:10, borderRadius:5}}>
              <Text style={{fontFamily:'Kanit-ExtraLight' , fontSize:20, padding:10}}>Province |</Text>
              <View style={{flex:1}}>
                  <Picker
                  selectedValue={this.state.province_state == ''? 'กระบี่': this.state.province_state}
                  style={{flex:1}}
                  onValueChange={
                    (itemValue, itemIndex) =>
                    this.setState({province_state: itemValue})
                  }>
                    { this.state.get_province.map((value) => {
                        return <Picker.Item label={value.name} value={value.id}/>
                      }) 
                    }
                </Picker>
              </View>
          </View>
          <View style={{flexDirection:'row',  marginLeft:30, marginRight:30, borderWidth:1, borderColor:'gray',borderRadius:5}}>
              <Text style={{fontFamily:'Kanit-ExtraLight', fontSize:20, padding:10}}>Categories |</Text>
              <View style={{flex:1}}>
              <Picker
                          selectedValue={this.state.category_state == ''? 'กระเป๋า': this.state.category_state}
                          style={{flex:1}}
                          onValueChange={(itemValue, itemIndex) => 
                            this.setState({category_state: itemValue})
                          }>
                            { this.state.get_categorial !== null && this.state.get_categorial.map((value) => {
                                return <Picker.Item label={value.name} value={value.id} />
                              })
                            }
                        </Picker>
              </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:height*0.04}}>
            <View style={{marginLeft:5}}>
              <TouchableOpacity 
              style={{flexDirection:'row', padding:10, backgroundColor:'#b2bec3', borderRadius:5 }} activeOpacity={0.5} 
             onPress= { () => {
              let get_filter_shop = []
               this.props.handleGetShop !== null && this.props.handleGetShop.map((value) => {
                let shop = new Object
                if ((value.province.id == this.state.province_state) && (value.category.id == this.state.category_state)) {
                  shop = value
                  shop.pinColor = '#ff0000'
                }
                 else{
                  shop.location = value.location
                  shop.pinColor = '#95afc0'
                 }
                 get_filter_shop.push(shop)
               })
                this.props.handleGetSearchData(get_filter_shop)
                this.props.hadleCallbackModal(false)
              }
            }
              >
                <Icon name={'search'} size={20} color={'#ffffff'}/>
                <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>ค้นหา</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft:5}}>
              <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#ff7675', borderRadius:5}} activeOpacity={0.5} 
              onPress={() =>  { 
                this.props.hadleCallbackModal(false)
                // this.setState({isModalVisibleSearch: !this.state.isModalVisibleSearch}) 
              }}
              >
                <Icon name={'brush'} size={20}  color={'#ffffff'}/>
                <Text style={{fontSize:15, fontFamily:'Kanit-ExtraLight', marginLeft:5}}>ล้างข้อมูล</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
