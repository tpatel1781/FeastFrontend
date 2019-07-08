import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Firebase, { FirebaseContext } from './components/firebase';


// import the different screens
import Navigator from './components/Navigator'

// create our app's navigation stack
export default class App extends React.Component {
  render() {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <Navigator />
      </FirebaseContext.Provider>
    );
  }
}