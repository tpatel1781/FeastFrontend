import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';

class PollCardBase extends React.Component {
	state = {
	}

	constructor() {
		super()
		this.state = {
			selectedIndex: 2
		}
		this.updateIndex = this.updateIndex.bind(this)
	}

	updateIndex(selectedIndex) {
		this.setState({ selectedIndex });
		console.log(selectedIndex)
		console.log(this.props.displayName)
		if (selectedIndex == 0) { // Clicked Yesc

			axios.post(Constants.SERVER_URL + '/votePollPlace', {
				groupID: this.props.groupID,
				isUpvote: true,
				id: this.props.id,
				username: this.props.displayName
			}).then(response => {
			}).catch(error => {
				console.log("Upvote error: " + error)
			});
		} else if (selectedIndex == 1) { // Clicked No
			axios.post(Constants.SERVER_URL + '/votePollPlace', {
				groupID: this.props.groupID,
				isUpvote: false,
				id: this.props.id,
				username: this.props.displayName
			}).then(response => {
			}).catch(error => {
				console.log("Downvote error: " + error)
			});
		}
	}

	componentDidMount() {
		// Select Yes or No on the ButtonGroup if a user has already selected one from before
		if (this.props.isUpvoted) {
			this.setState({selectedIndex: 0});
		} else if (this.props.isDownvoted) {
			this.setState({selectedIndex: 1});
		}
	}

	render() {
		const buttons = ['Yes', 'No']
		const { selectedIndex } = this.state
		return (
			<View>
				<Text style={styles.nameHeader}>{this.props.name}</Text>
				<Text>{this.props.rating}</Text>
				<View style={styles.row}>
					<Text style={styles.rowItem}>{this.props.price}</Text>
					<Text style={styles.rowItem}>{this.props.distance}</Text>
				</View>
				<Text style={styles.openStatus}>{this.props.openStatus}</Text>
				<Text>{this.props.category}</Text>
				<Text>{this.props.menu}</Text>
				<ButtonGroup
					onPress={this.updateIndex}
					selectedIndex={selectedIndex}
					buttons={buttons}
					containerStyle={{ height: 40 }}
				/>
				<Text>{"Votes: " + this.props.votes + '\n'}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	nameHeader: {
		fontWeight: 'bold',
	},
	row: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'row',
	},
	rowItem: {
		marginRight: 8
	},
	openStatus: {
		color: 'green'
	}

})

export default withFirebase(PollCardBase)