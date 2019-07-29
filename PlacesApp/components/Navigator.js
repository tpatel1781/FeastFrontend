import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
import Groups from './Groups'
import GroupThread from './GroupThread'

// create our app's navigation stack
const Navigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
	Main,
	GroupThread
  },
  {
    initialRouteName: 'Loading'
  }
)
export default createAppContainer(Navigator)