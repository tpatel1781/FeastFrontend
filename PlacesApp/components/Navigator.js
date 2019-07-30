import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
import Groups from './Groups'
import GroupThread from './GroupThread'

const GroupsNavigator = createStackNavigator(
  {
    Main: Main,
    GroupThread: GroupThread
  }
);

// create our app's navigation stack
const Navigator = createSwitchNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    GroupsNavigator: GroupsNavigator
  },
  {
    initialRouteName: 'Loading'
  }
)
export default createAppContainer(Navigator)