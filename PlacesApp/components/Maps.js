import React from 'react'
import { Modal, StyleSheet, Platform, Button, Image, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Constants from '../constants'
import axios from 'axios';

import { withFirebase } from './firebase';

class MapsBase extends React.Component {
    static navigationOptions = {
        header: () => null
    }
    state = {
        markers: [],
        displayName: this.props.firebase.getCurrentUser().displayName,
        email: this.props.firebase.getCurrentUser().email,
        modalVisible: false,
        modalLocation: "",
        locationRating: "",
        googleID: "",
        map: "",
        position: null,
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Position: " + JSON.stringify(position))
            this.setState({ position: { longitude: position.coords.longitude, latitude: position.coords.latitude, latitudeDelta: 0.001, longitudeDelta: 0.001 } });
        }, (error) => {
            console.log(JSON.stringify(error))
        }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });

    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    onFinishRating(rating) {
        this.setState({
            locationRating: rating,
        })
        console.log(this.state.locationRating)
    }
    submitRating() {
        console.log(this.state.displayName + " " + this.state.modalLocation + " " + this.state.googleID + " " + this.state.locationRating)
        axios.post(Constants.SERVER_URL + "/addPlace", {
            username: this.state.displayName,
            name: this.state.modalLocation,
            googleID: this.state.googleID,
            rating: this.state.locationRating,
        }).then(response => {
            console.log(response);
            this.setModalVisible(false)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.position ? (<MapView
                    provider={"google"}
                    style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    onPoiClick={({ nativeEvent }) => console.log(nativeEvent)}
                    region={this.state.position}
                >
                    {this.state.markers.map(marker => (
                        <Marker
                            coordinate={{
                                latitude: marker.lat,
                                longitude: marker.lng
                            }}
                            title='place'
                            description={marker.description}
                            key={marker.key}
                        />
                    ))}
                </MapView>) : null}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    presentationStyle={"overFullScreen"}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00000080'
                    }}>
                        <View style={{
                            width: 300,
                            height: 300,
                            backgroundColor: '#fff', 
                            padding: 20
                        }}>
                            <Text>{this.state.modalLocation}</Text>
                            <AirbnbRating onFinishRating={(value) => { this.onFinishRating(value) }} />
                            <Button
                                title="Close"
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            />
                            <Button
                                title="Submit Rating"
                                onPress={() => {
                                    this.submitRating();
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <GooglePlacesAutocomplete
                    position='absolute'
                    style={styles.floating}
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(details);
                        const newMarker = {
                            lat: details.geometry.location.lat,
                            lng: details.geometry.location.lng,
                            description: details.name,
                            key: details.id
                        }
                        this.setModalVisible(true);
                        this.setState((prevState) => ({
                            markers: prevState.markers.concat([newMarker]),
                            modalLocation: details.name,
                            googleID: details.id,
                        }));
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyBzD1vJ3QqK6hX-Y9j9Z_NVqNyycC3Aqd4',
                        language: 'en', // language of the results
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe'
                    }}

                    GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    renderRightButton={() => <Text>Custom text after the input</Text>}
                />
                <Text>
                    {this.state.email} + "   user: " + {this.state.displayName}
                </Text>

                <Button
                    title="Sign Out"
                    onPress={this.props.handleSignOut}
                />
            </View >
        )
    }

}
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    floating: {
        marginTop: 40
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    modal: {
        margin: 40,
    }
})

export default withFirebase(MapsBase)