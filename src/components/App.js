import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import * as utils from '../util';
import Header from './Header';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import Registration from './Registration';
import Login from './Login';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			chatRooms: props.__INITIAL_DATA__.chatRooms,
			currentChat: props.__INITIAL_DATA__.currentChat,
			messages: props.__INITIAL_DATA__.messages,
			show: props.__INITIAL_DATA__.show
		};
	}

	componentDidMount() {

		// check if return login
		try {
			const username = localStorage.getItem('username');
			const password = localStorage.getItem('password');
			if(username && password) {
				utils.login({username, password})
				.then(result => {
					if (result)
						this.setState({user: result});
				})
				.catch(e => {console.log(e); })
			}
		} catch(e) { throw e; }
	
		// determain initial status and push it to the history state
		if(this.state.show === 'ChatRoom') { // loaded on a chat page
			history.replaceState(this.state, this.state.currentChat.chatName, `/c/${this.state.currentChat.chatName}`);
		}
		else if(this.state.show === 'ChatList'){ // loaded on the main chatter page
			history.replaceState(this.state, 'Chatter', `/`);
		}
		else if(this.state.show === 'Registration'){ // loaded on the main chatter page
			history.replaceState(this.state, 'Registration', `/create_account`);
		}
		else if(this.state.show === 'Login'){ // loaded on the main chatter page
			history.replaceState(this.state, 'Login', `/login`);
		}
		else { // no initial data at all, somthing went wrong
			console.log(`[-] Something went wrong, the initial data is: ${this.props.__INITIAL_DATA__}`);
		}

		// removes the unneeded initial data variable from the global object
		delete window.__INITIAL_DATA__;

		// handle popstate event
		window.addEventListener('popstate', e => {
			this.setState(e.state);
		});
	}
	
	renewChatList = () => {
		// if we have an old chatRooms list and we want to update it with new data
		utils.fetchAllChats().then(chatRooms => {
			const state = {chatRooms, currentChat: null, messages: null, show: 'ChatList'};
			history.pushState(state, 'Chatter', '/');
			this.setState(state);
		});
	};
	
	loadMain = () => {
		// already have a chat list on the state
		if(this.state.chatRooms) {
			// prepare state object
			const state = {chatRooms: this.state.chatRooms, currentChat: null, messages: null, show: 'ChatList'};
			// push a new state to the history object
			history.pushState(state, 'Chatter', '/');
			// set the new state of the app
			this.setState(state, this.renewChatList());
		}
		else { // needs to fetch the chat list from the api and do the same as above
			utils.fetchAllChats().then(chatRooms => {
				const state = {chatRooms, currentChat: null, messages: null, show: 'ChatList'};
				history.pushState(state, 'Chatter', '/');
				this.setState(state);
			});
		}
	};
	
	loadChat = (chatId) => {

		if (this.state.chatRooms && this.state.chatRooms[chatId]) {
			const currentChat = this.state.chatRooms[chatId];
			// need to fetch messages for chatId
			utils.fetchMessages(currentChat._id).then(messages => {
				// fetched messages, now push state to history object and app state obj
				const state = {chatRooms: this.state.chatRooms, currentChat, messages, show: 'ChatRoom'};
				history.pushState(state, currentChat.chatName, `/c/${currentChat.chatName}`);
				this.setState(state);
			});
		}
		else {
			console.log('[-] Somthing is wrong with the state, need to load chat menualy');
		}
	};

	loadRegistration = () => {
		const state = {chatRooms: this.state.chatRooms, currentChat: null, messages: null, show: 'Registration'};
		history.pushState(state, 'Registration', '/create_account');
		this.setState(state);
	};

	loadLogin = () => {
		const state = {chatRooms: this.state.chatRooms, currentChat: null, messages: null, show: 'Login'};
		history.pushState(state, 'Login', '/login');
		this.setState(state);
	};

	login = (user) => {
		return utils.login(user)
			.then(result => {
				if(result) {
					this.setState({user: result});
					localStorage.setItem('username', result.username);
					localStorage.setItem('password', result.password);
					this.loadMain(); 
					return 'logged in';
				}
				else
					return 'wrong combination';
			})
			.catch(e => {
				console.error(e);
				return 'server error';
			});
	};

	logout = () => {
		this.setState({user: null});
		localStorage.removeItem('username');
		localStorage.removeItem('password');
		this.loadMain();
	};

	currentContent = () => {
		if(this.state.show === 'ChatRoom') {
			return (<ChatRoom 
				{...this.state.currentChat}
				messages={this.state.messages}
				user={this.state.user}
				goToLogin={this.loadLogin}
				goToRegistration={this.loadRegistration}
				/>);	
		}
		else if(this.state.show === 'Registration') {
			return (<Registration login={this.login.bind(this)} goToLogin={this.loadLogin}/>);
		}
		else if(this.state.show === 'Login') {
			return (<Login login={this.login.bind(this)} goToRegistration={this.loadRegistration}/>);
		}
		else if(this.state.show === 'ChatList') {
			return (<ChatList 
				onChatClick={ this.loadChat }
				chatRooms={ this.state.chatRooms } />);
		}
		else {
			return 'Somthing bad happened!';
		}
	}

	render() {
		return (
			<div id="flexer" className="ui grid">
				<Header 
				goToChatter={this.loadMain}
				goToRegistration={this.loadRegistration}
				goToLogin={this.loadLogin}
				user={this.state.user}
				logout={this.logout}/>
				{ this.currentContent() }
			</div>
		);
	}
}

App.propTypes = {
	__INITIAL_DATA__: propTypes.object.isRequired
};

export default App;