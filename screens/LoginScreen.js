import React from "react";
import {
	StyleSheet,
	View,
	Image,
	AsyncStorage,
	TextInput,
	Text,
	ImageBackground
} from "react-native";

import { NavigationActions } from "react-navigation";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { connect } from "react-redux";
import Login from "../utils/API/Login";


class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loading: false,
			loginError: false,
			userId: null,
			dataSource: ""
		};
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			header: null
			/* These values are used instead of the shared configuration! */
		};
	};

	isFormComplete() {
		return this.state.email != "" && this.state.password != "";
	}

	handleChange = e => {
		const { name, value } = e;
		if (name == "email") this.setState({ email: value });
		else if (name == "password") this.setState({ password: value });
	};

	login() {
		this.setState({
			loading: true
		});
		Login({
			email: this.state.email,
			password: this.state.password
		})
			.then(data => {
						let user = data.user[0];
						AsyncStorage.setItem("token",user.Token);
						let action_add_user = {
							type: "UPDATE_USER",
							value: user
						};
						this.props.dispatch(action_add_user);
						this.setState({
							loading: false
						});
						this.props.navigation.navigate("History");
				})
			.catch(resp => {
				this.setState({
					loading: false
				});
				console.error(resp);
			});
	}

	render() {
		const { navigate } = this.props.navigation;
		return this.state.loading ? (
			<Loader />
		) : (
			<ImageBackground
				source={require("../assets/img/paris.jpg")}
				style={styles.container}
			>
				<Image
					source={require("../assets/icon/logoUrbanLive.png")}
					style={{ marginTop: 60 }}
				/>
				<Text
					style={{ marginTop: 40, fontSize: 30, textAlign: "center" }}
				>
					Bienvenue sur{" "}
				</Text>
				<Text
					style={{
						marginTop: 0,
						marginBottom: 80,
						fontSize: 30,
						textAlign: "center",
						fontWeight: "bold"
					}}
				>
					{" "}
					URBANLIVE{" "}
				</Text>
				<View style={styles.field}>
					<Input
						label="EMAIL"
						name="email"
						onChangeText={this.handleChange}
						style={styles.input}
						textContentType="emailAddress"
						keyboardType="email-address"
						underlineColorAndroid="transparent"
					/>
					<View style={styles.inputIconWrapper}>
						<Image
							style={styles.inputIcon}
							source={require("../assets/icon/letter.png")}
						/>
					</View>
				</View>
				<View style={styles.field}>
					<Input
						label="MOT DE PASSE"
						name="password"
						onChangeText={this.handleChange}
						style={styles.input}
						secureTextEntry={true}
						textContentType="password"
					/>
					<View style={styles.inputIconWrapper}>
						<Image
							style={styles.inputIcon}
							source={require("../assets/icon/eyeClosed.png")}
						/>
					</View>
				</View>
				<View style={styles.buttonBackground}>
					<Button
						text="Se connecter"
						active={this.isFormComplete()}
						onPress={() => this.login()}
					/>
				</View>
				<View style={styles.buttonBackground2}>
					<Text
						style={styles.buttonText2}
						title="Se connecter"
						onPress={() => navigate("Register")}
					>
						{" "}
						Créer un compte
					</Text>
				</View>
			</ImageBackground>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#7CB299"
	},

	field: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: 300
	},

	input: {
		height: 30,
		color: "black",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: StyleSheet.hairlineWidth,
		width: 250
	},

	buttonBackground: {
		backgroundColor: "#01A85B",
		width: 150,
		height: 40,
		marginTop: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40
	},

	buttonBackground2: {
		backgroundColor: "white",
		width: 170,
		height: 40,
		marginTop: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40
	},

	buttonText2: {
		color: "#01A85B"
	},

	buttonText: {
		color: "white"
	},

	inputIconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		width: 24,
		height: 24
	},

	inputIcon: {
		width: 16,
		height: 16
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(LoginScreen);
