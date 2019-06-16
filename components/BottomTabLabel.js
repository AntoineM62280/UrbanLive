import React from "react";
import {StyleSheet, Text} from "react-native";


export default class bottomTabLabel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Text style={this.props.focused
					? [styles.labelDefault, styles.labelActive]
					: [styles.labelDefault, styles.labelInactive]}
			>
            	{this.props.text}
			</Text>
		);
	}
}

const styles = StyleSheet.create({
	labelDefault: {
		lineHeight: 22,
		marginTop: -10,
		textAlign: "center",
		fontSize: 10,
	},
	labelActive: {
		color: '#0075EB',
	},
	labelInactive: {
		color: '#8c8c8c',
	},
});
