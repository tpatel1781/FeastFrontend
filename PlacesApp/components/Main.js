import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Swiper from 'react-native-swiper'


import { withFirebase } from './firebase';
import Maps from './Maps';
import Groups from './Groups';
class MainBase extends React.Component {
  state = {
    error: null,
  }

  handleSignOut = () => {
    this.props.firebase.doSignOut()
      .then(authUser => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render() {
    return (
      <Swiper showsPagination={false} loop={false} index={1}>
        <Maps handleSignOut={this.handleSignOut} />
        <Groups />
      </Swiper>
    )
  }
}


export default withFirebase(MainBase)