import { combineReducers } from 'redux'
import Information from './informationReducer'
import Login from './loginReducer'
import Setting from './setting'
const reducer = combineReducers({
  Information,
  Login,
  Setting,
})

export default reducer
