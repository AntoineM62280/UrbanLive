import React from "react";
import { Text } from "react-native";

export class StyledText extends React.Component {
	render() {
		let fontFamily = "Arial";
		if (this.props.weight == "bold") fontFamily = "Arial";
		else if (this.props.weight == "light") fontFamily = "Airal";
		return (
			<Text
				{...this.props}
				style={[{ color: "#353133" }, this.props.style, { fontFamily }]}
			/>
		);
	}
}
