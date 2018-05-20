import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Alert } from 'react-native';
import Login from './Components/Login/Login';

var phoneWidth = Dimensions.get('window').width;
var phoneHeight = Dimensions.get('window').height;

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      page:0,
      email:''
    };
  }
  
  changePage = (no,email)=>{
    this.setState({
      page:no,
      email:email
    });
  }
  
  getTransactions = ()=>{
    if(!this.state.transactions){
      fetch('http://35.224.138.20:8080/transactions?email='+this.state.email).then((data)=>data.json()).then((data2)=>{
        this.setState({
          transactions: data2
        });
        }).catch(function(error) {
          throw error;
        });
    }  
  }
  render() {
    var phoneWidth = Dimensions.get('window').width;
    if(this.state.page===0)
    {
      return (
        <Login changePage={this.changePage}/>
      );
    }
    else{
      this.getTransactions();
      if(this.state.transactions){
        let transaction = this.state.transactions.map((trans,index)=>{
          return (
            <View key={index} style={styles.transaction}>
              <Text>PLAN: {trans.plan}</Text>
              <Text>AMOUNT: {trans.amount}</Text>
              <Text>DATE: {trans.paydate}</Text>
            </View>
          );
        })
        return(
          <View style={styles.outercontainer}>
          <View  style={styles.topBar}>
          <Text style={{color:'#fff',fontWeight: 'bold', fontSize: 30}}>
          Transaction History
          </Text>
          </View>
          <View style={styles.container}>
            {transaction}
          </View>
          </View>
        );
      }
      else{
        return (
          <View>
          </View>
        );
      }
      
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    height: 0.15*phoneHeight,
    backgroundColor:'#41c0e2',
    justifyContent: 'center',
  },
  outercontainer:{
    flex: 1,
    justifyContent: 'flex-start',
  },
  transaction: {
    width: 0.8*phoneWidth,
    backgroundColor: '#e8e3e3',
    elevation: 8,
    margin: 10,
    padding: 10
  }
});
