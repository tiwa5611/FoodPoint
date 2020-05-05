import React, { Component } from 'react';
import { View, Text, Modal, Dimensions, Picker, TouchableOpacity, ProgressViewIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalVisibleSearch:false
    };
  }

componentDidMount() {

}

  render() {
      console.log('props modal search:', this.props)
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
                  selectedValue={this.state.language}
                  style={{flex:1}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>
                   {/* { this.state.get_province.map((value) => {
                        return <Picker.Item style={{fontFamily:'Kanit-ExtraLight'}} label={value.name} value={value.id}/>
                      })  
                    } */}
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
                    {/* { this.state.get_province.map((value) => {
                        return <Picker.Item style={{fontFamily:'Kanit-ExtraLight'}} label={value.name} value={value.id}/>
                      })  
                    } */}
                </Picker>
              </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:height*0.04}}>
            <View style={{marginLeft:5}}>
              <TouchableOpacity style={{flexDirection:'row', padding:10, backgroundColor:'#b2bec3', borderRadius:5 }} activeOpacity={0.5} 
             onPress={() => {this.props.handlerModleSearch} 
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
