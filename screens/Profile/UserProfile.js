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
	TouchableHighlight,
	ScrollView
} from "react-native";
import { connect } from "react-redux";

// couleur du logo 8C8C8C//

class UserProfile extends React.Component {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
		return {
			title: "Profil",
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
		return (
			<ScrollView style={styles.container}>
				<View style={styles.identityContainer}>
					<View
						style={{
							backgroundColor: "#F0F0F0",
							marginTop: 10,
							borderRadius: 40,
							padding: 15
						}}
					>
						<Image
							source={require("../../assets/icon/myAccount.png")}
						/>
					</View>
					<Text style={{ marginTop: 10 }}>
						{" "}
						{this.props.user.FirstName}
					</Text>
				</View>
				<View style={styles.categoryUserInfo}>
					<Text style={styles.categoryTitle}> Profil </Text>
					<TouchableHighlight
						onPress={() => {
							this.props.navigation.navigate("UpdateUserProfile");
						}}
					>
						<View style={styles.subCategoryUserInfo}>
							<Image
								source={require("../../assets/icon/profileInfo.png")}
							/>
							<Text style={styles.textUserInfo}>
								Informations personnelles{" "}
							</Text>
						</View>
					</TouchableHighlight>
					<View style={styles.subCategoryUserInfo}>
						<Image source={require("../../assets/icon/lock.png")} />
						<Text style={styles.textUserInfo}>
							{" "}
							Modifier le mot de passe{" "}
						</Text>
					</View>
				</View>
				<View style={styles.categoryUserInfo}>
					<Text style={styles.categoryTitle}> Sécurité </Text>
					<View style={styles.subCategoryUserInfo}>
						<Image
							source={require("../../assets/icon/confidentialityPolitics.png")}
						/>
						<Text style={styles.textUserInfo}>
							{" "}
							Politique de confidentialité{" "}
						</Text>
					</View>
					<View style={styles.subCategoryUserInfo}>
						<Image
							source={require("../../assets/icon/notification.png")}
						/>
						<Text style={styles.textUserInfo}> Notification </Text>
					</View>
				</View>
				<View style={styles.categoryUserInfo}>
					<Text style={styles.categoryTitle}> À propos de nous </Text>
					<View style={styles.subCategoryUserInfo}>
						<Image
							source={require("../../assets/icon/confidentialityPolitics.png")}
						/>
						<Text style={styles.textUserInfo}>
							{" "}
							Likez notre page Facebook{" "}
						</Text>
					</View>
					<View style={styles.subCategoryUserInfo}>
						<Image source={require("../../assets/icon/website.png")} />
						<Text style={styles.textUserInfo}>
							{" "}
							Venez voir notre site Web{" "}
						</Text>
					</View>
					<View style={styles.subCategoryUserInfo}>
						<Image
							source={require("../../assets/icon/confidential.png")}
						/>
						<Text style={styles.textUserInfo}>
							{" "}
							Conditions générales{" "}
						</Text>
					</View>
				</View>
			</ScrollView>
		);
	}
}

var styles = StyleSheet.create({
	identityContainer: {
		alignItems: "center",
		paddingBottom: 40,
		borderBottomColor: "#F0F0F0",
		borderBottomWidth: 1
	},

	categoryUserInfo: {
		paddingBottom: 40,
		borderBottomColor: "#F0F0F0",
		borderBottomWidth: 1
	},

	subCategoryUserInfo: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "baseline",
		marginTop: 20,
		marginLeft: 20
	},

	textUserInfo: {
		marginLeft: 30
	},

	categoryTitle: {
		marginLeft: 17,
		marginTop: 30,
		fontSize: 20
	}
});

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(UserProfile);
