import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View, Modal } from 'react-native'
import { SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import GroupItem from './GroupItem';

class GroupsBase extends React.Component {
	state = {
		user: '', username: '', groups: [], modalVisible: false, search: ''
	}
	/**
	 * Put all of the group names for this user in state.groups so GroupItems 
	 * can be populated with the names
	 */
	componentDidMount() {
		axios.get(Constants.SERVER_URL + "/getUser", {
			params: {
				username: this.props.firebase.getCurrentUser().displayName
			}
			// Pass the username from Firebase to make the getUser call
		}).then(response => {
			for (var groupID of response.data.groupIDs) {
				axios.get(Constants.SERVER_URL + '/getGroup', {
					params: { groupID: groupID }
				}).then(response => {
					console.log("Response data: " + JSON.stringify(response.data));
					this.setState((prevState) => ({
						groups: prevState.groups.concat([response.data])
					}));
					console.log("Added " + response.data)
					console.log("Group Names: " + this.state.groups);
				});
			}
			// add a group to the hermitsuan user and then try this again
			// console.log("Group Names:  " + JSON.stringify(this.state.groups));
			console.log("User data: " + JSON.stringify(response.data));
		});
	}

	setModalVisible(visible) { this.setState({ modalVisible: visible }); }
	updateSearch = search => { this.setState({ search }); };

	render() {
		var groupItemList = [];
		this.state.groups.forEach(function (group) {
			groupItemList.push(
				<GroupItem name={group.name} key={group.groupID} description={group.users.join(', ')} />
			);
		}.bind(this));
		const { search } = this.state;
		return (
			<View style={styles.container}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>
					<View style={{ marginTop: 50 }}>
						<View>
							<SearchBar
								placeholder="Search by username..."
								onChangeText={this.updateSearch}
								value={search}
								platform= "ios"
								lightTheme={true}
							/>

							<Button
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
								title="Close Modal"
							/>
						</View>
					</View>
				</Modal>
				<View style={styles.header}>
					<Text style={styles.title}>Groups</Text>
					<View style={{ marginLeft: 150 }}>
						<Button
							onPress={() => {
								this.setModalVisible(true);
							}}
							title="New Group" />
					</View>

				</View>

				{groupItemList}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		marginTop: 12,
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	header: {
		flexDirection: 'row',
		marginTop: 50,
		marginLeft: 20
	},
	title: {
		fontWeight: 'bold',
		fontSize: 32
	}
})

export default withFirebase(GroupsBase)