import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { StyledText } from "./StyledText";


export class Input extends React.Component {
	render() {
		const hasError =
			this.props.error && this.props.error.length > 0 ? true : false;
		return (
			<View style={styles.container}>
				{this.props.icon && (
					<Icon
						name={this.props.icon}
						height={15}
						width={15}
						fill= '#255350'
						style={styles.icon}
					/>
				)}
				<Text>
					<StyledText style={[styles.text, hasError && styles.errorLabel]}>
						{this.props.label}
					</StyledText>
					{this.props.note && (
						<StyledText style={[styles.note, hasError && styles.errorLabel]}>
							{" " + this.props.note}
						</StyledText>
					)}
				</Text>
				<TextInput
					{...this.props}
					style={[
						styles.textInput,
						this.props.icon && styles.hasIcon,
						this.props.style,
						hasError && styles.error
					]}
					onChangeText={value =>
						this.props.onChangeText({ name: this.props.name, value })
					}
					value = {this.props.value}
				/>
				{hasError && (
					<StyledText style={styles.errorMsg}>{this.props.error}</StyledText>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 12,
		position: "relative"
	},
	text: {
		color: "rgb(49,109,104)",
		fontSize: 12,
	},
	note: {
		color: "#A9A9A9",
		fontSize: 12
	},
	button: {
		padding: 16,
		alignItems: "center",
		borderRadius: 3
	},

	hasIcon: {
		paddingRight: 45
	},

	error: {
		borderColor: "#F46A7D"
	},
	errorLabel: {
		color: "#F46A7D"
	},
	errorMsg: {
		color: "#F11735",
		fontSize: 14,
		paddingTop: 6
	}
});
