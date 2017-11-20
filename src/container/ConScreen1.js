import { connect } from 'react-redux'
import TextInput from '../component/Screen1'
import  { setEmail,setPass,setLogin,setDimensions,setWindow }  from '../action'


const mapStateToProps = (state) => {
  return {
  	email: state.Login.email,
    pass:state.Login.pass,
    login:state.Login.login,
    dimensions:state.Setting.dimensions,
    window:state.Setting.window,

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
