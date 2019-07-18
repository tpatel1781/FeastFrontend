import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import GroupItem from './GroupItem';
class GroupsBase extends React.Component {
	state = {
		user: ''
	}
	componentDidMount() {
		// axios.get(Constants.SERVER_URL + "/getUser", {

		// })
	}
    render() {
        return (
            <View style={styles.container}>
				<Text style={styles.title}>Groups</Text>
                <GroupItem name='IV Squad' description='Sample description' />
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