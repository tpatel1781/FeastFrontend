import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'

export default class GroupItem extends React.Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Image style={styles.profilePicture} source={require('../assets/profile-placeholder.png')} />
				<View style={styles.childContainer}>
					<Text style={styles.groupName}>{this.props.name}</Text>
					<Text style={styles.descriptionText}>{this.props.description}</Text>
				</View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
		marginTop: 30,
		marginLeft: 20,
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
		fontWeight: 'bold'
	},
	descriptionText: {

	}

})

