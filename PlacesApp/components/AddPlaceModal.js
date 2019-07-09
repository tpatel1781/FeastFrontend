import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import { withFirebase } from './firebase';

class AddPlaceModalBase extends Component {
  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={false}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default withFirebase(AddPlaceModalBase)