import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  Image,
  Animated,
  Easing,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
class Screen2 extends Component {
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
 componentDidMount() {
   firebase.auth().signOut();
 }
 onButtonCreate() {

   if( this.props.email=='' || this.props.pass=='' ||
       this.props.fname=='' ||this.props.lname=='' ||
       this.props.mobile=='' ||this.props.address=='' ||
       this.props.city=='' ||this.props.zipcode=='' ||
       this.props.etc1=='' ||this.props.etc2=='' ||
       this.props.etc3==''
     ){
     ToastAndroid.show('ยังกรอกไม่ครบ!', ToastAndroid.SHORT);
   }
   else if( this.state.avatarSource == null)
   {
     ToastAndroid.show('ยังไม่ได้อัพรูปโปรไฟล์!', ToastAndroid.SHORT);
   }
   else{
     const { email, pass } = this.props;
     this.setState({ error: '', loading: true });
     firebase.auth().createUserWithEmailAndPassword(email, pass)
       .then(() => {
                    ToastAndroid.show('before on loggin success', ToastAndroid.SHORT)
                     this.onCreateUserSuccess();
       }).catch(() => {
                        ToastAndroid.show('บัญชีถูกใช้ไปแล้ว', ToastAndroid.SHORT);
       });
   }
 }
 onCreateUserSuccess(){
      ToastAndroid.show('เข้ามาใน onCreateUserSuccess()', ToastAndroid.SHORT);
      userData = firebase.auth().currentUser;
      console.log("User ",userData);
      // ToastAndroid.show("Register Complete! : "+userData.uid, ToastAndroid.LONG);
      abc = firebase.database().ref('users/'+userData.uid+'/');
      abc.set({
        email: userData.email,
        fname : this.props.fname,
        lname: this.props.lname,
        mobile: this.props.mobile,
        address: this.props.address,
        city: this.props.city,
        zipcode: this.props.zipcode,
        etc1: this.props.etc1,
        etc2: this.props.etc2,
        etc3: this.props.etc3
      })
      console.log('pic',this.state.pic);
      const response = this.state.pic;
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;
      ToastAndroid.show('เข้ามาใน Set ค่า', ToastAndroid.SHORT);
      var imageRef = firebase.storage().ref().child('images/'+response.fileName);
      console.log('response.uri',response.uri,response.name)
      // Create the file metadata
      fs.readFile(response.path , 'base64')
      .then((data) => {
        console.log('path :',response.path);
        console.log('data :',data);
        return Blob.build(data, { type: '${mime};BASE64' })
      })
      .then((blob) => {
          console.log('blob :',blob);
          uploadBlob = blob
          return imageRef.put(blob,  {contentType: 'image/jpeg'})
        })
        .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        userData = firebase.auth().currentUser;
         ToastAndroid.show('upload succress!!', ToastAndroid.SHORT);
         console.log("url ",url);
         firebase.database().ref('users/'+userData.uid).update({url:url});
      })
      .then(() => {
          firebase.auth().signOut();
      });






  }
  backToHome(){
    this.props.navigator.push({
       screen: 'example.Screen1',
       title: 'Home Screen'
     });
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      this.setState({pic:response});
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
          pic:response
        });

      }
    });
  }

  render() {
    return (
      <View>
            <Image source={require('../../img/backgrounds.jpg')}
              style={{ width: this.props.dimensions,height: this.props.windows,}}>

                    <View style={styles.container}>
                      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        { this.state.avatarSource === null ? <Text style={ {color:'#7fff00'} }>Select a Photo</Text> :
                          <Image style={styles.avatar} source={this.state.avatarSource} />
                        }
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={{flex: 5,paddingTop:12,paddingLeft:20}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >EMAIL</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(email) =>  this.props.onChange(email,'email')}
                          value={this.props.email}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >PASSWORD</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(pass) => this.props.onChange(pass,'pass')}
                          secureTextEntry={true}
                          value={this.props.pass}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >FIRST NAME</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(fname) => this.props.setInformation(fname,'fname')}
                          value={this.props.fname}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >LAST NAME</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(lname) => this.props.setInformation(lname,'lname')}
                          value={this.props.lname}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >MOBILE PHONE</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(mobile) => this.props.setInformation(mobile,'mobile')}
                          value={this.props.mobile}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >ADDRESS</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(address) => this.props.setInformation(address,'address')}
                          value={this.props.address}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >CITY</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(city) => this.props.setInformation(city,'city')}
                          value={this.props.city}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                      <View style={{flexDirection: 'row'}}>
                          <Text style={styles.red} >ZIPCODE</Text>
                          <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(zipcode) => this.props.setInformation(zipcode,'zipcode')}
                          value={this.props.zipcode}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                          />
                        </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.red} >ETC1</Text>
                        <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(etc1) => this.props.setInformation(etc1,'etc1')}
                          value={this.props.etc1}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.red} >ETC2</Text>
                        <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(etc2) => this.props.setInformation(etc2,'etc2')}
                          value={this.props.etc2}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.red} >ETC3</Text>
                        <TextInput
                          style={{height: 40, width: 150,borderColor: 'gray', borderWidth: 0,color:'#7fff00'}}
                          onChangeText={(etc3) => this.props.setInformation(etc3,'etc3')}
                          value={this.props.etc3}
                          placeholderTextColor="#ffff00"
                          placeholder='XXX'
                          underlineColorAndroid ='transparent'
                        />
                      </View>

          </View>
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingBottom:10,paddingRight:40,paddingLeft:40,}}>
                    <Button style={{paddingTop:0,} }
                                onPress={() =>  this.onButtonCreate()}
                                  title="สมัครสมาชิก"
                                  color="#841584"
                    />
                    <Button style={{paddingTop:0,} }
                                onPress={() =>  this.backToHome()}
                                  title="กลับหน้าล็อคอิน"
                                  color="#841584"
                    />
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
  },
  avatarContainer: {
    borderColor: '#ff8c00',
    borderWidth: 10 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 55,
    width: 120,
    height: 120
  },
  red: {
    color: '#ff1493',
  },
});
export default Screen2;
