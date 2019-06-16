import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

class ReloadScreen extends React.Component {
	constructor(props)	{ super(props);}
	componentDidMount()	{ this.props.navigation.navigate("App");}
	render()			{ return (null);}
}

export default createAppContainer(createSwitchNavigator(
	{
		Auth: AuthNavigator,
		App: AppNavigator,
		Reload: ReloadScreen,
	},
	{
		initialRouteName: "App"
	}
));
