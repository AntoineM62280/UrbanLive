import * as Config from "../../Config";
import { AsyncStorage } from "react-native";

module.exports = data => {
	return fetch(config.API_URL + "/updateIndividualEvent", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ ...data })
	}).then(response => response.json());
};