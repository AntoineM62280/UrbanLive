import React from "react";
import {
	StyleSheet,
	View,
	Image,
	AsyncStorage,
	TextInput,
	Text,
	ImageBackground,
	ActivityIndicator,
	KeyboardAvoidingView,
	TouchableHighlight,
	ScrollView
} from "react-native";

import * as Config from "../Config";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import CreateUser from "../utils/API/CreateUser";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			emailTakenError: false,
			formFields: {
				firstname: "",
				lastname: "",
				email: "",
				password: "",
				postalCode: ""
			},
			formErrors: {
				email: "",
				password: ""
			}
		};
	}

	validateFields = e => {
		const { name, value } = e;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case "email":
				formErrors.email =
					value.length == 0 ? "L'adresse email est obligatoire" : "";
				break;
			case "password":
				formErrors.password =
					value.length == 0 ? "Le mot de passe est obligatoire" : "";
				break;
			default:
				break;
		}

		this.setState({ formErrors });
		console.log(this.state.formErrors);
	};

	handleChange = e => {
		const { name, value } = e;
		this.validateFields(e);
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

	register() {
		this.setState({
			loading: true
		});
		CreateUser(this.state.formFields)
			.then(data => {
				console.warn("data", data.token)
				AsyncStorage.setItem('token', JSON.stringify(data.token))
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
			title: "S'inscrire",
			headerLeft: (
				<TouchableHighlight
					onPress={() => navigation.goBack()}
					color="#EA7500"
				>
					<Image
						style={{ marginLeft: 10 }}
						source={require("../assets/icon/leftArrowAngle.png")}
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
					<Text style={styles.registerMainTitle}>S'inscrire</Text>
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
							/>
							<Input
								style={styles.input2}
								label="Nom"
								name="lastname"
								editable={true}
								onChangeText={this.handleChange}
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
						/>
					</View>
					<View style={styles.subcontainer}>
						<Text style={styles.subcontainerTitle}>
							Mot de passe
						</Text>
						<Input
							style={styles.input}
							label="Mot de Passe"
							name="password"
							editable={true}
							onChangeText={this.handleChange}
						/>
					</View>
					<View style={styles.subcontainer}>
						<Text style={styles.subcontainerTitle}>
							Confirmation du mot de passe
						</Text>
						<Input
							style={styles.input}
							placeholder="Confirmation du mot de passe"
							editable={true}
						/>
					</View>
					<View></View>
					<Button
						text="Créer mon compte"
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

export default Register;
