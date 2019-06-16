import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { StyledText } from "./StyledText";

export class Button extends React.Component {
	constructor(props) {
		super(props);

		this.textStyle = textStyles[this.props.type || "def"];
		this.buttonStyle = buttonStyles[this.props.type || "def"];
	}

	render() {
		return (
			<TouchableOpacity {...this.props}>
				<View
					style={[
						this.buttonStyle,
						this.props.style,
						this.props.active === false
							? { backgroundColor: "rgb(153, 153, 153)" }
							: {},
						this.props.active === true
							? { backgroundColor: "rgb(95, 210, 201)" }
							: {}
					]}
				>
					<StyledText style={[this.textStyle, this.props.textStyle]}>
						{this.props.text}
					</StyledText>
				</View>
			</TouchableOpacity>
		);
	}
}

const textStyles = StyleSheet.create({
	def: {
		width: 170,
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center"
	}
});

const buttonStyles = StyleSheet.create({
	def: {
		alignItems: "center",
		borderRadius: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center"
	}
});