import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import GroupItem from './GroupItem';

class GroupsBase extends React.Component {
	state = {
		user: '', username: '', groups: [], modalVisible: false, search: '', searchResultText: '',
		showResult: false, newGroupUserList: [this.props.firebase.getCurrentUser().displayName]
	}
	/**
	 * Put all of the group names for this user in state.groups so GroupItems 
	 * can be populated with the names
	 */
	getUserGroups  = () => {
		this.setState({
			groups: []
		})
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
			// console.log("Group Names:  " + JSON.stringify(this.state.groups));
			console.log("User data: " + JSON.stringify(response.data));
		});
	}

	componentDidMount() {
		this.getUserGroups();
	}

	setModalVisible(visible) { 
		this.setState({ modalVisible: visible }); 
		
		if (visible) {
			this.setState({
				newGroupUserList: [this.props.firebase.getCurrentUser().displayName],
				search: '',
				showResult: false
			})
		}
	}

	updateSearch = search => {
		this.setState({ search });
		axios.get(Constants.SERVER_URL + "/getUser", {
			params: {
				username: search
			}
		}).then(response => {
			console.log("User " + JSON.stringify(response.data));
			this.setState({ searchResultText: response.data._id });
			this.setState({ showResult: true });
		}).catch(error => {
			// console.log("Didnt find user: " + search); Use for debugging
			this.setState({ searchResultText: '' });
			this.setState({ showResult: false });
		})
	};

	render() {
		var groupItemList = [];
		this.state.groups.forEach(function (group) {
			groupItemList.push(
				<GroupItem
					name={group.name} 
					key={group.groupID} 
					description={group.users.filter(name => name != this.props.firebase.getCurrentUser().displayName).join(', ')}
				/>
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
								platform="ios"
								lightTheme={true}
							/>
							{this.state.showResult ? (<View style={styles.searchResult}>
								<Text style={{ fontSize: 18 }}>{this.state.searchResultText}</Text>
								<Button
									title="Add"
									style={{ marginLeft: 200 }}
									// Disable the 'add' button if the user searched themselves or if the user is already in the group
									disabled={this.state.newGroupUserList.includes(this.state.searchResultText) || 
										this.state.searchResultText == this.props.firebase.getCurrentUser().displayName}
									onPress={() => {
										// Add this user to a list of users to add to this group and display it on the list at the bottom
										if (!this.state.newGroupUserList.includes(this.state.searchResultText)) {
											this.setState((prevState) => ({
												newGroupUserList: prevState.newGroupUserList.concat([this.state.searchResultText])
											}));
										}
									}} />
							</View>) : null}

							<Button
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
								title="Close Modal"
								style={{ alignItems: 'flex-end' }}
							/>
							<View>
								<Text style={{ fontSize: 24, flexWrap: 'wrap' }}>
									{this.state.newGroupUserList.filter(name => name != this.props.firebase.getCurrentUser().displayName).toString()}
								</Text>
								<Button
									title="Create Group"
									onPress={() => {
										axios.post(Constants.SERVER_URL + "/addGroup", {
											username: this.props.firebase.getCurrentUser().displayName,
											group: this.state.newGroupUserList,
											name: this.state.newGroupUserList.filter(name => name != this.props.firebase.getCurrentUser().displayName).toString()
										}).then(response => {
											console.log("Added groups: " + JSON.stringify(response.data));
											this.setModalVisible(!this.state.modalVisible);
											this.getUserGroups();
										}).catch(error => {
											console.log("Errored here");
										})
									}}
								/>
							</View>


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
				<ScrollView>{groupItemList}</ScrollView>
				
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
	},
	searchResult: {
		flexDirection: 'row',
		margin: 20
	}

})

export default withFirebase(GroupsBase)