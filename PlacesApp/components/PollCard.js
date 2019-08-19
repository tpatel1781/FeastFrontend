import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';

class PollCardBase extends React.Component {
    render() {
        return (
            <View>
                <Text>PLACE</Text>
            </View>
        )
    }
}
export default withFirebase(PollCardBase)