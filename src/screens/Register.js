import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
        <View style={{ flex: 1, backgroundColor:'white'}}>
          <View style={{marginLeft:30, marginRight:30}}>
          <View style={styles.viewImage}>
                  <Image style={styles.imageStyle}  source={require('../../android/assets/images/logo-icon.png')}></Image>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1}}>
              <TextInput
                style={styles.textInput}
                value={'ชื่อ - สกุล'}
              />
            </View>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{marginBottom:5, marginRight:5}}>Line ID.</Text>
              <View style={{flex:1}}>
                <TextInput
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{marginBottom:5, marginRight:5}}>Tel.</Text>
              <View style={{flex:1}}>
                <TextInput
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ width:width*0.6}}>
              <Text style={{marginBottom:5}}>Student ID.</Text>
              <View style={{flex:1}}>
                <TextInput
                  style={styles.textInput}
                />
              </View>
            </View>
            <View style={{ width:width*0.2, marginLeft:10}}>
              <Text style={{marginBottom:5}}>รุ่น</Text>
              <View style={{flex:1}}>
                <TextInput
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:60}}>
              <TouchableOpacity style={styles.buttonSuccess} activeOpacity={0.5}>
                <Text style={{fontSize:20, fontFamily:'Kanit-Light'}}>บันทึก</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  viewImage:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:40
  },
  imageStyle:{
    width:200,
    height:200,

  },
  textInput:{
    borderWidth:2,
    borderColor:'#dfe6e9',
    padding:0,
    borderRadius:5,
    height:height*0.06,
    marginBottom:10,
  },
  viewTextInput: {
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center',
    marginTop:20
  },
  buttonSuccess: {
    backgroundColor:'#2ecc71',
    height:50,
    width:100,
    borderRadius:5,
    justifyContent:'center', 
    alignItems:'center',
    marginRight:10

  },
})
