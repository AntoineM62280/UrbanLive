import React from "react";
import {
	Platform,
	StatusBar,
	StyleSheet,
	AsyncStorage,
	KeyboardAvoidingView,
	View
} from "react-native";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import Store from "./store/configureStore";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import RootNavigator from "./navigation/RootNavigator";
import RootNavigatorLogged from "./navigation/RootNavigatorLogged";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			isLogged: false
		};
	}

	componentDidMount() {
		let action_add_event = {
			type: "UPDATE_EVENTS",
			value: Store.events || []
		};
		Store.dispatch(action_add_event);
		console.warn('EVENTS', this.props.events);

		let action_add_user = {
			type: "UPDATE_USER",
			value: Store.user || []
		};
		Store.dispatch(action_add_user);
		
		let action_add_location = {
			type: "UPDATE_LOCATION",
			value: Store.location || []
		};
		Store.dispatch(action_add_location);
	}

	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = async () => {
		AsyncStorage.getItem("token").then(token => {
			if (token) {
				console.warn(token)
				this.setState({
					isLoadingComplete: true,
					isLogged: true
				});
			} else {
				this.setState({
					isLoadingComplete: true,
					isLogged: false
				});
			}
		});
	};

	_startAsync = () => {
		console.warn("Start");
	};

	render() {
		const kavBehavior =
			Platform.OS === "ios"
				? { behavior: "padding" }
				: { behavior: "padding" };
		if (!this.state.isLoadingComplete) {
			return (
				<AppLoading
					startAsync={this._startAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else if (this.state.isLogged) {
			return (
				<Provider store={Store}>
					<KeyboardAvoidingView
						style={{ flex: 1 }}
						{...kavBehavior}
						enabled
					>
						<View style={styles.container}>
							{Platform.OS === "ios" && (
								<StatusBar barStyle="default" />
							)}
							<RootNavigatorLogged />
						</View>
					</KeyboardAvoidingView>
				</Provider>
			);
		} else {
			return (
				<Provider store={Store}>
					<KeyboardAvoidingView
						style={{ flex: 1 }}
						{...kavBehavior}
						enabled
					>
						<View style={styles.container}>
							{Platform.OS === "ios" && (
								<StatusBar barStyle="default" />
							)}
							<RootNavigator />
						</View>
					</KeyboardAvoidingView>
				</Provider>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f07589"
	}
});
