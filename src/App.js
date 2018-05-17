import React, { Component } from 'react'; 
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection, Card } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyC9SwmFF9YLbbuQyksB0qgYZd-V0AHv4gc',
			authDomain: 'auth-37ac9.firebaseapp.com',
			databaseURL: 'https://auth-37ac9.firebaseio.com',
			projectId: 'auth-37ac9',
			storageBucket: 'auth-37ac9.appspot.com',
			messagingSenderId: '22052436500'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Card>
						<CardSection>
							<Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
						</CardSection>
					</Card>
				);
			case false:
				return <LoginForm />;
			default:
				return (
					<Card>
						<CardSection>
							<Spinner size='large' />
						</CardSection>
					</Card>
				);
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication App" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
