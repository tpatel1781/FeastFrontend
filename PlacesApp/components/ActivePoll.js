import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import PollCard from './PollCard';

class ActivePollBase extends React.Component {
    state = {
        places: '',
        position: '',
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Position: " + JSON.stringify(position))
            this.setState({ position: { longitude: position.coords.longitude, latitude: position.coords.latitude } });
            this.generateNewPlaces();
            console.log("After generate")
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
            '?location=' + this.state.position.latitude + ',' + this.state.position.longitude +
            '&radius=8000' +
            '&types=restaurant' +
            '&key=AIzaSyBzD1vJ3QqK6hX-Y9j9Z_NVqNyycC3Aqd4' +
            '&language=en' + 
            '&fields='+'name,rating,user_ratings_total,price_level,geometry,opening_hours').then(response => {
                console.log("PLACES API: " + JSON.stringify(response))
                this.setState({

                });
            })
    }
    render() {
        return (
            <View>
                <Button
                    title="Stop Poll"
                    onPress={this.props.stopPoll}
                />

				<PollCard
					name={'Chipotle'}
					rating={4.0}
					foodType={'Mexican'}
					price={'$$'}
					distance={'1.2 miles'}
					openStatus={'Open'}
				/>
            </View>
        )
    }
}
export default withFirebase(ActivePollBase)