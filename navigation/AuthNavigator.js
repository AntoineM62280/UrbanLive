import React from "react";
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator
} from "react-navigation";

import Register from "../screens/Register.js";
import LoginScreen from "../screens/LoginScreen.js";

const AuthNavigator = createStackNavigator({
	Login: { screen: LoginScreen },
	Register: { screen: Register }
});

export default AuthNavigator
