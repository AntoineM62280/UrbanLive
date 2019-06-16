import React from "react";
import { StyleSheet, Image } from "react-native";
import {
	createStackNavigator,
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createSwitchNavigator,
	createAppContainer
} from "react-navigation";

import EventCategories from "../screens/NewEvent/EventCategories";
import NewEventScreen from "../screens/NewEvent/NewEventScreen";
import UserProfile from "../screens/Profile/UserProfile";
import History from "../screens/History/History";
import TestTabBarIcon from "../components/TestTabBarIcon";
import BottomTabLabel from "../components/BottomTabLabel";
import EventConfirmation from "../screens/NewEvent/EventConfirmation";
import IndividualEventSetting from "../screens/History/UpdateIndividualEventScreen";
import UpdateUserProfile from "../screens/Profile/UpdateUserProfile";

const Historique = createStackNavigator({
	History: History,
	IndividualEventSetting: IndividualEventSetting
});
Historique.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<TestTabBarIcon focused={focused} name="history" />
	),
	tabBarLabel: ({ focused }) => (
		<BottomTabLabel focused={focused} text="Historique" />
	)
};

const Ajouter = createStackNavigator({
	Events: EventCategories,
	NewEvent: NewEventScreen,
	EventConfirmation: EventConfirmation
});
Ajouter.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<TestTabBarIcon focused={focused} name="add" />
	),
	tabBarLabel: ({ focused }) => (
		<BottomTabLabel focused={focused} text="Ajouter" />
	)
};

const Profil = createStackNavigator({
	Profile: UserProfile,
	UpdateUserProfile: UpdateUserProfile
});
Profil.navigationOptions = {
	tabBarIcon: ({ focused }) => (
		<TestTabBarIcon focused={focused} name="profile" />
	),
	tabBarLabel: ({ focused }) => (
		<BottomTabLabel focused={focused} text="Profil" />
	)
};

const BottomTabNavigator = createBottomTabNavigator(
	{
		Historique,
		Ajouter,
		Profil
		//MyPrivilegeStack,
	},
	{
		initialRouteName: "Historique",
		tabBarOptions: {
			style: {
				height: 60,
				borderColor: "red",
				borderTopWidth: 0,
				borderTopColor: "#D3D3D3",
				shadowOffset: {
					width: 0,
					height: 2
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5
			},
			resetOnBlur: true
		}
	}
);


export default BottomTabNavigator;

