import { connect } from 'react-redux'
import TextInput from '../component/Screen2'
import  { setEmail,setPass,
          setLogin,setFname,
          setLname,setMobile,
          setAddress,setCity,
          setZipcode,setEtc1,
          setEtc2,setEtc3,
          setDimensions,setWindow,
        }  from '../action'
const mapStateToProps = (state) => {
  return {
  	email: state.Login.email,
    pass:state.Login.pass,
    login:state.Login.login,
    fname:state.Information.fname,
    lname:state.Information.lname,
    mobile:state.Information.mobile,
    address:state.Information.address,
    city:state.Information.city,
    zipcode:state.Information.zipcode,
    etc1:state.Information.etc1,
    etc2:state.Information.etc2,
    etc3:state.Information.etc3,
    dimensions:state.Setting.dimensions,
    windows:state.Setting.window,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (text,type) => {
      if(type == 'email') {
        dispatch(setEmail(text));
    }
      else if(type == 'pass'){
        dispatch(setPass(text));
      }
    },
      setStatusLogin: (login) =>
      {
        dispatch(setLogin(login));
      },
      setInformation: (text,type) =>{
        if(type == 'email') {
          dispatch(setEmail(text));
      }
        else if(type == 'pass'){
          dispatch(setPass(text));
        }
        else if(type == 'fname'){
          dispatch(setFname(text));
        }
        else if(type == 'lname'){
          dispatch(setLname(text));
        }
        else if(type == 'mobile'){
          dispatch(setMobile(text));
        }
        else if(type == 'address'){
          dispatch(setAddress(text));
        }
        else if(type == 'city'){
          dispatch(setCity(text));
        }
        else if(type == 'zipcode'){
          dispatch(setZipcode(text));
        }
        else if(type == 'etc1'){
          dispatch(setEtc1(text));
        }
        else if(type == 'etc2'){
          dispatch(setEtc2(text));
        }
        else if(type == 'etc3'){
          dispatch(setEtc3(text));
        }
      },
      onsetDimensions: (dimensions) =>
      {
        dispatch(setDimensions(dimensions));
      },
      onsetWindow: (window) =>
      {
        dispatch(setWindow(window));
      },

  }
}
let TextPage = connect(mapStateToProps,mapDispatchToProps)(TextInput)

export default TextPage
