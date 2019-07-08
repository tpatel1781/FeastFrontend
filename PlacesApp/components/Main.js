import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'
import { withFirebase } from './firebase';
class MainBase extends React.Component {
  state = {
    error: null,
  }
  handleSignOut = () => {
    console.log(this.props);
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
      <View style={styles.container}>
        <Text>
          Hi!
        </Text>
        <Button
          title="Sign Out"
          onPress={this.handleSignOut}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default withFirebase(MainBase)