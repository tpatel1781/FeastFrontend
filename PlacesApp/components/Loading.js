import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Firebase, { FirebaseContext } from './firebase';

export default class Loading extends React.Component {
  render() {
    return (
        <FirebaseContext.Consumer>
          {firebase => {
            firebase.auth.onAuthStateChanged(user => {
              console.log(user);
              this.props.navigation.navigate(user ? 'Main' : 'SignUp')
            })
          }}
        </FirebaseContext.Consumer>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})