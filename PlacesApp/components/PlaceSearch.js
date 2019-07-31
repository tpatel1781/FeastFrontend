import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';

class PlaceSearchBase extends React.Component {
    state = {
        usersList: [],
        position: {
            longitude: '',
            latitude: '',
        }
    }
    componentDidMount() {
        for (const username of this.props.users) {
            axios.get(Constants.SERVER_URL + "/getUser", {
                params: {
                    username: username
                }
                // Pass the username from Firebase to make the getUser call
            }).then(response => {
                this.setState((prevState) => ({
                    usersList: prevState.usersList.concat([response.data])
                }));
            });
        }
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
    }

    generateNewPlaces() {
        axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
            '?location='+this.state.position.latitude+','+this.state.position.longitude+
            '&radius=8000' +
            '&types=food' +
            '&key=AIzaSyBzD1vJ3QqK6hX-Y9j9Z_NVqNyycC3Aqd4' +
            '&language=en')
    }

    generateFamiliarPlaces() {

    }
    render() {
        this.state.usersList.forEach(function (user) {
            groupItemList.push(
                <GroupItem
                    name={group.name}
                    key={group._id}
                    description={group.users.filter(name => name != this.props.firebase.getCurrentUser().displayName).join(', ')}
                    showThread={this.showThread}
                    groupID={group._id}
                />
            );
        }.bind(this));
        return (
            <View>

            </View>
        )
    }
}

export default withFirebase(PlaceSearchBase)