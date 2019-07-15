import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'

import { withFirebase } from './firebase';
class GroupsBase extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default withFirebase(GroupsBase)