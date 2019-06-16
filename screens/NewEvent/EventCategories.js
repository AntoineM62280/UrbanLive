import React from "react";
import {
	StyleSheet,
	View,
	Button,
	Image,
	AsyncStorage,
	TextInput,
	Text,
	ImageBackground,
	TouchableHighlight
} from "react-native";
import Camera from "react-native-camera";

// flaticon accident, broken building, waste pollution, #F0F0F0//

class EventCategories extends React.Component {

	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
			return {
	      		title: 'Ajouter un événement',
	      /* These values are used instead of the shared configuration! */
	      		headerStyle: {
	        		backgroundColor: '#EA7500',
	      		},
	      		headerTitleStyle: {
			     	fontWeight: 'bold',
			     	color:'white'
			    },

	    		};

	};

	render() {

		return (
			<View style={styles.container}>
				<TouchableHighlight
					onPress={() =>
						this.props.navigation.navigate("NewEvent", {
							damageCategory: "Désagrément"
						})
					}
					style={{
						width: "100%",
						alignItems: "center",
						backgroundColor: "#F0F0F0",
						height: 140,
						marginTop: 15,
					}}
				>
					<View style={styles.subContainer1}>
						<Image
							style={styles.imgCategory}
							source={require("../../assets/icon/desagrement.png")}
						/>
						<Text style={styles.textCategory}>Désagrément</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() =>
						this.props.navigation.navigate("NewEvent", {
							damageCategory: "Dégradation"
						})
					}
					style={{
						width: "100%",
						alignItems: "center",
						backgroundColor: "#F0F0F0",
						height: 140,
						marginTop: 15,
					}}
				>
					<View style={styles.subContainer2}>
						<Image
							style={styles.imgCategory}
							source={require("../../assets/icon/degradation.png")}
						/>
						<Text style={styles.textCategory}>Dégradation</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() =>
						this.props.navigation.navigate("NewEvent", {
							damageCategory: "Danger"
						})
					}
					style={{
						width: "100%",
						alignItems: "center",
						backgroundColor: "#F0F0F0",
						height: 140,
						marginTop: 15,
						marginBottom: 15
					}}
				>
					<View style={styles.subContainer3}>
						<Image
							style={styles.imgCategory}
							source={require("../../assets/icon/danger.png")}
						/>
						<Text style={styles.textCategory}>Danger</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "#F0F0F0"
	},

	subContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: {
			width: 5,
			height: 9
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,
		elevation: 2
	},

	subContainer1: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingBottom: 30,
		height: 140,
		borderBottomColor: "#F0F0F0",
		borderBottomWidth: 1,
		shadowOffset: {
			width: 1,
			height: 3
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		backgroundColor: "white",
		paddingTop: 30
	},

	subContainer2: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingBottom: 30,
		height: 140,
		borderBottomColor: "#F0F0F0",
		borderBottomWidth: 1,
		shadowOffset: {
			width: 1,
			height: 3
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		backgroundColor: "white",
		paddingTop: 10
	},

	subContainer3: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: 20,
		height: 140,
		padding: 20,
		shadowOffset: {
			width: 1,
			height: 3
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		backgroundColor: "white",
		paddingTop: 10
	},

	textCategory: {
		fontSize: 15,
		fontWeight : 'bold',
		color: "black",
		marginTop: 15
	}
});
export default EventCategories;
