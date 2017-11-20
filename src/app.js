import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { createStore  } from 'redux';
import { Provider } from 'react-redux';
import { registerScreens } from './container';
registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.Screen1', // unique ID registered with Navigation.registerScreen
    title: 'Welcome', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },

    // drawer: { // optional, add this if you want a side menu drawer in your app
    //   left: { // optional, define if you want a drawer from the left
    //     screen: 'example.Screen1', // unique ID registered with Navigation.registerScreen
    //     passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
    //   },
    //   right: { // optional, define if you want a drawer from the right
    //     screen: 'example.Screen2', // unique ID registered with Navigation.registerScreen
    //     passProps: {} // simple serializable object that will pass as props to all top screens (optional)
    //   },
    //   disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
    // },
  //passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  //animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
