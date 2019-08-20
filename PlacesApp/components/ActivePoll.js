import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Modal, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import axios from 'axios'
import Constants from '../constants'

import { withFirebase } from './firebase';
import PollCard from './PollCard';

class ActivePollBase extends React.Component {
    state = {
        places: ''
    }
    componentDidMount() {
    
    }

    render() {
        return (
            <View>
                <Button
                    title="Stop Poll"
                    onPress={this.props.stopPoll}
                />

				<PollCard
					name={'Chipotle'}
					rating={4.0}
					foodType={'Mexican'}
					price={'$$'}
					distance={'1.2 miles'}
					openStatus={'Open'}
				/>
            </View>
        )
    }
}
export default withFirebase(ActivePollBase)