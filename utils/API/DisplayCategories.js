import * as Config from "../../Config";
import { AsyncStorage } from "react-native";

module.exports = () => {
	return fetch(Config.API_URL + "/displayCategories", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}).then(response => response.json());
};
