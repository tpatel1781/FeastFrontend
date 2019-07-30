import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { createSwitchNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation'
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
import Maps from './Maps'
import Groups from './Groups'
import GroupThread from './GroupThread'

const GroupsNavigator = createStackNavigator(
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
    GroupThread: {
      screen: GroupThread,
    } 
  }
);

const GroupAndMapNavigator = createBottomTabNavigator(
  {
    Maps: {
      screen: Maps,
      navigationOptions: {
      }
    },
    GroupsNavigator: {
      screen: GroupsNavigator,
      navigationOptions: ({ navigation }) => ({
        swipeEnabled: false
      })
    },
  },
 
);

// create our app's navigation stack
const Navigator = createSwitchNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    GroupAndMapNavigator: GroupAndMapNavigator
  },
  {
    initialRouteName: 'Loading'
  }
)
export default createAppContainer(Navigator)