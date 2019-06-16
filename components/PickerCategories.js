import React from "react";
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Text,
	TouchableHighlight,
	Modal,
	TouchableWithoutFeedback,
	Picker
} from "react-native";
import DisplayCategories from "../utils/API/DisplayCategories";

class PickerCategories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			PickerSelectedVal: "",
			dataSource: null
		};
	}

	getCategories() {
		DisplayCategories()
			.then(data => {
				eventCategories = data.eventCategories;
				this.setState({ dataSource: eventCategories });
			})
			.catch(err => console.warn(err));
	}

	pickerElements() {
		let events = [];
		if (this.state.dataSource != null) {
			for (let event of this.state.dataSource) {
				events.push(
					<Picker.Item
						label={event.EventCategoryName}
						value={event.EventCategoryName}
					/>
				);
			}
		} else {
			<Picker.Item label="" value="" />;
		}
		return events;
	}

	helloWorld() {
		return "Salut minus"
	}

	render() {
		return (
			<View style={styles.inputContainer}>
				<View>
					<TouchableHighlight
						style={{
							height: 60,
							justifyContent: "center",
							zIndex: 1
						}}
						onPress={() =>
							this.setState(
								{ modalVisible: true },
								this.getCategories()
							)
						}
					>
						<TextInput
							value={this.state.PickerSelectedVal}
							style={{
								borderColor: "#F0F0F0",
								borderWidth: 1,
								height: 30,
								zIndex: 2,
								padding: 10
							}}
							placeholder="Cliquez ici pour afficher les catégories"
							editable={false}
						/>
					</TouchableHighlight>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
				>
					<TouchableWithoutFeedback
						onPress={() => this.setState({ modalVisible: false })}
					>
						<View style={styles.modalContainer}>
							<View style={styles.buttonContainer}>
								<Text
									style={{ color: "blue" }}
									onPress={() =>
										this.setState({ modalVisible: false })
									}
								>
									Done
								</Text>
							</View>
							<View>
								<Picker
									style={styles.picker}
									itemStyle={styles.pickerItem}
									selectedValue={this.state.PickerSelectedVal}
									onValueChange={itemValue => {
										this.setState({
											PickerSelectedVal: itemValue
										});
										this.props.onValueChange(itemValue);
									}}
								>
									{this.pickerElements()}
								</Picker>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		);
		console.log(eventCategory);
	}
}

const styles = StyleSheet.create({
	item: {
		padding: 10,
		fontSize: 18,
		height: 44
	},

	pickerItem: {
		marginTop: 0
	},

	input: {
		height: 40
	},

	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "white"
	},

	buttonContainer: {
		justifyContent: "flex-end",
		flexDirection: "row",
		padding: 4,
		backgroundColor: "#ececec"
	},

	newEventTitle: {
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 10
	}
});

export default PickerCategories;
