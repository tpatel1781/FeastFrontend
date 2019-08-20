import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import ActivePoll from './ActivePoll';
import InactivePoll from './InactivePoll';

class ThreadPollBase extends React.Component {
    state = {
        usersList: [],
        position: {
            longitude: '',
            latitude: '',
        },
        group: "",
        isPollOpen: false,
    }
    componentDidMount() {
            axios.get(Constants.SERVER_URL + '/getGroup', {
            params: {
                groupID: this.props.navigation.getParam('groupID', '0')
            }
        }).then(response => {
            this.setState(() => ({
                group: response.data,
                isPollOpen: response.data.isPollOpen
            }));
        });
    }
    startPoll() {
        this.setState({
            isPollOpen: true,
        })
    }

    stopPoll() {
        this.setState({
            isPollOpen: false,
        })
    }
    render() {
        return (
            <View>
                {this.state.isPollOpen ? (<ActivePoll stopPoll={() => this.stopPoll()}/>) : (<InactivePoll startPoll={() => this.startPoll()}/>)}                
            </View>
        )
    }
}

export default withFirebase(ThreadPollBase)