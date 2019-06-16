import React from "react";
import {
	StyleSheet,
	View,
	Button,
	Image,
	TextInput,
	TouchableHighlight,
	Text
} from "react-native";

//<View style={styles.categoryContainer}>
//	<Image style={styles.imageDamage} source={this.props.ImageName}/>
//	<Text> {this.props.descriptionName}</Text>
//</View>
import { ImagePicker } from "expo";

// in managed apps:
import moment from "moment";
import "moment/locale/fr";

// color pen and delete 8D8787
// in bare apps:
class HistoryIndividualEvent extends React.Component {
	constructor(props) {
		super(props);
		let d = moment(this.props.date);
		let dddd = d.format("dddd");
		dddd = dddd[0].toUpperCase() + dddd.substr(1);
		let ddd = d.format("ddd");
		ddd = ddd[0].toUpperCase() + ddd.substr(1);
		let Do = d.format("Do");
		let MMMM = d.format("MMMM");
		MMMM = MMMM[0].toUpperCase() + MMMM.substr(1);
		let YYYY = d.format("YYYY");
		YYYY = YYYY[0].toUpperCase() + YYYY.substr(1);
		this.title = `${dddd} ${Do} ${MMMM} ${YYYY}`;
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.individualDamageContainer}>
					<View style={styles.categoryContainer}>
						<Image
							style={styles.imageDamage}
							source={{ uri: this.props.eventLittlePicture }}
						/>
					</View>
					<View style={styles.firstLineOfInfo}>
						<View style={styles.infoContainer}>
							<View style={styles.dateContainer}>
								<Image
									source={require("../assets/icon/calendar.png")}
								/>
								<Text style={styles.date}> {this.title}</Text>
								<View style={styles.categoryBackground}>
									{this.props.imageDamage}
								</View>
							</View>
							<View style={styles.locationContainer}>
								<Image
									source={require("../assets/icon/location.png")}
								/>
								<Text style={styles.location}>
									{this.props.adress}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flexDirection: "column",
		marginTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 15,
		paddingBottom: 15
	},

	individualDamageContainer: {
		backgroundColor: "white",
		flexDirection: "row",
		flexWrap: "nowrap",
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0"
	},
	categoryContainer: {
		marginRight: 20,
		width: 100
	},
	date: {
		fontWeight: "bold",
		color: "orange",
		marginLeft: 8
	},
	location: {
		textAlign: "left",
		marginLeft: 10
	},
	infoContainer: {
		justifyContent: "space-between",
		width: 210
	},

	imageDamage: {
		marginBottom: 10,
		height: 100
	},
	firstLineOfInfo: {
		flexDirection: "row",
		paddingRight: 10
	},
	imgCategory: {
		marginRight: 10
	},
	locationContainer: {
		flexDirection: "row"
	},
	dateContainer: {
		flexDirection: "row",
		alignItems: "center"
	},

	categoryBackground: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F0F0F0",
		height: 45,
		width: 45,
		borderRadius: 22.5,
		marginLeft: 15
	},

	update: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		paddingBottom: 10,
		paddingTop: 10,
		paddingLeft: 40,
		paddingRight: 40
	}
});

export default HistoryIndividualEvent;
