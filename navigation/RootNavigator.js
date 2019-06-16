import React from "react";
import { createSwitchNavigator, createAppContainer} from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./AppNavigator";

export default createAppContainer(createSwitchNavigator(
	{
		Auth: AuthNavigator,
		App: BottomTabNavigator
	},
	{
		initialRouteName: "Auth"
	}
));
