import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button,Alert,ImageBackground } from 'react-native';
import Signup from '../Signup/Signup';

var phoneWidth = Dimensions.get('window').width;
var phoneHeight = Dimensions.get('window').height;
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      page: 0
    }
  }
  handler =()=>{
    fetch('http://35.224.138.20:8080/login',{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'email': this.state.username,
    'password': this.state.password
  })
  }).then((data)=>data.json()).then((data2)=>{
      if(data2.msg=='welcome'){
        this.props.changePage(1,this.state.username);
      }
      else{
        Alert.alert(data2.msg)
      }
      }).catch(function(error) {
        throw error;
      });
  }

  signUpHandler = ()=>{
    this.setState({
      page:1
    });
  }
  render() {
    var phoneWidth = Dimensions.get('window').width;
    if(this.state.page===0){
      return (
        <ImageBackground source={require('../../back2.jpg')} style={styles.backgroundImage} >
        <View style={styles.container}>
        <View style={styles.signupContainer}>
          <Text> Email: </Text>
          <TextInput
          style={{ marginTop:20,width: 0.8*phoneWidth}}
          editable = {true}
          maxLength = {40}
          value={this.state.username}
          onChangeText={(text) => this.setState({username:text})}
        />
        <Text> Password: </Text>
        <TextInput
        style={{marginTop:20,width: 0.8*phoneWidth}}
        editable = {true}
        maxLength = {40}
        value={this.state.password}
        secureTextEntry={true}
        onChangeText={(text) => this.setState({password:text})}
      />
      <Button
        onPress={this.handler}
        title="Login"
        color="red"
        accessibilityLabel="Learn more about this purple button"
      />
      <View style={styles.paddingCont}/>
      <Button
        onPress={this.signUpHandler}
        title="New? Sign up"
        color="black"
      />
      </View>
      </View>
      </ImageBackground>
      );
    }
    else{
      return (
        <Signup/>
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
    height: 0.5*phoneHeight,
    backgroundColor: '#41c0e2',
    justifyContent: 'center',
    padding: 20,
    elevation: 2
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingCont: {
    height: 0.05*phoneHeight
  }
});
