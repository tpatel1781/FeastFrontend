import React from 'react'
import { StyleSheet, Platform, Button, Image, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Swiper from 'react-native-swiper'


import { withFirebase } from './firebase';
class MapsBase extends React.Component {
    state = {
        markers: [],
        displayName: this.props.firebase.getCurrentUser().displayName,
        email: this.props.firebase.getCurrentUser().email,
    }
    render() {
        return (
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        const newMarker = {
                            lat: details.geometry.location.lat,
                            lng: details.geometry.location.lng,
                            description: details.name,
                            key: 1
                        }
                        this.setState((prevState) => ({
                            markers: prevState.markers.concat([newMarker])
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
            
                <MapView style={{ alignSelf: 'stretch', height: 400 }} showsUserLocation={true}>
                    {this.state.markers.map(marker => (
                        <Marker
                            coordinate={{
                                latitude: marker.lat,
                                longitude: marker.lng
                            }}
                            title='place'
                            description={marker.description}
                        />
                    ))}
                </MapView>
                <Button
                    title="Sign Out"
                    onPress={this.props.handleSignOut}
                />
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

export default withFirebase(MapsBase)