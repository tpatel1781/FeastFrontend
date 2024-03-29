import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import PollCard from './PollCard';

class ActivePollBase extends React.Component {
    state = {
        position: {
            longitude: '',
            latitude: '',
		},
		displayName: this.props.firebase.getCurrentUser().displayName,
    }
    componentDidMount() {
        this.getPosition();
    }

    getPosition() {
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

    calculateDistance(lat1, lon1, lat2, lon2) {
        if (lat1 && lon1 && lat2 && lon2) {
            if ((lat1 == lat2) && (lon1 == lon2)) { return 0; }
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) { dist = 1; }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            return parseFloat(dist.toFixed(1)) + ' mi';
        } else {
            return "";
        }
    }

    render() {
        var placeItemList = []
        this.props.pollPlaces.forEach(function (pollPlace, index) {
			const isUpvoted = pollPlace.upvotes.includes(this.state.displayName);
			const isDownvoted = pollPlace.downvotes.includes(this.state.displayName);
            const place = pollPlace.place
            placeItemList.push(
                <PollCard
                    name={place.name}
                    key={place.id}
                    rating={place.rating}
                    distance={this.calculateDistance(this.state.position.latitude, this.state.position.longitude,
                        place.location.lat, place.location.lng)}
					openStatus={place.hours ? place.hours.status : 'Hours unavailable'}
					category={place.categories[0].shortName}
					mobileUrl={place.menu ? place.menu.mobileUrl : null}
                    price={place.attributes.groups[0].summary} // Not sure if this is right
					index={index}
					id={place.id}
                    groupID={this.props.groupID}
					votes={pollPlace.upvotes.length - pollPlace.downvotes.length}
					displayName={this.state.displayName}
					isUpvoted={isUpvoted}
					isDownvoted={isDownvoted}
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