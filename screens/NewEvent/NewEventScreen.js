import React from "react";
import {
	StyleSheet,
	View,
	Button,
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
				backgroundColor: "#EA7500"
			},
			headerTitleStyle: {
				fontWeight: "bold",
				color: "white"
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

	componentWillReceiveProps(nextProps) {
		console.warn("events bis", nextProps);
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

		let location = await Location.getCurrentPositionAsync({});

		let latitude = location.coords.latitude;
		let longitude = location.coords.longitude;

		this.setState({ longitude: longitude });
		this.setState({ latitude: latitude });

		let locationDetails = await Location.reverseGeocodeAsync({
			latitude: latitude,
			longitude: longitude
		});

		console.warn(locationDetails);

		this.setState({ locationDetails });
		let text = "Waiting..";
		if (this.state.errorMessage) {
			text = this.state.errorMessage;
		} else if (this.state.locationDetails) {
			text =
				this.state.locationDetails[0].name +
				", " +
				this.state.locationDetails[0].city +
				", " +
				this.state.locationDetails[0].postalCode +
				", " +
				this.state.locationDetails[0].country;
		}
		this.setState({ adress: text });
	};
	_searchTextInputChanged(text) {
		this.setState({ comment: text });
	}

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
			longitude: this.state.longitude,
			latitude: this.state.latitude,
			category: this.state.category,
			userId: this.props.user[0].UserId,
			damageCategory: this.props.navigation.getParam(
				"damageCategory"
			),
			writtenAdress: this.state.adress
		})
			.then(data => {
						//await AsyncStorage.setItem("token", json.token);
						console.warn('arrête',data.event)
						let event = data.event;
						let events = this.props.events.concat(event);
						let action_add_event = {
							type: "UPDATE_EVENTS",
							value: events
						};
						this.props.dispatch(action_add_event);
						console.warn("add new user", this.props.events);
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
					style={{
						width: "100%",
						alignItems: "center",
						marginTop: 3,
						backgroundColor: "#F0F0F0"
					}}
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
						<Image source={require("../../assets/icon/photo.png")} />
						<Text style={{ fontWeight: "bold" }}>
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
		let text = "Waiting..";
		if (this.state.errorMessage) {
			text = this.state.errorMessage;
		} else if (this.state.locationDetails) {
			text =
				this.state.locationDetails[0].name +
				", " +
				this.state.locationDetails[0].city +
				", " +
				this.state.locationDetails[0].postalCode +
				", " +
				this.state.locationDetails[0].country;
		}

		const damageCategory = this.props.navigation.getParam("damageCategory");
		const { params } = this.props.navigation.state;
		console.warn('RRRRRR', this.props.user[0].UserId)

		return this.state.loading ? (
			<Loader />
		) : (
			<ScrollView style={styles.container}>
				<View style={styles.locationContainer}>
					<View style={styles.CameraContainer}>
						{this.renderElement()}
					</View>
				</View>
				<View style={styles.locationContainer}>
					<View style={styles.newEventFormTitles}>
						<Image
							style={styles.icons}
							source={require("../../assets/icon/location.png")}
						/>
						<Text style={styles.textUserInfo}>Adresse</Text>
					</View>
					<Text style={styles.paragraph}>{this.state.adress}</Text>
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
						onPress={() => {
							this.save();
							this.setState({
								comment: "",
								imageUri: null
							});

							this.props.navigation.navigate("EventConfirmation");
						}}
						style={{
							width: 250,
							backgroundColor: "#F0F0F0",
							marginTop: 15,
							borderRadius: 10
						}}
					>
						<View style={styles.buttonContainer}>
							<Text
								style={{ color: "white", fontWeight: "bold" }}
							>
								Enregistrez
							</Text>
						</View>
					</TouchableHighlight>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F0F0"
	},

	textInput: {
		height: 150,
		borderWidth: 1,
		borderColor: "#F0F0F0",
		justifyContent: "flex-start",
		padding: 10
	},

	textUserInfo: {
		marginLeft: 10,
		fontWeight: "bold"
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
	buttonContainer: {
		width: "100%",
		borderRadius: 40,
		backgroundColor: "#EB008D",
		justifyContent: "center",
		alignItems: "center",
		height: 50
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(NewEventScreen);