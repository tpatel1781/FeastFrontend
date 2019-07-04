import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import Firebase, { FirebaseContext } from './firebase';
import SignUpForm from './SignUpForm';

export default class SignUp extends React.Component {
  render() {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <FirebaseContext.Consumer>
          {firebase => <SignUpForm firebase={firebase} />}
        </FirebaseContext.Consumer>
      </FirebaseContext.Provider>
    )
  }
}