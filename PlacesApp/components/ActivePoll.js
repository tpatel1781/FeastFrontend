import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import PollCard from './PollCard';

class ActivePollBase extends React.Component {
    state = {
        places: [],
        position: '',
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ position: { longitude: position.coords.longitude, latitude: position.coords.latitude } });
            this.generateNewPlaces();
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
				var tempPlaces = []
				for (i=0; i<5; i++) {
					tempPlaces.push(response.data.results[i]);
				}
                this.setState({
					places: tempPlaces
                });
            })
	}
	
	calculateDistance(lat1, lon1, lat2, lon2) {
		if ((lat1 == lat2) && (lon1 == lon2)) { return 0; }
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) { dist = 1; }
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return parseFloat(dist.toFixed(1));
	}

    render() {
		var placeItemList = []
		this.state.places.forEach(function (place) {
			placeItemList.push(
				<PollCard
					name={place.name}
					key={place.id}
					rating={place.rating + ' (' + place.user_ratings_total + ')'}
					distance={this.calculateDistance(this.state.position.latitude, this.state.position.longitude,
										place.geometry.location.lat, place.geometry.location.lng) + ' mi'}
					openStatus={place.opening_hours.open_now}
					price={place.price_level}
				/>
			);
		}.bind(this));

        return (
            <View>
                <Button
                    title="Stop Poll"
                    onPress={this.props.stopPoll}
                />

				<ScrollView>{placeItemList}</ScrollView>
            </View>
        )
    }
}
export default withFirebase(ActivePollBase)