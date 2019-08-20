import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ScrollView, Modal } from 'react-native'
import axios from 'axios';
import Constants from '../constants'
import { Button } from 'react-native-elements';

import PlaceItem from './PlaceItem';
import { GiftedChat } from 'react-native-gifted-chat'
import { withFirebase } from './firebase';

class GroupThreadBase extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			group: '',
			sortedListOfPlaces: [],
			users: [],
			modalVisible: false,
			messages: [],
		}
	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
		axios.post(Constants.SERVER_URL + '/addMessageToGroup', {
			groupID: this.props.navigation.getParam('groupID', '0'),
			message: messages
		})
	}


	componentDidMount() {
		this.props.navigation.setParams({ openSettings: () => this.setSettingsModalVisible(true)})
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
				sortedListOfPlaces: listOfPlaces,
				users: response.data.users,
				messages: response.data.messages
			}));
		});
	}

	setSettingsModalVisible = (visible) => {
		this.setState({
			modalVisible: visible,
		})
	}

	render() {
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
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
				>
					<Text>HELLO</Text>
				</Modal>
				<GiftedChat
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: this.props.firebase.getCurrentUser().displayName,
						name: this.props.firebase.getCurrentUser().displayName,
					}}
				/>
			{/* <ScrollView>{placeItemList}</ScrollView> */}
				
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

export default withFirebase(GroupThreadBase)