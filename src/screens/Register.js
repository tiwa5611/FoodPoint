import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

var facebook_id_temp

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
            facebook_id: facebook_id_temp,
            line_id: this.state.line_id,
            picture:null
          }),
      })
      .then((response) => response.json())
      .then((json) => {
        this.setValue(facebook_id_temp, this.state.name, this.state.picture)
        this.props.navigation.goBack()
      })
      .catch((error) => {
        console.error('Fetch API error in register page',error);
      });
  }

  async setValue(userID, name, picture) {
    await AsyncStorage.setItem('userID',userID)
    await AsyncStorage.setItem('name',name)
    await AsyncStorage.setItem('pic_url',picture)
  }
 
  render() {

    const { data } = this.props.route.params; 
    // const { state } = this.props.navigation.state;
    // console.log('data', data)
    // console.log('pic', data.imageProfile)
    console.log('UserID', data.user_id)
    facebook_id_temp = data.user_id
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor:'white'}}>
          <View style={{marginLeft:30, marginRight:30}}>
          <View style={styles.viewImage}>
              <Image style={styles.imageStyle} source={{uri: this.state.picture == null? this.setState({picture:data.imageProfile}) : data.imageProfile}}></Image>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1}}>
              {console.log('name in state: ', this.state.name)}
              <TextInput
                style={{textAlign:'center',borderWidth:2,borderColor:'#dfe6e9',padding:0, borderRadius:5,height:height*0.06,marginBottom:10, fontFamily:'Kanit-ExtraLight'}}
                placeholder={data.username}
                value={this.state.name  == null? this.setState({name:data.username}): this.state.name}
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>
          </View>
          <View style={styles.viewTextInput}> 
            <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{marginBottom:5, marginRight:5, fontFamily:'Kanit-ExtraLight'}}>Line ID.</Text>
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
              <Text style={{marginBottom:5, marginRight:5, fontFamily:'Kanit-ExtraLight'}}>Tel.</Text>
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
              <Text style={{marginBottom:5, fontFamily:'Kanit-ExtraLight'}}>Student ID.</Text>
              <View style={{flex:1}}>
                <TextInput
                  keyboardType={'numeric'}
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({student_id: text})}
                />
              </View>
            </View>
            <View style={{ width:width*0.2, marginLeft:10}}>
              <Text style={{marginBottom:5, fontFamily:'Kanit-ExtraLight'}}>รุ่น</Text>
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
                <Text style={{fontSize:20, fontFamily:'Kanit-ExtraLight'}}>บันทึก</Text>
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
    fontFamily:'Kanit-ExtraLight'
  },
  viewTextInput: {
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center',
    marginTop:20
  },
  buttonSuccess: {
    backgroundColor:'#01a69f',
    height:50,
    width:100,
    borderRadius:5,
    justifyContent:'center', 
    alignItems:'center',
    marginRight:10

  },
})
