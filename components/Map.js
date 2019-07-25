import React from "react";
import {
	StyleSheet,
	View,
	Button,
	Image,
	AsyncStorage,
	TextInput,
	Text,
	Dimensions,
	ScrollView,
	TouchableHighlight,
	SafeAreaView
} from "react-native";

import { StackActions, NavigationActions } from "react-navigation";

import { Location } from "expo";
import { FileSystem } from "expo";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";

import MapView from "react-native-maps";

const latitudeDelta = 4;
const longitudeDelta = 4;

class Map extends React.Component {
	state = {
		region: {
			latitudeDelta,
			longitudeDelta,
			latitude: 50,
			longitude: 2
		},
		adress: ""
	};

	onRegionChange = region => {
		this.setState({
			region
		});
	};

	_getLocationAsync = async () => {
		let locationDetails = await Location.reverseGeocodeAsync({
			latitude: this.state.region.latitude,
			longitude: this.state.region.longitude
		});

		let text = locationDetails[0].name + ", " + locationDetails[0].city;

		this.setState({ adress: text });
		console.warn('dieu merci' ,this.state.adress)

		this.props.navigation.navigate("NewEvent");
	};

	render() {
		const { region } = this.state;

		return (
			<View style={styles.map}>
				<MapView
					style={styles.map}
					initialRegion={region}
					showsUserLocation={true}
					onRegionChangeComplete={this.onRegionChange}
				/>
				<View style={styles.markerFixed}>
					<Image
						style={styles.marker}
						source={require("../../assets/icon/marker.png")}
					/>
				</View>
				<SafeAreaView style={styles.footer}>
					<TouchableHighlight
						underlayColor={Colors.lightBlue}
						style={styles.touchableHighlight}
						onPress={() => {
							this._getLocationAsync();

							let location = {
								latitude: this.state.region.latitude,
								longitude: this.state.region.longitude,
								adress: this.state.adress
							};
							console.warn(location);
							let action_add_location = {
								type: "UPDATE_LOCATION",
								value: location
							};
							this.props.dispatch(action_add_location);
							console.warn("add new user", this.props.location);
						}}
					>
						<Text style={styles.buttonText}>Enregistrez</Text>
					</TouchableHighlight>
				</SafeAreaView>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	map: {
		flex: 1
	},
	markerFixed: {
		left: "50%",
		marginLeft: -24,
		marginTop: -48,
		position: "absolute",
		top: "50%"
	},
	marker: {
		height: 48,
		width: 48
	},
	footer: {
		opacity: 1,
		bottom: 10,
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	region: {
		color: "#fff",
		lineHeight: 20,
		margin: 20
	},
	buttonText: {
		color: "white",
		fontWeight: "bold"
	},

	touchableHighlight: {
		marginTop: 15,
		borderRadius: 10,
		width: 250,
		borderRadius: 40,
		backgroundColor: Colors.mainBlue,
		justifyContent: "center",
		alignItems: "center",
		height: 50
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Map);
