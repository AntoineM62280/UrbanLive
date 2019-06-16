import React from "react";
import { Image, StyleSheet } from "react-native";

const tabBarIconList = {
	history: {
		icon: require("../assets/icon/history.png"),
		iconHL: require("../assets/icon/historyGreen.png")
	},
	add: {
		icon: require("../assets/icon/add.png"),
		iconHL: require("../assets/icon/addGreen.png")
	},
	profile: {
		icon: require("../assets/icon/user.png"),
		iconHL: require("../assets/icon/userGreen.png")
	}
};

export default class TestTabBarIcon extends React.Component {
	constructor(props) {
		super(props);
		if (tabBarIconList[this.props.name]) {
			this.icon = tabBarIconList[this.props.name].icon;
			this.iconHL = tabBarIconList[this.props.name].iconHL;
		} else console.error("No tabBarIcon named '" + this.props.name + "'.");
	}

	render() {
		return (
			<Image
				source={this.props.focused ? this.iconHL : this.icon}
				style={styles.tabImage}
			/>
		);
	}
}

const styles = StyleSheet.create({
	tabImage: {
		width: 24,
		height: 24,
		resizeMode: "contain"
		// marginTop: 3,
		// marginLeft: -10,
	}
});
