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
import Colors from '../constants/Colors';
import { connect } from "react-redux";


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
				password2 : "",
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
				let user = data.user[0];
				AsyncStorage.setItem("token", user.Token);
				let action_add_user = {
					type: "UPDATE_USER",
					value: user
				};
				this.props.dispatch(action_add_user);
				this.setState({
					loading: false
				});
				this.props.navigation.navigate('History')
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
				backgroundColor: Colors.mainBlue
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
					<View style={styles.subcontainer}>
						<View style={styles.identitySubcontainerInput}>
							<Input
								style={styles.input1}
								label="Prénom"
								name="firstname"
								placeholder = {'Prénom'}
								editable={true}
								onChangeText={this.handleChange}
							/>
							<Input
								style={styles.input2}
								label="Nom"
								name="lastname"
								placeholder = {'Nom'}
								editable={true}
								onChangeText={this.handleChange}
							/>
						</View>
					</View>
					<View style={styles.subcontainer}>
						<Input
							style={styles.input}
							label="Adress Mail"
							name="email"
							placeholder = {'ex : antoine.salveri@gmail.com'}
							editable={true}
							onChangeText={this.handleChange}
						/>
					</View>
					<View style={styles.subcontainer}>
						<Input
							style={styles.input}
							label="Code Postal"
							name="postalCode"
							editable={true}
							onChangeText={this.handleChange}
							keyboardType={'numeric'}
							placeholder={'ex : 62280'}
						/>
					</View>
					<View style={styles.subcontainer}>
						<Input
							style={styles.input}
							label="Mot de Passe"
							placeholder = {'Mot de Passe'}
							name="password"
							secureTextEntry={true}
							editable={true}
							onChangeText={this.handleChange}
						/>
					</View>
					<View style={styles.subcontainer}>
						<Input
							style={styles.input}
							label="Confirmation du mot de passe"
							placeholder = {'Confirmation du mot de passe'}
							name="password"
							editable={true}
							onChangeText={this.handleChange}
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
		borderWidth: 1,
		borderRadius : 5,
		height: 30,
		paddingLeft: 10,
		paddingRight: 10,
		width: 250,
		backgroundColor: "white",
		borderColor : Colors.borderInput
	},
	input1: {
		width: 120,
		borderRadius : 5,
		borderColor : Colors.borderInput,
		borderWidth: 1,
		height: 30,
		paddingLeft: 10,
		paddingRight: 10,
		marginRight: 10,
		backgroundColor: "white"
	},

	input2: {
		width: 120,
		borderRadius : 5,
		borderColor : Colors.borderInput,
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
		marginBottom: 20,
		color : Colors.textColor,
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Register);
