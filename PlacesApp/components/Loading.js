import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import Firebase, { FirebaseContext, withFirebase } from './firebase';

class LoadingBase extends React.Component {
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if(user && user.displayName) {
        this.props.navigation.navigate('GroupsNavigator')
      } else {
        this.props.navigation.navigate('SignUp')
      }
    })
  }
  render() {
    return(
      <View/>
    )
  }
}

export default withFirebase(LoadingBase)
