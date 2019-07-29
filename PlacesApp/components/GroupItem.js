import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View, TouchableHighlight } from 'react-native'

export default class GroupItem extends React.Component {
	onPressGroup = () => {
		this.props.showThread(this.props.name, this.props.description)
	}
	render() {
		return (
			<TouchableHighlight onPress={this.onPressGroup}>
				<View style={styles.mainContainer}>
					<Image style={styles.profilePicture} source={require('../assets/profile-placeholder.png')} />
					<View style={styles.childContainer}>
						<Text style={styles.groupName}>{this.props.name}</Text>
						<Text style={styles.descriptionText}>{this.props.description}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}
const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 30,
		marginLeft: 20,
		marginRight: 20,
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'row',
	},
	profilePicture: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	childContainer: {
		flexDirection: 'column',
		marginTop: 5,
		marginLeft: 10
	},
	groupName: {
		fontWeight: 'bold',
		flexWrap: 'wrap',
		flex: 1
	},
	descriptionText: {
		flexWrap: 'wrap',
		flex: 1
	}

})

