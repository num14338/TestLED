import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
class Screen3 extends Component {
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
     fname:'',
     lname:'',
     mobile:'',
     address:'',
     city:'',
     zipcode:'',
     etc1:'',
     etc2:'',
     etc3:'',
     avatarSource: null,
     pic:null,
     dimensions:null,
     window:null,
   }
 }
  state = {
    avatarSource: null,
    email : '',
    ledON:'ON',
    ledOFF:'OFF',
  };
  componentDidMount() {
    userData = firebase.auth().currentUser;
    testget = firebase.database().ref('users/'+userData.uid+'/');
    testget.on('value', snapshot => {
    this.props.setInformation({email:snapshot.val().email});
    this.props.setInformation({fname:snapshot.val().fname});
    this.props.setInformation({lname:snapshot.val().lname});
    this.props.setInformation({mobile:snapshot.val().mobile});
    this.props.setInformation({address:snapshot.val().address});
    this.props.setInformation({city:snapshot.val().city});
    this.props.setInformation({zipcode:snapshot.val().zipcode});
    this.props.setInformation({etc1:snapshot.val().etc1});
    this.props.setInformation({etc2:snapshot.val().etc2});
    this.props.setInformation({etc3:snapshot.val().etc3});
    this.setState({avatarSource:snapshot.val().url});
    });
    console.log('Here : ',this.state.avatarSource)
  }

  onButton(){
    userData = firebase.auth().currentUser;

    firebase.database().ref('led/').update({led:'ON'});

  }
  offButton(){
    userData = firebase.auth().currentUser;

    firebase.database().ref('led/').update({led:'OFF'});

  }
  backToHome(){
    this.props.navigator.push({
       screen: 'example.Screen1',
       title: 'Home Screen'
     });
  }

  render() {
    return (
            <View style={{flex: 1}}>
               <Image source={require('../../img/backgrounds.jpg')}
                  style={{ width: this.props.dimensions,height: this.props.windows,}}>

               <View style={styles.container}>
                  <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                      { this.state.avatarSource === null ? <Text>No Photo</Text> :
                        <Image style={styles.avatar}
                        source={{uri: this.state.avatarSource }}/>
                      }
                  </View>
               </View>
                      <View style={{flex: 2 , paddingTop:10,paddingLeft:40}}>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.email}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.fname}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.lname}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.mobile}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.address}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.city}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.zipcode}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.etc1}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.etc2}</Text>
                              <Text style={{color: '#dc143c',fontWeight: 'bold',fontSize: 20,}}>{this.props.etc3}</Text>
                      </View>
                        <View style={{flex: 1}}>
                              <Button style={{paddingTop:5} }
                                          onPress={() =>  this.onButton()}
                                            title="ON"
                                            color="#841584"/>
                              <Button style={{paddingTop:5} }
                                          onPress={() =>  this.offButton()}
                                            title="OFF"
                                            color="#841584"/>
                              <Button style={{paddingTop:5} }
                                          onPress={() =>  this.backToHome()}
                                            title="Loguot"
                                            color="#00bfff"/>
                        </View>

                 </Image>
            </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:30,
    //backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#ff8c00',
    borderWidth: 10 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
export default Screen3;
