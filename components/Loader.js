import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export class Loader extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
		padding: 10
	}
});
