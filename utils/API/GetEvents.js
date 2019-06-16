import * as Config from "../../Config";
import { AsyncStorage } from "react-native";

module.exports = data => {
	return fetch(Config.API_URL + "/getEvents", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ ...data })
	}).then(response => response.json());
};
