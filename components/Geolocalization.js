import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";

class Geolocalization extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;

    let locationDetails = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude
    });

    this.setState({ locationDetails });
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.locationDetails) {
      text = this.state.locationDetails[0].country;
    }
    return <Text style={styles.paragraph}>{text}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {}
});

export default Geolocalization;
