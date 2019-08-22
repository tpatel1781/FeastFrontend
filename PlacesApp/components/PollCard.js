import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';

class PollCardBase extends React.Component {
	state = {
		isUpvoteDisabled: false,
		isDownvoteDisabled: false,
	}
    render() {
        return (
            <View>
                <Text style={styles.nameHeader}>{this.props.name}</Text>
				<Text>{this.props.rating}</Text>
				<View style={styles.row}>
					<Text style={styles.rowItem}>{this.props.price}</Text>
					<Text style={styles.rowItem}>{this.props.distance}</Text>
				</View>
				<Text style={styles.openStatus}>{this.props.openStatus}</Text>
				<Button
					onPress={() => {
						axios.post(Constants.SERVER_URL + '/votePollPlace', {
							groupID: this.props.groupID,
							isUpvote: true,
							id: this.props.id
						}).then(response => {
							this.setState({ isUpvoteDisabled: true })
						}).catch(error => {
							console.log("Upvote error: " + error)
						});
					}}
					disabled = {this.state.isUpvoteDisabled}
					title="Upvote"
				/>
				<Button
					onPress={() => {
						axios.post(Constants.SERVER_URL + '/votePollPlace', {
							groupID: this.props.groupID,
							isUpvote: false,
							id: this.props.id
						}).then(response => {
							this.setState({ isDownvoteDisabled: true })
						}).catch(error => {
							console.log("Downvote error: " + error)
						});
					}}
					disabled = {this.state.isDownvoteDisabled}
					title="Downvote"
				/>
				<Text>{"Votes: " + this.props.votes}</Text>
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