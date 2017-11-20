const initialState ={
                      fname:'kanjana',
                      lname:'malee',
                      mobile:'0855077070',
                      address:'41/4 m.2',
                      city:'nakhonsithammarat',
                      zipcode:'80000',
                      etc1:'xxx',
                      etc2:'xxx',
                      etc3:'xxx',
                    }
const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FNAME':
      return  Object.assign({}, state, {
         fname : action.fname,
    })
    case 'SET_LNAME':
      return  Object.assign({}, state, {
          lname : action.lname,
    })
    case 'SET_MOBILE':
      return  Object.assign({}, state, {
          mobile : action.mobile,
    })
    case 'SET_ADDRESS':
      return  Object.assign({}, state, {
          address : action.address,
    })
    case 'SET_CITY':
      return  Object.assign({}, state, {
          city : action.city,
    })
    case 'SET_ZIPCODE':
      return  Object.assign({}, state, {
          zipcode : action.zipcode,
    })
    case 'SET_ETC1':
      return  Object.assign({}, state, {
          etc1 : action.etc1,
    })
    case 'SET_ETC2':
      return  Object.assign({}, state, {
          etc2 : action.etc2,
    })
    case 'SET_ETC3':
      return  Object.assign({}, state, {
          etc3 : action.etc3,
    })
    default:
      return state
  }
}
export default textReducer
