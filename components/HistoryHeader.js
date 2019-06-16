import React from "react";
import { Button, Image, View, Text } from "react-native";
import { StackNavigator } from "react-navigation"; // 1.0.0-beta.27

class HistoryHeader extends React.Component {
	render() {
		return <Image source={require("../assets/icon/logoUrbanLive2.png")} />;
	}
}

export default HistoryHeader;