import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View, TouchableHighlight } from 'react-native'

export default class GroupItem extends React.Component {
	onPressGroup = () => {
		this.props.showThread(this.props.groupID);
	}
	render() {
		return (
			<TouchableHighlight onPress={this.onPressGroup}>
				<View style={styles.mainContainer}>
					<Text style={styles.groupName} numberOfLines={1}>{this.props.name}</Text>
					<Text style={styles.descriptionText} numberOfLines={2}>{this.props.description}</Text>
				</View>
			</TouchableHighlight>
		)
	}
}
const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 30,
		marginLeft: 24,
		marginRight: 20,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'column',
	},
	groupName: {
		fontWeight: 'bold',
	},
	descriptionText: {
	}

})

