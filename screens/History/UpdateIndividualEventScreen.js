import React from "react";
import {
	StyleSheet,
	View,
	Button,
	Image,
	TextInput,
	Text,
	Dimensions,
	ScrollView,
	TouchableHighlight
} from "react-native";

import { connect } from "react-redux";
import PickerCategories from "../../components/PickerCategories";
import UpdateIndividualEvent from "../../utils/API/UpdateIndividualEvent";

class UpdateIndividualEventScreen extends React.Component {
	constructor(props) {
		super(props);

		const Index = this.props.navigation.getParam("Index");
		this.state = {
			modalVisible: false,
			formFields: {
				comment: this.props.events[Index].Comment,
				adress: this.props.events[Index].WrittenAdress,
				category: this.props.events[Index].WrittenAdress,
				location: this.props.events[Index].Location,
				imageUri: this.props.events[Index].Path,
				longitude: this.props.events[Index].Longitude,
				latitude: this.props.events[Index].Latitude,
				EventId: this.props.events[Index].EventId
			},
			loading: false,
			errorMessage: null
		};
	}

	save() {
		this.setState({
			loading: true
		});
		UpdateIndividualEvent(this.state.formFields)
			.then(data => {
				this.props.navigation.navigate("History");
			})
			.catch(err => {
				console.warn(err);
				this.setState({ emailTakenError: true, loading: false });
			});
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
		return {
			title: "Modifier",
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

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.locationContainer}>
					<View style={styles.CameraContainer}>
						<Image
							style={{
								width: "100%",
								height: 150,
								marginTop: 15
							}}
							source={{ uri: this.state.imageUri }}
						/>
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
					<TextInput
						style={styles.textInput2}
						multiline={true}
						placeholder="Commentaire"
						editable={true}
						blurOnSubmit={true}
						onChangeText={text => this.setState({ adress: text })}
						value={this.state.adress}
					/>
				</View>
				<View style={styles.locationContainer}>
					<View style={styles.newEventFormTitles}>
						<Image
							style={styles.icons}
							source={require("../../assets/icon/list.png")}
						/>
						<Text style={styles.textUserInfo}>Catégorie</Text>
					</View>
					<PickerCategories />
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
						onChangeText={text => this.setState({ comment: text })}
						value={this.state.comment}
					/>
				</View>
				<View style={styles.locationContainer2}>
					<TouchableHighlight
						onPress={() => {
							this.save();
							this.saveBis();
							this.props.navigation.navigate("History");
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
								Mettre à jour
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

	textInput2: {
		height: 50,
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

export default connect(mapStateToProps)(UpdateIndividualEventScreen);
