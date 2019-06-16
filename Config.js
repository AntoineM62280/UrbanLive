import {
	Constants
} from "expo";

let API_URL;
let DEV;
let FACEBOOK_APP_ID;

if (Constants.manifest.releaseChannel) {
	API_URL = "http://46.101.53.121:40089";
	FACEBOOK_APP_ID = "603518163490249";
	DEV = true;
} else {
	API_URL = "http://46.101.53.121:40089";
	FACEBOOK_APP_ID = "603518163490249";
	DEV = true;
}

export {
	API_URL,
	FACEBOOK_APP_ID,
	DEV
};