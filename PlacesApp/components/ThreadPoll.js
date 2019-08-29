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
        groupID: this.props.navigation.getParam('groupID')
    }
    componentDidMount() {
        console.log(this.state.groupID)
        axios.get(Constants.SERVER_URL + '/getGroup', {
            params: {
                groupID: this.state.groupID
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
                groupID: this.state.groupID,
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
                groupID: this.state.groupID,
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
        //GOOGLE PLACES API REQUEST
        // const request = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
        //     '?location=' + this.state.position.latitude + ',' + this.state.position.longitude +
        //     '&radius=8000' +
        //     '&type=restaurant' +
        //     '&key=AIzaSyBzD1vJ3QqK6hX-Y9j9Z_NVqNyycC3Aqd4' +
        //     '&language=en' +
        //     '&fields=' + 'name,rating,user_ratings_total,price_level,geometry,opening_hours'


        const request = 'https://api.foursquare.com/v2/venues/search' +
            '?client_id=MBXHIYJNEWTF1FWF215AJHKC5LF4JSXNRLXEJNZE4AFNTITJ' +
            '&client_secret=W1OUYNPFQIC4ZSP4M04AVTLJEK3EAWCMKJB01VKU0XVGSRAK' +
            '&ll=' + this.state.position.latitude + ',' + this.state.position.longitude +
            '&intent=checkin' +
            '&categoryId=4d4b7105d754a06374d81259' +
            '&radius=800' +
            '&v=20181212'

        const venueRequestUrl = 'https://api.foursquare.com/v2/venues/'

        const auth = '?client_id=MBXHIYJNEWTF1FWF215AJHKC5LF4JSXNRLXEJNZE4AFNTITJ' +
            '&client_secret=W1OUYNPFQIC4ZSP4M04AVTLJEK3EAWCMKJB01VKU0XVGSRAK' +
            '&v=20181212'
        const groupIDcopy = this.state.groupID;
        console.log("GROUPID COPY:" + groupIDcopy)
        axios.get(request).then(async function(response) {
            //console.log(JSON.stringify(response.data.response.venues))
            var tempPlaces = []
            for (i = 0; i < 4; i++) {
                if (response.data.response.venues[i]) {
                    await axios.get(venueRequestUrl + response.data.response.venues[i].id + auth).then(response => {
                        tempPlaces.push(response.data.response.venue)
                        console.log("HHH")
                    })
                }
            }

            console.log(this.state.groupID)
            console.log("GROUPID COPY 2:" + groupIDcopy)
            axios.post(Constants.SERVER_URL + '/addPollPlaces',
                {
                    groupID: groupIDcopy,
                    places: tempPlaces
                }
            ).then(response => {
               
            })
        }).catch(error => {
            console.log("FOURSQUARE REQUEST FAILED:" + error)
        }).bind(this);
    }

    render() {
        return (
            <View>
                {this.state.isPollOpen ?
                    (<ActivePoll
                        pollPlaces={this.state.pollPlaces}
                        position={this.state.position}
                        stopPoll={() => this.stopPoll()}
                        groupID={this.state.groupID}
                    />) :
                    (<InactivePoll
                        startPoll={() => this.startPoll()}
                    />)}
            </View>
        )
    }
}

export default withFirebase(ThreadPollBase)