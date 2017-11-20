const initialState ={login:false,email:'22num@num.com',pass:'123456'}
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return  Object.assign({}, state, {
          login : action.login,
      })
    case 'SET_EMAIL':
        return  Object.assign({}, state, {
           email : action.email,
        })
    case 'SET_PASS':
       return  Object.assign({}, state, {
           pass : action.pass,
        })
    default:
      return state
  }
}
export default loginReducer
