import React from "react";
import {
	Platform,
	KeyboardAvoidingView,
	ScrollView,
	View,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	StyleSheet,
	Text,
	AsyncStorage
} from "react-native";

import * as Config from "../Config";
import CreateUser from "../utils/API/CreateUser";
import LSTextInput from "../components/LSTextInput";
import Colors from "../constants/Colors";
import FullscreenSpinner from "../components/FullscreenSpinner";
import TouchableView from "../components/TouchableView";
import { connect } from "react-redux";

class RegisterScreenBis extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.formData = {
			firstname: "",
			lastname: "",
			email: "",
			password1: "",
			password2: "",
			acceptEmails: false,
			acceptCgu: false,
			acceptData: false
		};

		this.canProceed = false;

		this.state = {
			facebook: false,
			error: "",
			loading: false,
			password2Error: null
		};

		this.inputs = {};
	}

	focusField(id) {
		this.inputs[id].getRef().focus();
	}

	markInputValid(name, value) {
		this.formData[name] = value;
		this.checkIfCanProceed();
	}

	markSecondPasswordInputValid(name, value) {
		if (value === this.formData.password1) {
			this.formData[name] = value;
			this.setState({ password2Error: "" });
		} else {
			this.formData[name] = "";
			this.setState({
				password2Error: "Les deux mots de passe doivent correspondre."
			});
		}
		this.checkIfCanProceed();
	}

	markInputInvalid(name) {
		this.formData[name] = "";
		this.checkIfCanProceed();
	}

	checkIfCanProceed() {
		if (
			this.formData.firstname &&
			this.formData.lastname &&
			this.formData.email &&
			this.formData.postalCode &&
			(this.formData.password1 && this.formData.password2)
		) {
			this.refs.proceedBtn.setTint(Colors.mainBlue, Colors.orange);
			this.canProceed = true;
		} else {
			this.refs.proceedBtn.setTint(
				"rgb(153, 153, 153)",
				Colors.textColor
			);
			this.canProceed = false;
		}
	}

	proceed() {
		if (this.canProceed) {
			this.setState({
				loading: true
			});
			CreateUser(this.formData)
				.then(data => {
					let user = data.user[0];
					console.warn("eeeeeee");
					AsyncStorage.setItem("token", user.Token);
					let action_add_user = {
						type: "UPDATE_USER",
						value: user
					};
					this.props.dispatch(action_add_user);
					console.warn("rrrrr", this.props.user);
					this.setState({
						loading: false
					});
					this.props.navigation.navigate("History");
				})
				.catch(err => {
					console.warn(err);
					this.setState({ emailTakenError: true, loading: false });
				});
		}
	}

	openIosDatePicker() {
		this.refs.datePickerIos.open();
	}

	renderError() {
		if (this.state.error)
			return <Text style={styles.form.error}>{this.state.error}</Text>;
	}

	render() {
		const kavBehavior =
			Platform.OS === "ios" ? { behavior: "padding" } : {};
		return (
			<View style={styles.screen.container}>
				<ScrollView
					style={styles.screen.container}
					contentContainerStyle={{ paddingBottom: 20}}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.title.container}>
						<Text style={styles.title.text}>
							Apprenons-en davantage sur vous
						</Text>
					</View>
						<View style={styles.form.container}>
							{this.renderError()}
							<LSTextInput
								style={styles.form.input}
								label="Prénom"
								placeholder="Requis"
								validate={{
									required: { error: "Ce champ est requis." },
									minLength: {
										value: 2,
										error: "2 caractères minimum."
									},
									maxLength: {
										value: 32,
										error: "32 caractères maximum."
									}
								}}
								onValid={value =>
									this.markInputValid("firstname", value)
								}
								onInvalid={() => this.markInputInvalid("firstname")}
								ref={input => {
									this.inputs["firstname"] = input;
								}}
								onSubmitEditing={() =>
									this.inputs["lastname"].focus()
								}
								blurOnSubmit={false}
								returnKeyType="next"
							/>
							<LSTextInput
								style={styles.form.input}
								label="Nom de famille"
								placeholder="Requis"
								validate={{
									required: { error: "Ce champ est requis." },
									minLength: {
										value: 2,
										error: "2 caractères minimum."
									},
									maxLength: {
										value: 32,
										error: "32 caractères maximum."
									}
								}}
								onValid={value =>
									this.markInputValid("lastname", value)
								}
								onInvalid={() => this.markInputInvalid("lastname")}
								ref={input => {
									this.inputs["lastname"] = input;
								}}
								onSubmitEditing={() => this.inputs["email"].focus()}
								blurOnSubmit={false}
								returnKeyType="next"
							/>
							<LSTextInput
								style={styles.form.input}
								label="Adresse email"
								placeholder="Requis"
								validate={{
									required: { error: "Ce champ est requis." },
									email: {
										error: "Adresse email incorrecte."
									}
								}}
								onValid={value =>
									this.markInputValid("email", value)
								}
								onInvalid={() => this.markInputInvalid("email")}
								ref={input => {
									this.inputs["email"] = input;
								}}
								onSubmitEditing={() =>
									this.inputs["postalCode"].focus()
								}
								blurOnSubmit={true}
								autoCapitalize="none"
								returnKeyType="next"
							/>
							<LSTextInput
								style={styles.form.input}
								label="Code Postal"
								placeholder="Requis"
								validate={{
									required: { error: "Ce champ est requis." },
									postalCode: {
										error: "Code Postal incorrect."
									}
								}}
								onValid={value =>
									this.markInputValid("postalCode", value)
								}
								onInvalid={() =>
									this.markInputInvalid("postalCode")
								}
								ref={input => {
									this.inputs["postalCode"] = input;
								}}
								onSubmitEditing={() =>
									this.inputs["password1"].focus()
								}
								blurOnSubmit={false}
								returnKeyType="next"
							/>
							<LSTextInput
								style={styles.form.input}
								label="Mot de passe"
								placeholder="Requis"
								validate={{
									required: { error: "Ce champ est requis." },
									minLength: {
										value: 8,
										error: "8 caractères minimum."
									},
									maxLength: {
										value: 32,
										error: "32 caractères maximum."
									},
									password: { error: "" }
								}}
								onValid={value => {
									this.markInputValid("password1", value);
									this.inputs["password2"].setPasswordMatch(
										this.formData["password1"]
									);
								}}
								onInvalid={() => this.markInputInvalid("password1")}
								ref={input => {
									this.inputs["password1"] = input;
								}}
								onSubmitEditing={() =>
									this.inputs["password2"].focus()
								}
								blurOnSubmit={false}
								autoCapitalize="none"
								returnKeyType="next"
							/>
							<LSTextInput
								style={styles.form.input}
								label={"Confirmez le\nmot de passe"}
								placeholder="Requis"
								validate={{
									required: { error: "Ce champ est requis." },
									minLength: {
										value: 8,
										error: "8 caractères minimum."
									},
									maxLength: {
										value: 32,
										error: "32 caractères maximum."
									},
									password: { error: "" },
									passwordMatch: {
										error:
											"Les deux mots de passe doivent correspondre."
									}
								}}
								onValid={value =>
									this.markInputValid("password2", value)
								}
								onInvalid={() => this.markInputInvalid("password2")}
								ref={input => {
									this.inputs["password2"] = input;
								}}
								onSubmitEditing={() => this.proceed()}
								blurOnSubmit={true}
								autoCapitalize="none"
								returnKeyType="send"
							/>
						</View>
				</ScrollView>
				<TouchableView
						ref="proceedBtn"
						tint="rgb(153, 153, 153)"
						activeTint={Colors.textColor}
						outerStyle={styles.proceed.outer}
						innerStyle={styles.proceed.inner}
						onPress={() => this.proceed()}
					>
						<Text style={styles.proceed.text}>CONTINUER</Text>
						<Image style={styles.proceed.image} />
					</TouchableView>

				{this.state.loading === true && <FullscreenSpinner />}
			</View>
		);
	}
}

const styles = {};

styles.screen = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	layer: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	backLayer: {
		zIndex: 1
	},
	frontLayer: {
		zIndex: 1
	}
});

styles.title = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginTop: 40
	},
	text: {
		fontSize: 20,
		color: Colors.textColor,
		fontWeight: "bold",
		marginBottom: 20
	}
});

styles.form = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	error: {
		color: "#f44336"
	},
	input: {
		marginTop: 10
	},
	checkbox: {
		marginTop: 10
	},
	checkboxText: {
		fontSize: 16,
		color: Colors.text,
		flex: 1
	}
});

styles.proceed = StyleSheet.create({
	outer: {},
	inner: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 15
	},
	text: {
		height: 20,
		marginBottom: Platform.OS === "android" ? 3 : 0,
		color: Colors.white
	},
	image: {
		width: 20,
		height: 20,
		resizeMode: "contain"
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(RegisterScreenBis);
