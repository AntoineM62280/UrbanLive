import React from 'react'
import { 
	StyleSheet,
	View, 
	Button, 
	Image, 
	AsyncStorage,
	TextInput, 
	Text,
	ScrollView, 
  TouchableHighlight } from 'react-native';

import { ImagePicker, Permissions, Constants, Location } from 'expo';

class CameraPicture extends React.Component{

	state = {
    result: {},
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this.setState({ result });
  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this.setState({ result });
    console.log(encodeURI(this.state.result.uri));
   
  };

  renderElement() {
    let image = encodeURI(this.state.result.uri);

    if(image)
      return(<Image style={{width:"100%", height: 150, marginTop:15, borderRadius:10}} source={{uri : image }}/>)
      else 
        return(
          <TouchableHighlight 
            onPress={this.useCameraHandler}
            style={{width:"100%", alignItems:'center', marginTop:3, backgroundColor: '#F0F0F0'}}>
            <View style={{width:"100%",  height: 150, flexDirection: 'column', alignItems:'center',  paddingBottom:50, paddingTop: 50, backgroundColor: 'white'}}> 
              <Image source={require("../assets/icon/photo.png")}/>
              <Text style ={{fontWeight:'bold'}}> Cliquez ici pour prendre une photo</Text>
            </View>
          </TouchableHighlight>
        )
  }

  render() {

      return (

  	  	<View style={styles.CameraContainer}> 
  	     	{this.renderElement()}
  			</View>
				
		);
	}
}

const styles = StyleSheet.create ({
  buttonPicture : {
    alignItems: 'flex-start'
  },
  CameraContainer: {
    borderBottomColor : '#F0F0F0',
    borderBottomWidth: 1,
    marginBottom:3
  },

  newEventFormTitles :{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    marginTop: 30
  }, 

  textUserInfo: {
    marginLeft : 15,
    fontWeight: 'bold'
  },
})

export default CameraPicture