import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Firebase, { FirebaseContext } from './firebase';

export default class Loading extends React.Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          firebase.auth.onAuthStateChanged((user) => {
            if (user) {
              this.props.navigation.navigate('Main')
            } else {
              this.props.navigation.navigate('Login')
            }
          })
        }}
      </FirebaseContext.Consumer>
    )
  }
}
