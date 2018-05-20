import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button,Alert, ImageBackground } from 'react-native';
import App from '../../App';
var phoneWidth = Dimensions.get('window').width;
var phoneHeight = Dimensions.get('window').height;
export default class Signup extends React.Component {
  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      name:'',
      mobile:'',
      dob: '',
      page: 1
    }
  }

  handler =()=>{
    fetch('http://35.224.138.20:8080/signup',{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'name': this.state.name,
    'email': this.state.email,
    'password': this.state.password,
    'dob': this.state.dob,
    'mobile': this.state.mobile,
  })
  }).then((data)=>data.json()).then((data2)=>{
      if(data2.msg=='Signed up'){
        this.setState({
          page:0
        });
      }
      else{
        Alert.alert(data2.msg);
      }
      }).catch(function(error) {
        throw error;
      });
  }

  render() {

    if(this.state.page===1){
      return (
        <ImageBackground source={require('../../back2.jpg')} style={styles.backgroundImage} >
        <View style={styles.container}>
        <View style={styles.signupContainer}>
        <Text>Name: </Text>
        <TextInput
          style={{ marginTop:20,width: 0.8*phoneWidth}}
          editable = {true}
          maxLength = {40}
          value={this.state.name}
          onChangeText={(text) => this.setState({name:text})}
        />
        <Text>Email: </Text>
        <TextInput
          style={{ marginTop:20,width: 0.8*phoneWidth}}
          editable = {true}
          maxLength = {40}
          value={this.state.email}
          onChangeText={(text) => this.setState({email:text})}
        />
        <Text>Password: </Text>
        <TextInput
          style={{ marginTop:20,width: 0.8*phoneWidth}}
          editable = {true}
          maxLength = {40}
          value={this.state.password}
          onChangeText={(text) => this.setState({password:text})}
        />
        <Text>DOB: </Text>
        <TextInput
          style={{marginTop:20,width: 0.8*phoneWidth}}
          editable = {true}
          maxLength = {40}
          value={this.state.dob}
          onChangeText={(text) => this.setState({dob:text})}
        />
        <Text>Mobile: </Text>
        <TextInput
          style={{ marginTop:20,width: 0.8*phoneWidth}}
          editable = {true}
          maxLength = {40}
          value={this.state.mobile}
          onChangeText={(text) => this.setState({mobile:text})}
        />
        <Button
          onPress={this.handler}
          title="Sign up"
          color="red"
        />
        </View>
        </View>
        </ImageBackground>
      );
    }
    else{
      return (
        <App/>
      );
    }


  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: phoneWidth,
    backgroundColor: '#8c8383',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9
  },
  signupContainer: {
    width: 0.9*phoneWidth,
    height: 0.7*phoneHeight,
    backgroundColor: '#41c0e2',
    justifyContent: 'center',
    padding: 20,
    elevation: 2
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
