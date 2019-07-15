import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import Firebase, { FirebaseContext, withFirebase } from './firebase';
import axios from 'axios';
import Constants from '../constants'

class SignUp extends React.Component {
  state = {
    email: '', username: '', password: '', confirmPassword: '', error: null,
  }
  handleSignUp = () => {
    axios.post(Constants.SERVER_URL + "/addUser", {
      username: this.state.username,
      email: this.state.email,
    }).then(response => {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(authUser => {
        })
        .catch(error => {
          this.setState({ error });
        });
    }).catch(error => {
      console.log(error)
      this.setState({ error })
    });
  }
  render() {
    const isInvalid =
      this.state.password !== this.state.confirmPassword ||
      this.state.password === '' ||
      this.state.email === '' ||
      this.state.username === '';
    return (
      <View style={styles.container}>

        <Text>Sign Up</Text>
        {this.state.error &&
          <Text style={{ color: 'red' }}>
            {this.state.error.message}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={this.state.confirmPassword}
        />
        <Button disabled={isInvalid} title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
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
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

export default withFirebase(SignUp)