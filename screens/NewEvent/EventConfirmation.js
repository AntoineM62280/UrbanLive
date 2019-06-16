import React from 'react'
import {
	StyleSheet,
	View,
	Button,
	Image,
	AsyncStorage,
	TextInput,
	Text,
	Dimensions,
	ScrollView,
	TouchableHighlight,
} from 'react-native'

import { ImagePicker } from 'expo'
import { FileSystem } from 'expo'
import { connect } from 'react-redux'

class EventConfirmation extends React.Component {

	static navigationOptions = ({ navigation, navigationOptions }) => {
	const { params } = navigation.state;
		return {
			title: 'Confirmation',
			headerStyle: {
			backgroundColor: '#EA7500',
			},
			headerLeft: null,
			headerTitleStyle: {
				fontWeight: 'bold',
				color:'white'
			},
			};
	};
	render() {
		return(
			<ScrollView style={styles.container}>
				<View style={styles.subcontainer}>
					<View style={styles.topContainer}>
						<Image style={styles.confirmationLogo}source={require("../../assets/icon/confirmation.png")}/>
						<Text style={styles.confirmationText}> Votre événement a bien été enregistré et envoyé à votre Mairie </Text>
					</View>
					<Text style={styles.normalText}>
						Retrouvez et gérez l'ensemble de vos événements sur la page Historique de votre application
					</Text>
					<TouchableHighlight
						onPress={() => this.props.navigation.navigate('History')}
						>
						<View style={styles.buttonBackground}>
							<Text
								style={{ color: 'white', fontWeight: 'bold' }}
							>
								Retounez au menu
							</Text>
						</View>
					</TouchableHighlight>
				</View>
			</ScrollView>
		);
	}
}


const styles = StyleSheet.create({
	container:{
		flexDirection : 'column',
	},

	confirmationLogo:{
		marginTop: 30,
		marginBottom :30
	},

	confirmationText:{
		fontSize : 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 30,
		paddingLeft: 40,
		paddingRight : 40,
	},
	subcontainer:{
		alignItems: 'center',
		justifyContent:'center',
		width: '100%',
	},

	normalText:{
		textAlign: 'center',
		marginTop:30,
		paddingLeft: 40,
		paddingRight : 40
	},

	buttonBackground : {
		backgroundColor: '#01A85B',
		width: 150,
		height: 40,
		marginTop : 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius:40
	},
	topContainer:{
		width:"100%",
		backgroundColor: '#F0F0F0',
		alignItems: 'center'

	},

})

export default EventConfirmation
