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
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Position: " + JSON.stringify(position))
            this.setState({ position: { longitude: position.coords.longitude, latitude: position.coords.latitude } });
        }, (error) => {
            console.log(JSON.stringify(error))
        }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });

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

    generateNewPlaces() {
        axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
            '?location=' + this.state.position.latitude + ',' + this.state.position.longitude +
            '&radius=8000' +
            '&types=food' +
            '&key=AIzaSyBzD1vJ3QqK6hX-Y9j9Z_NVqNyycC3Aqd4' +
            '&language=en')
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
                <Text>EWOFIJWEOIFJWOIJWEOIJWEOFIWEOIFJ</Text>
                
            </View>
        )
    }
}

export default withFirebase(ThreadPollBase)