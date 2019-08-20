import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import PollCard from './PollCard';

class ActivePollBase extends React.Component {
    state = {
        places: ''
    }
    componentDidMount() {
    
    }

    render() {
		var placeItemList = []
		this.state.places.forEach(function (place) {
			placeItemList.push(
				<PollCard
					name={place.name}
					key={place.id}
					rating={place.rating + ' (' + place.user_ratings_total + ')'}
					distance={"FIX THIS"}
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