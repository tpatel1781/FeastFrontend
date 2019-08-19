import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';

class InactivePollBase extends React.Component {
    render() {
        return (
            <View>
                <Button
                    title="Start New Poll"
                    onPress={this.props.startPoll}
                />
            </View>
        )
    }
}
export default withFirebase(InactivePollBase)