import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Register extends Component {
  constructor(props) {
    super(props);
      this.state = {
        student_id:null,
        batch:null,
        name:null,
        phonenumber:null,
        line_id:null,
        facebook_id:null,
      };
  }


  
  submitButton() {
      console.log('student_id', this.state.student_id)
      console.log('batch', this.state.batch)
      console.log('name', this.state.name)
      console.log('phonenumber', this.state.phonenumber)
      console.log('facebook_id', this.state.facebook_id)

      fetch('http://sharing.greenmile.co.th/api/register',{
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: this.state.student_id,
            batch: this.state.batch,
            name: this.state.name,
            phonenumber: this.state.phonenumber,
            facebook_id: this.state.facebook_id,
          }),
      })
      .then((response) => response.json())
      .then((json) => {
        console.log('response', json.data)
        this.props.navigation.goBack()
      })
      .catch((error) => {
        console.error('Fetch API error in register page',error);
      });
  }
 
  render() {

    const { name, pic, userID } = this.props.route.params; 
    console.log('name', name)
    console.log('pic', pic)
    this.setState({name:name, facebook_id:userID})

    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor:'white'}}>
          <View style={{marginLeft:30, marginRight:30}}>
          <View style={styles.viewImage}>
                  <Image style={styles.imageStyle} source={{uri: pic}}></Image>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1}}>
              <TextInput
                style={{textAlign:'center',borderWidth:2,borderColor:'#dfe6e9',padding:0, borderRadius:5,height:height*0.06,marginBottom:10,}}
                placeholder={name}
                value={this.state.name  == ''? this.setState({name:name}): this.state.name}
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{marginBottom:5, marginRight:5}}>Line ID.</Text>
              <View style={{flex:1}}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({line_id: text})}
                />
              </View>
            </View>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{marginBottom:5, marginRight:5}}>Tel.</Text>
              <View style={{flex:1}}>
                <TextInput
                  keyboardType={'numeric'}
                  maxLength={10}
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({phonenumber: text})}
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
                  keyboardType={'numeric'}
                  onChangeText={(text) => this.setState({student_id: text})}
                />
              </View>
            </View>
            <View style={{ width:width*0.2, marginLeft:10}}>
              <Text style={{marginBottom:5}}>รุ่น</Text>
              <View style={{flex:1}}>
                <TextInput
                  keyboardType={'numeric'}
                  maxLength={3}
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({batch: text})}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity style={styles.buttonSuccess} activeOpacity={0.5} 
                                onPress={this.submitButton.bind(this)}
               >
                <Text style={{fontSize:20, fontFamily:'Kanit-Light'}}>บันทึก</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
        
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
