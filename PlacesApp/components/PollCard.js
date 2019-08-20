import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';

class PollCardBase extends React.Component {
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