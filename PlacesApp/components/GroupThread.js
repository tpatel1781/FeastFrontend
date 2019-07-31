import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native'
import axios from 'axios';
import Constants from '../constants'
import { Button } from 'react-native-elements';

import PlaceItem from './PlaceItem';

export default class GroupThread extends React.Component {
	state = {
		group: '',
		sortedListOfPlaces: [],
	}
    componentDidMount() {
		// Store the group in a local object
		axios.get(Constants.SERVER_URL + '/getGroup', {
			params: {
				groupID: this.props.navigation.getParam('groupID', '0') 
			}
		}).then(response => {
			// Get group's list of places, then sort them by date
			const listOfPlaces = response.data.visitedPlaces;
			listOfPlaces.sort(function (place1, place2) { 
				var date1 = new Date(place1.visitedDate);
				var date2 = new Date(place2.visitedDate);
				return date1 - date2;
			});
			this.setState(() => ({ 
				group: response.data,
				sortedListOfPlaces: listOfPlaces
			}));
		});
		
    }
    render() {
		const groupID = this.props.navigation.getParam('groupID', '0');
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

		var placeItemList = [];
		this.state.sortedListOfPlaces.forEach(function (place) {
			placeItemList.push(
				<PlaceItem
					placeName={place.name} 
					key={place.googleID} 
					visitedDate={(new Date(place.visitedDate)).toLocaleDateString("en-US", options)}
				/>
			);
		}.bind(this));

        return (
            <View style={styles.mainContainer}>
				<ScrollView>{placeItemList}</ScrollView>
				<Button
					title="Search"
					style={{marginBottom: 25}}
					onPress={() => {}}
				/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        // marginTop: 30,
        // position: 'absolute',
        height: '100%'
    }

})