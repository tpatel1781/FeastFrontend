import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Firebase, { FirebaseContext } from './firebase';

export default class Loading extends React.Component {
  render() {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <FirebaseContext.Consumer>
          {firebase => {
            console.log(firebase)
            firebase.auth.onAuthStateChanged(user => {
              this.props.navigation.navigate(user ? 'Main' : 'SignUp')
            })
          }}
        </FirebaseContext.Consumer>
      </FirebaseContext.Provider>
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