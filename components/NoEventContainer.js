import React from "react";
import {
	StyleSheet,
	View,
	Button,
	Image,
	Text,
	Dimensions
} from "react-native";

// flaticon accident, broken building, waste pollution, #F0F0F0//

class NoEventContainer extends React.Component {
	render() {
		return (
			<View style={styles.noEventsContainer}>
				<Text style={styles.boldText}>
					Bienvenue sur UrbanLive {this.props.firstName} !
				</Text>
				<Text style={styles.noEventsText}>
					Vous n'avez pas encore enregistré d'événements. Il est
					possible de le faire en cliquant sur la rubrique "Ajouter"
					en bas de votre écran.
				</Text>
				<Text style={styles.noEventsText}>
					Améliorons ensemble votre confort.
				</Text>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	noEventsContainer: {
		backgroundColor: "#F0F0F0",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: Dimensions.get("screen").height - 100,
		paddingLeft: 20,
		paddingRight: 20
	},

	noEventsText: {
		marginBottom: 15,
		textAlign: "center"
	},

	boldText: {
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 20
	}
});

export default NoEventContainer;