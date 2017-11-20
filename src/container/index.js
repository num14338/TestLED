import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga'



import ConScreen1 from '../container/ConScreen1';
import ConScreen2 from '../container/ConScreen2';
import ConScreen3 from '../container/ConScreen3';



// register all screens of the app (including internal ones)
import reducer from '../reducer'
let store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))


export function registerScreens() {
  Navigation.registerComponent('example.Screen1', () => ConScreen1, store, Provider);
  Navigation.registerComponent('example.Screen2', () => ConScreen2, store, Provider);
  Navigation.registerComponent('example.Screen3', () => ConScreen3, store, Provider);
}
