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
        
        console.log('groupId in poll:' + this.props.navigation.getParam('groupID', '0'))
        axios.get(Constants.SERVER_URL + '/getGroup', {
            params: {
                groupID: this.props.navigation.getParam('groupID', '0')
            }
        }).then(response => {
            console.log(response.status)
            this.setState(() => ({
                group: response.data,
                isPollOpen: response.data.isPollOpen
            }));
        });
    }

    

    startPoll() {
        console.log("Hello")
        this.setState({
            isPollOpen: true,
        })
    }

    stopPoll() {
        console.log("Stoped")
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