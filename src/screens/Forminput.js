import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Dimensions, TouchableOpacity, Picker} from 'react-native';

width = Dimensions.get('window').width
height = Dimensions.get('window').height

export default class Forminput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

    console.log('language:', this.state.language)
    return (
      <ScrollView>
        <View style={styles.container}>
            <View>
                <Text style={styles.textHeader}>ชื่อร้าน</Text>
                <TextInput
                  style={styles.textInput}
                />
            </View>
            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.textHeader}>Categories</Text>
                <View style={{ flex:1, borderWidth:1, borderColor:'#dfe6e9', margin:5, borderRadius:5}}>
                  <Picker
                    selectedValue={this.state.language}
                    style={{flex:1}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({language: itemValue})
                    }>
                      
                      <Picker.Item label="เลือกหมวด"/>
                      <Picker.Item label="JavaScript1" value="js1" />
                      <Picker.Item label="JavaScript2" value="js2" />
                      <Picker.Item label="JavaScript3" value="js3" />
                  </Picker>
                </View>
            </View>
            <View>
                <Text style={styles.textHeader}>รายละเอียดสินค้า</Text>
                <TextInput
                  style={{height:height*0.13, borderWidth:2, borderRadius:4, borderColor:'#dfe6e9'}}
                  multiline
                  numberOfLines={4}
                />
            </View>
            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <View style={{ flex:1, width:width*0.6, marginRight:10}}>
                  <Text style={styles.textHeader}>Studen ID.</Text>
                  <View style={{ flex:1, }}>
                      <TextInput
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        maxLength={10}
                      />
                  </View>
                </View>
                <View style={{ width:width*0.2}}>
                  <Text style={styles.textHeader}>รุ่น</Text>
                  <View style={{ flex:1}}>
                      <TextInput
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        maxLength={3}
                      />
                  </View>
                </View>
            </View>
            <View >
                <Text style={styles.textHeader}>ชื่อ</Text>
                <TextInput
                  style={styles.textInput}
                />
            </View>
            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.textHeader}>Tel</Text>
                <View style={{ flex:1}}>
                    <TextInput
                      style={styles.textInput}
                      keyboardType={"numeric"}
                      maxLength={10}
                    />
                  </View>
            </View>
            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}> 
                  <Text style={styles.textHeader}>Line ID.</Text>
                  <View style={{ flex:1}}>
                    <TextInput
                      style={styles.textInput}
                    />
                  </View>
            </View>
            <View>
                <Text style={styles.textHeader}>Province</Text>
                <View style={{ flex:1, borderWidth:1, borderColor:'#dfe6e9', margin:5, borderRadius:5}}>
                  <Picker
                    selectedValue={this.state.language}
                    style={{flex:1}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({language: itemValue})
                    }>
                      <Picker.Item label="เลือกจังหวัด"/>
                      <Picker.Item label="JavaScript1" value="js1" />
                      <Picker.Item label="JavaScript2" value="js2" />
                      <Picker.Item label="JavaScript3" value="js3" />
                  </Picker>
                </View>
            </View>
            <View>
                <Text style={styles.textHeader}>พิกัด</Text>
                <TextInput
                  style={styles.textInput}
                  editable={false}
                />
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>
              <TouchableOpacity style={styles.buttonSuccess} activeOpacity={0.5}>
                <Text style={{fontSize:20, fontFamily:'Kanit-Light'}}>บันทึก</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} activeOpacity={0.5}>
                <Text style={{fontSize:20, fontFamily:'Kanit-Light'}}>ยกเลิก</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:20
    },
    textHeader:{
      fontSize:width*0.05,
      marginBottom:10,
      marginTop:20,
      marginRight:10,
      fontFamily:'Kanit-Light'
    },
    textInput: {
      borderWidth:2,
      borderColor:'#dfe6e9',
      padding:0,
      borderRadius:5,
      height:height*0.06,
      marginBottom:10,
      textAlign:'center'

    },
    buttonSuccess: {
      backgroundColor:'#2ecc71',
      height:50,
      width:80,
      borderRadius:5,
      justifyContent:'center', 
      alignItems:'center',
      marginRight:10

    },
    buttonCancel: {
      backgroundColor:'#e74c3c',
      height:50,
      width:80,
      borderRadius:5,
      justifyContent:'center', 
      alignItems:'center',
      marginLeft:10

    }
})