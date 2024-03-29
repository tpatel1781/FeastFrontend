import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { createSwitchNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation'
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Maps from './Maps'
import Groups from './Groups'
import GroupThread from './GroupThread'
import ThreadPoll from './ThreadPoll'

const MapNavigator = createStackNavigator(
  {
    Maps: {
      screen: Maps,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Text style={{
          fontWeight: 'bold',
          marginLeft: 20,
          fontSize: 32
        }}>Maps</Text>,
      }),
    },
  }
)

const GroupNavigator = createStackNavigator(
  {
    Groups: {
      screen: Groups,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Text style={{
          fontWeight: 'bold',
          marginLeft: 20,
          fontSize: 32
        }}>Groups</Text>,
        headerRight: <Button
          onPress={navigation.getParam('newGroup')}
          title="New Group" />
      }),
    },
  }
)

const GroupAndMapNavigator = createBottomTabNavigator(
  {
    Maps: {
      screen: MapNavigator,
    },
    Groups: {
      screen: GroupNavigator,
    },
  },
  {
    initialRouteName: 'Groups'
  }
)

const ThreadNavigator = createMaterialTopTabNavigator(
  {
    GroupThread: {
      screen: GroupThread,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
      }),
    },
    ThreadPoll: {
      screen: ThreadPoll,
      navigationOptions: {
        tabBarVisible: false,
      }
    }
  },
  {
    initialRouteName: 'GroupThread',
    swipeEnabled: true,
  }
)

const GroupsNavigator = createStackNavigator(
  {
    GroupAndMapNavigator: {
      screen: GroupAndMapNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    ThreadNavigator: {
      screen: ThreadNavigator,
      navigationOptions: ({ navigation }) => ({
        headerRight: <Button
          onPress={navigation.getParam('openSettings')}
          title="Settings" />
      }),
    }
  },
)

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