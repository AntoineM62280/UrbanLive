import React from "react";
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Text,
	TouchableHighlight,
	ScrollView
} from "react-native";

import * as Config from "../../Config";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { connect } from "react-redux";

// flaticon accident, broken building, waste pollution, #F0F0F0//

class UpdateUserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formFields: {
				firstname: this.props.userId.FirstName,
				lastname: this.props.userId.Lastname,
				email: this.props.userId.Email,
				postalCode: this.props.userId.PostalCode
			}
		};
	}

	handleChange = e => {
		const { name, value } = e;
		let formFields = { ...this.state.formFields };
		formFields[name] = value;
		this.setState({ formFields });
		console.log(this.state.formFields);
	};

	isFormComplete() {
		let isFormComplete = true;
		for (let key in this.state.formFields) {
			if (this.state.formFields[key] == "") {
				isFormComplete = false;
				break;
			}
		}

		return isFormComplete;
		console.log(isFormComplete);
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
		return {
			title: "Modifier mon profil",
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
			/* These values are used instead of the shared configuration! */
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
		return this.state.loading ? (
			<Loader />
		) : (
			<ScrollView style={styles.scroll}>
				<View style={styles.container}>
					<Text style={styles.registerMainTitle}>Modifier</Text>
					<View style={styles.subcontainer}>
						<Text style={styles.subcontainerTitle}>
							Nom et Prénom
						</Text>
						<View style={styles.identitySubcontainerInput}>
							<Input
								style={styles.input1}
								label="Prénom"
								name="firstname"
								editable={true}
								onChangeText={this.handleChange}
								value={this.state.formFields.firstname}
							/>
							<Input
								style={styles.input2}
								label="Nom"
								name="lastname"
								editable={true}
								onChangeText={this.handleChange}
								value={this.state.formFields.lastname}
							/>
						</View>
					</View>
					<View style={styles.subcontainer}>
						<Text style={styles.subcontainerTitle}>
							Adresse mail
						</Text>
						<Input
							style={styles.input}
							label="Adress Mail"
							name="email"
							editable={true}
							onChangeText={this.handleChange}
							value={this.state.formFields.email}
						/>
					</View>
					<View style={styles.subcontainer}>
						<Text style={styles.subcontainerTitle}>
							Code Postal
						</Text>
						<Input
							style={styles.input}
							label="Code Postal"
							name="postalCode"
							editable={true}
							onChangeText={this.handleChange}
							value={this.state.formFields.postalCode}
						/>
					</View>
					<Button
						text="Modifier mon profil"
						active={this.isFormComplete()}
						onPress={() => this.register()}
					/>
				</View>
			</ScrollView>
		);
	}
}

var styles = StyleSheet.create({
	scroll: {
		flex: 1
	},

	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 20,
		backgroundColor: "#F0F0F0",
		paddingBottom: 20,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20
	},

	subcontainer: {
		flex: 1,
		marginBottom: 20
	},

	identitySubcontainerInput: {
		flexDirection: "row"
	},

	subcontainerTitle: {
		marginBottom: 10,
		fontWeight: "bold"
	},

	input: {
		borderColor: "#0075eb",
		borderWidth: 1,
		height: 30,
		paddingLeft: 10,
		paddingRight: 10,
		width: 250,
		backgroundColor: "white"
	},
	input1: {
		width: 120,
		borderColor: "#0075eb",
		borderWidth: 1,
		height: 30,
		paddingLeft: 10,
		paddingRight: 10,
		marginRight: 10,
		backgroundColor: "white"
	},

	input2: {
		width: 120,
		borderColor: "#0075eb",
		borderWidth: 1,
		height: 30,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "white"
	},

	buttonContainer: {
		width: "100%",
		borderRadius: 40,
		backgroundColor: "#EB008D",
		justifyContent: "center",
		alignItems: "center",
		height: 50
	},
	registerMainTitle: {
		fontWeight: "bold",
		fontSize: 25,
		marginBottom: 20
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(UpdateUserProfile);
