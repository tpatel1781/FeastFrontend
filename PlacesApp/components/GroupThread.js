import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'

export default class GroupThread extends React.Component {
    render() {
		const groupID = this.props.navigation.getParam('groupID', '0');
        return (
            <View style={styles.mainContainer}>
                <Text>{groupID}</Text>
				<Button onPress={() => 
					this.props.navigation.navigate('Main')
				} title={"GO BACK"}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
		marginTop: 50,
		position: 'absolute',
		height: '100%'
	}

})

