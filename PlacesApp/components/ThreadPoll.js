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
        pollPlaces: [],
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
                isPollOpen: response.data.isPollOpen,
                pollPlaces: response.data.pollPlaces,
            }));
        });
    }
    startPoll() {
        axios.post(Constants.SERVER_URL + '/updatePoll',
            {
                groupID: this.props.navigation.getParam('groupID', '0'),
                pollState: true
            }
        ).then(response => {
            this.setPositionAndGeneratePoll();
            this.setState({
                isPollOpen: true,
            })
        })
    }

    stopPoll() {
        axios.post(Constants.SERVER_URL + '/updatePoll',
            {
                groupID: this.props.navigation.getParam('groupID', '0'),
                pollState: false
            }
        ).then(response => {
            this.setState({
                isPollOpen: false,
                places: [],
            })
        })

    }

    setPositionAndGeneratePoll() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ position: { longitude: position.coords.longitude, latitude: position.coords.latitude } });
            this.generateNewPlaces();
        }, (error) => {
            console.log("Position Error: " + JSON.stringify(error))
        }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    generateNewPlaces() {
        const request = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
        '?location=' + this.state.position.latitude + ',' + this.state.position.longitude +
        '&radius=8000' +
        '&type=restaurant' +
        '&key=AIzaSyBzD1vJ3QqK6hX-Y9j9Z_NVqNyycC3Aqd4' +
        '&language=en' +
        '&fields=' + 'name,rating,user_ratings_total,price_level,geometry,opening_hours'

        // const request =
        //     'https://maps.googleapis.com/maps/api/place/findplacefromtext/json' +
        //     '?input=' + 'Restaurants' +
        //     '&inputtype=textquery' + 
        //     '&fields=' + 'name,rating,user_ratings_total,price_level,geometry,opening_hours' +
        //     '&locationbias=' + 'point:' + this.state.position.latitude + ',' + this.state.position.longitude +
        //     '&key=AIzaSyBzD1vJ3QqK6hX-Y9j9Z_NVqNyycC3Aqd4'

        axios.get(request).then(response => {
            console.log(response.data.results)
            var tempPlaces = []
            for (i = 0; i < 4; i++) {
                if (response.data.results[i]) {
                    tempPlaces.push(response.data.results[i]);
                }
            }
            axios.post(Constants.SERVER_URL + '/addPollPlaces',
                {
                    groupID: this.props.navigation.getParam('groupID', '0'),
                    places: tempPlaces
                }
            ).then(response => {

            })
        });
    }

    render() {
        return (
            <View>
                {this.state.isPollOpen ?
                    (<ActivePoll
                        pollPlaces={this.state.pollPlaces}
                        position={this.state.position}
                        stopPoll={() => this.stopPoll()}
                        groupID={this.props.navigation.getParam('groupID', '0')}
                    />) :
                    (<InactivePoll
                        startPoll={() => this.startPoll()}
                    />)}
            </View>
        )
    }
}

export default withFirebase(ThreadPollBase)