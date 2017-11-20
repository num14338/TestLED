import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  Image,
} from 'react-native';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
class Screen1 extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'blue',
    navBarTranslucent: true,
  };
  constructor(props) {
   super(props);
   this.state = {
      email : '',
      pass: '',
      loggedIn:false,
   }
   this.props.onsetDimensions(Dimensions.get('window').width);
   this.props.onsetWindow(Dimensions.get('window').height);
   console.log("Before Signout");
 }
 componentDidMount() {
    const config = {
      apiKey: 'AIzaSyDbAYM-67E1Ra8PeOO9je_NGAQ4ro9hhxQ',
      authDomain: 'awesomeproject-363fe.firebaseapp.com',
      databaseURL: 'https://awesomeproject-363fe.firebaseio.com',
      projectId: 'awesomeproject-363fe',
      storageBucket: 'awesomeproject-363fe.appspot.com',
      messagingSenderId: '875495340565'
    };
    if( ! firebase.apps.length)
    {
        firebase.initializeApp(config);
    }
    else{
      console.log("Before Signout");
      firebase.auth().signOut();
      ToastAndroid.show('signOut!', ToastAndroid.SHORT);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userData = firebase.auth().currentUser;
            console.log("User ",userData)
            this.onLoginSuccess();

        } else {
            this.props.setStatusLogin(false);
        }
      });
    }
}
onButtonPress() {
   const { email, pass } = this.props;
   if( this.props.email=='' || this.props.pass==''){
       ToastAndroid.show('ยังกรอกไม่ครบ!', ToastAndroid.SHORT);
   }
   else{
     firebase.auth().signInWithEmailAndPassword(email, pass)
       .then(this.onLoginSuccess.bind(this))
       .catch(() => {
           ToastAndroid.show('ไม่พบบัญชีผู้ใช้!', ToastAndroid.SHORT);
       });
   }
 }
 onLoginSuccess() {
   ToastAndroid.show('เข้าสู่ระบบแล้ว', ToastAndroid.SHORT);
   this.props.navigator.push({
      screen: 'example.Screen3',
      title: 'Home Screen'
    });
 }
  checkInput(){
    if( this.props.id=='' || this.props.pass==''){
        ToastAndroid.show('ยังกรอกไม่ครบ!', ToastAndroid.SHORT);
    }
    else{
        ToastAndroid.show('กรอกหมดแล้ว!', ToastAndroid.SHORT);
    }
  }
  onCreateUserSuccess(){
        ToastAndroid.show('สมัครสมาชิกแล้ว!', ToastAndroid.SHORT);
        //this.setState({loggedIn:true});
        this.props.setStatusLogin(true);
  }
  onLogOut(){
    this.setState({loggedIn:false});
    firebase.auth().signOut()
  }
  render() {
    return (
    	<View >
         <Image source={require('../../img/backgrounds.jpg')}
                style={{ width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,}}>
                { console.log(Dimensions.get('window').width+1000,Dimensions.get('window').height-1000) }
         <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',paddingTop:50}}>
                <Image source={require('../../img/logo.png')}
                        style={{ width: Dimensions.get('window').width/6,
                        height: Dimensions.get('window').height/4,
                      }}
                />
         </View>
         <View style={{flex: 2,paddingTop:50,paddingRight:30,paddingLeft:30,}}>
               <View>
                     <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                                onChangeText={(email) => this.props.onChange(email,'email') }
                                placeholderTextColor="#ffff00"
                                placeholder='Username'
                                //textColor = '#ffff00'
                                underlineColorAndroid ='transparent'/>
               </View>
               <View style={{paddingTop:7,}} >
                       <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                                  onChangeText={(pass) => this.props.onChange(pass,'pass') }
                                  secureTextEntry={true}
                                  placeholderTextColor="#ffff00"
                                  placeholder='Password'
                                  underlineColorAndroid ='transparent'/>
               </View>
               <View style={{paddingTop:15,paddingRight:20,paddingLeft:20,}}>
                       <Button title='LOGIN'
                               onPress={() =>  this.onButtonPress()}>
                       </Button>
               </View>
               <View style={{paddingTop:7,paddingRight:30,paddingLeft:30,}}>
                       <Button style={{paddingTop:5} }
                               onPress={() =>this.props.navigator.resetTo({
                                              screen: 'example.Screen2',
                                              title: 'Home Screen'
                                              })
                                      }
                               title="Create Account"
                               color="#841584"/>
                </View>
         </View>
        </Image>
      </View>
    );
  }
}
Screen1.propTypes = {
  text: PropTypes.string,
  onChange : PropTypes.func
};
export default Screen1;
