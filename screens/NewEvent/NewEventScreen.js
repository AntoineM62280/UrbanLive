import React from "react";
import {
	StyleSheet,
	View,
	Image,
	AsyncStorage,
	TextInput,
	Text,
	TouchableOpacity,
	Platform,
	ScrollView,
	TouchableHighlight
} from "react-native";
import { ImagePicker, Permissions, Constants, Location } from "expo";
import PickerCategories from "../../components/PickerCategories";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Loader } from "../../components/Loader";
import NewEvent from "../../utils/API/NewEvent";
import Colors from "../../constants/Colors";

class NewEventScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			adress: "",
			category: "",
			location: null,
			errorMessage: null,
			imageUri: null,
			longitude: null,
			latitude: null,
			latitudeBis : null,
			loading: false
		};
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
		return {
			title: params ? params.damageCategory : "Fuck Off",
			headerLeft: (
				<TouchableHighlight
					onPress={() => navigation.goBack()}
					color="#EA7500"
				>
					<Image
						style={{ marginLeft: 10 }}
						source={require("../../assets/icon/leftArrowAngle.png")}
					/>
				</TouchableHighlight>
			),
			headerStyle: {
				backgroundColor: "white",
				borderBottomWidth: 0,
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
				borderRadius: 5
			},
			headerTitleStyle: {
				fontWeight: "bold",
				color: Colors.textColor
			}
		};
	};

	componentWillMount() {
		if (Platform.OS === "android" && !Constants.isDevice) {
			this.setState({
				errorMessage:
					"Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
			});
		} else {
			this._getLocationAsync();
		}
	}

	componentDidMount() {
		console.warn("event ", this.props);
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			this.setState({
				errorMessage: "Permission to access location was denied"
			});
		}

		let locationBis = await Location.getCurrentPositionAsync({});

		let latitude = locationBis.coords.latitude;
		let longitude = locationBis.coords.longitude;

		let locationDetails = await Location.reverseGeocodeAsync({
			latitude: latitude,
			longitude: longitude
		});
		this.setState({ location: locationDetails });
		this.setState({ longitude: longitude });
		this.setState({ latitude: latitude });

		let text = "Waiting..";
		if (
			this.state.location == null &&
			this.state.errorMessage == null
		) {
			text = "Waiting...";
		} else if (this.state.errorMessage) {
			text = this.state.errorMessage;
		} else {
			text = this.state.location[0].country;
		}

		this.setState({adress : text});

		let location = {latitude : this.state.latitude, longitude : this.state.longitude, adress : this.state.adress};
		console.warn(location);
		let action_add_location = {
			type: "UPDATE_LOCATION",
			value: location
		};
		this.props.dispatch(action_add_location);
		console.warn("add new user", this.props.location);
	};

	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
	};

	useLibraryHandler = async () => {
		await this.askPermissionsAsync();
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});
		this.setState({ imageUri });
	};

	save() {
		this.setState({
			loading: true
		});
		NewEvent({
			path: this.state.imageUri,
			comment: this.state.comment,
			category: this.state.category,
			userId: this.props.user[0].UserId,
			damageCategory: this.props.navigation.getParam("damageCategory"),
			longitude: this.props.location.longitude,
			latitude: this.props.location.latitude,
			writtenAdress: this.props.location.adress
		})
			.then(data => {
				//await AsyncStorage.setItem("token", json.token);
				console.warn("arrête", data.event);
				let event = data.event;
				let events = this.props.events.concat(event);
				let action_add_event = {
					type: "UPDATE_EVENTS",
					value: events
				};
				this.props.dispatch(action_add_event);
				console.warn("add new user", this.props.events);

				this.setState({
					comment: "",
					imageUri: null
				});

				console.warn('johinyh', this.props.location)

				this.props.navigation.navigate("EventConfirmation");
			})
			.catch(resp => {
				this.setState({
					loading: false
				});
				console.error(resp);
			});
	}

	useCameraHandler = async () => {
		await this.askPermissionsAsync();
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});
		this.setState({ imageUri: result.uri });
		this._saveImageAsync();
		let value = this.refs.pickerCategories.helloWorld();
		console.warn(value);
	};

	_saveImageAsync = async () => {
		await AsyncStorage.setItem("imageUri", this.state.imageUri);
	};

	renderElement() {
		if (this.state.imageUri != null)
			return (
				<Image
					style={{
						width: "100%",
						height: 150,
						marginTop: 15
					}}
					source={{ uri: this.state.imageUri }}
				/>
			);
		else
			return (
				<TouchableHighlight
					onPress={this.useCameraHandler}
					style={styles.cameraTouchableHighLight}
				>
					<View
						style={{
							width: "100%",
							height: 150,
							flexDirection: "column",
							alignItems: "center",
							paddingBottom: 50,
							paddingTop: 50,
							backgroundColor: "white"
						}}
					>
						<Image
							source={require("../../assets/icon/photo.png")}
						/>
						<Text style={styles.textUserInfo}>
							{" "}
							Cliquez ici pour prendre une photo
						</Text>
					</View>
				</TouchableHighlight>
			);
	}

	updateCategory = value => {
		this.setState({
			category: value
		});
	};

	render() {
		const damageCategory = this.props.navigation.getParam("damageCategory");
		const { params } = this.props.navigation.state;

		return this.state.loading ? (
			<Loader />
		) : (
			<ScrollView style={styles.container}>
				{this.renderElement()}
				<View style={styles.locationContainer}>
					<View style={styles.newEventFormTitles}>
						<Image
							style={styles.icons}
							source={require("../../assets/icon/location.png")}
						/>
						<Text style={styles.textUserInfo}>Adresse</Text>
					</View>
					<TouchableHighlight
						style={styles.touchableHighlight2}
						onPress={() => {
							this.props.navigation.navigate("Map");
						}}
					>
						<View style={styles.buttonContainer1}>
							<Text style={styles.buttonText}>Changez</Text>
						</View>
					</TouchableHighlight>
					<Text style={styles.paragraph}>{this.props.location.adress}</Text>
				</View>
				<View style={styles.locationContainer}>
					<View style={styles.newEventFormTitles}>
						<Image
							style={styles.icons}
							source={require("../../assets/icon/list.png")}
						/>
						<Text style={styles.textUserInfo}>Catégorie</Text>
					</View>
					<PickerCategories
						ref="pickerCategories"
						onValueChange={value => this.updateCategory(value)}
					/>
				</View>
				<View style={styles.locationContainer}>
					<View style={styles.newEventFormTitles}>
						<Image
							style={styles.icons}
							source={require("../../assets/icon/comment.png")}
						/>
						<Text style={styles.textUserInfo}>Commentaire</Text>
					</View>
					<TextInput
						style={styles.textInput}
						multiline={true}
						placeholder="Commentaire"
						editable={true}
						blurOnSubmit={true}
						onChangeText={text =>
							this._searchTextInputChanged(text)
						}
						value={this.state.comment}
					/>
				</View>
				<View style={styles.locationContainer2}>
					<TouchableHighlight
						underlayColor={Colors.lightBlue}
						style={styles.touchableHighlight}
						onPress={() => {
							this.save();
						}}
					>
						<Text style={styles.buttonText}>Enregistrez</Text>
					</TouchableHighlight>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background
	},

	textInput: {
		height: 150,
		borderWidth: 1,
		borderColor: Colors.borderInput,
		justifyContent: "flex-start",
		padding: 10,
		borderRadius: 5
	},

	textUserInfo: {
		marginLeft: 10,
		fontWeight: "bold",
		color: Colors.textColor
	},

	locationContainer: {
		flexDirection: "column",
		paddingBottom: 20,
		paddingLeft: 15,
		paddingRight: 15,
		borderBottomColor: "#F0F0F0",
		borderBottomWidth: 1,
		marginBottom: 3,
		backgroundColor: "white"
	},

	locationContainer2: {
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: "#F0F0F0",
		borderBottomWidth: 1,
		backgroundColor: "white",
		paddingBottom: 20,
		paddingTop: 10
	},

	newEventFormTitles: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		marginTop: 30
	},

	input: {
		height: 40
	},

	paragraph: {
		color: Colors.textColor
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
	},
	cameraTouchableHighLight: {
		width: "100%",
		alignItems: "center",
		marginTop: 3,
		backgroundColor: "#F0F0F0",
		marginBottom: 4
	},
	touchableHighlight2: {
		width: 100,
		marginBottom: 20,
		marginTop: 20,
		height: 30,
		borderRadius: 40
	},

	buttonContainer1: {
		backgroundColor: Colors.orange,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		height: 30
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(NewEventScreen);
