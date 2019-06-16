import React from "react";
import {
	StyleSheet,
	View,
	Button,
	Image,
	TextInput,
	Text,
	ScrollView,
	TouchableHighlight,
	AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { Loader } from "../../components/Loader";

import HistoryIndividualDamageItem from "../../components/HistoryIndividualEvent";
import NoEventContainer from "../../components/NoEventContainer";
import HistoryHeader from "../../components/HistoryHeader";
import GetEvents from "../../utils/API/GetEvents.js";

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "",
			comment: "",
			imageUri: "",
			adress: "",
			dataSource: "",
			date: "",
			token: "",
			loading: false,
			new: null
		};
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
		return {
			title: "Historique",
			headerStyle: {
				backgroundColor: "white"
			},
			headerTitleStyle: {
				fontWeight: "bold",
				color: "#00AFF5"
			}
		};
	};

	getEvents() {
		this.setState({
			loading: true
		});
		GetEvents({
			token: this.state.token
		})
			.then(data => {
				let user = data.r
				let action_add_user = {
					type: "UPDATE_USER",
					value: user
				};
				this.props.dispatch(action_add_user);

				let events = data.events;
				let action_add_event = {
					type: "UPDATE_EVENTS",
					value: events
				};
				this.props.dispatch(action_add_event);
				this.setState({
					loading: false
				});
			})
			.catch(resp => {
				this.setState({
					loading: false
				});
				console.error(resp);
			});
	}

	retrieveToken = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			this.setState({ token: token });
			this.getEvents();
		} catch (error) {}
	};

	componentDidMount() {
		this.retrieveToken();
		this.setState({ dataSource: this.props.events });
		console.warn("Johny", this.props.events);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ dataSource: nextProps.events });
	}

	renderEvents() {
		let events = [];
		if (this.state.dataSource.length > 0) {
			for (let event of this.state.dataSource) {
				if (event.DamageCategory == "Dégradation") {
					events.push(
						<View>
							<TouchableHighlight
								onPress={() => {
									{
										this.props.navigation.navigate(
											"IndividualEventSetting",
											{
												Index: this.props.events.indexOf(
													event
												)
											}
										);
									}
								}}
							>
								<HistoryIndividualDamageItem
									adress={event.WrittenAdress}
									eventLittlePicture={event.Path}
									imageDamage={
										<Image
											source={require("../../assets/icon/degradation2.png")}
										/>
									}
									date={event.Date}
								/>
							</TouchableHighlight>
							<View style={styles.update}>
								<TouchableHighlight
									onPress={() => {
										this.props.navigation.navigate(
											"IndividualEventSetting",
											{
												Index: this.props.events.indexOf(
													event
												)
											}
										);
									}}
								>
									<View style={styles.modify}>
										<Image
											source={require("../../assets/icon/pen.png")}
										/>
									</View>
								</TouchableHighlight>
							</View>
						</View>
					);
				} else if (event.DamageCategory == "Désagrément") {
					events.push(
						<View>
							<TouchableHighlight
								onPress={() => {
									{
										this.props.navigation.navigate(
											"IndividualEventSetting",
											{
												Index: this.props.events.indexOf(
													event
												)
											}
										);
									}
								}}
							>
								<HistoryIndividualDamageItem
									adress={event.WrittenAdress}
									eventLittlePicture={event.Path}
									imageDamage={
										<Image
											source={require("../../assets/icon/desagrement2.png")}
										/>
									}
									date={event.Date}
								/>
							</TouchableHighlight>
							<View style={styles.update}>
								<TouchableHighlight
									onPress={() => {
										this.props.navigation.navigate(
											"IndividualEventSetting",
											{
												Index: this.props.events.indexOf(
													event
												)
											}
										);
									}}
								>
									<View style={styles.modify}>
										<Image
											source={require("../../assets/icon/pen.png")}
										/>
									</View>
								</TouchableHighlight>
							</View>
						</View>
					);
				} else if (event.DamageCategory == "Danger") {
					events.push(
						<View>
							<TouchableHighlight
								onPress={() => {
									{
										this.props.navigation.navigate(
											"IndividualEventSetting",
											{
												Index: this.props.events.indexOf(
													event
												)
											}
										);
									}
								}}
							>
								<HistoryIndividualDamageItem
									adress={event.WrittenAdress}
									eventLittlePicture={event.Path}
									imageDamage={
										<Image
											source={require("../../assets/icon/danger2.png")}
										/>
									}
									date={event.Date}
								/>
							</TouchableHighlight>
							<View style={styles.update}>
								<TouchableHighlight
									onPress={() => {
										this.props.navigation.navigate(
											"IndividualEventSetting",
											{
												Index: this.props.events.indexOf(
													event
												)
											}
										);
									}}
								>
									<View style={styles.modify}>
										<Image
											source={require("../../assets/icon/pen.png")}
										/>
									</View>
								</TouchableHighlight>
							</View>
						</View>
					);
				}
			}
		} else {
			events.push(
				<NoEventContainer firstName={this.props.user.FirstName} />
			);
		}
		return events;
	}
	async logout() {
		await AsyncStorage.removeItem("token");
		this.props.navigation.navigate("Login");
	}

	render() {
		return this.state.loading ? (
			<Loader />
		) : (
			<ScrollView style={styles.container}>
				{this.renderEvents()}
				<TouchableHighlight onPress={async () => await this.logout()}>
					<Text>Me déconnecter</Text>
				</TouchableHighlight>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F0F0F0"
	},
	update: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		backgroundColor: "white",
		paddingBottom: 10,
		paddingTop: 10,
		paddingLeft: 40,
		paddingRight: 40
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(History);
