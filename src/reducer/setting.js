const initialState ={dimensions:null,window:null}
const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DIMENSIONS':
        return  Object.assign({}, state, {
           dimensions : action.dimensions,
        })
    case 'SET_WINDOW':
       return  Object.assign({}, state, {
           window : action.window,
        })
    default:
      return state
  }
}
export default settingReducer
