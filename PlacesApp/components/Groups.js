import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import GroupItem from './GroupItem';

class GroupsBase extends React.Component {
	state = {
		user: '', username: '', groups: []
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
    render() {
		var groupItemList = [];
		this.state.groups.forEach(function (group) {
			groupItemList.push(
				<GroupItem name={group.name} key={group.groupID} description={group.users.join(', ')} />
			);
		}.bind(this));
        return (
            <View style={styles.container}>
				<Text style={styles.title}>Groups</Text>
				{groupItemList}
                {/* <GroupItem name='IV Squad' description='Sample description' /> */}
				{/* <GroupItem name='Group 1' description='Starbucks Berlin Turnpike' /> */}
				{/* <GroupItem name='Group 2' description='Amelias Boston' /> */}
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
	title: {
		fontWeight: 'bold',
		fontSize: 32,
		marginTop: 50,
		marginLeft: 20
	}
})

export default withFirebase(GroupsBase)