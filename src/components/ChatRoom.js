import React from 'react';
import propTypes from 'prop-types';

import * as utils from '../util';
import Message from './Message';

class ChatRoom extends React.Component {

	constructor(props) { 
		super(props);
		
		this.state = {
			messages: this.props.messages,
			users: this.props.users
		}

		this.messagesStream = null;
	}
	
	componentDidMount() {
		if(this.props.user) {
			this.addUserToChatroom(this.props.user);
		}

		this.messagesStream = new EventSource(`${utils.apiUrl}/api/messages/stream/${this.props._id}`);

		this.messagesStream.onmessage = msg => this.updateMessages(JSON.parse(msg.data));

		this.goDown();
	}

	componentDidUpdate() {
		this.goDown();
	}

	componentWillUnmount() {
		const user = this.props.user;
		if(user && this.props.users.includes(user.username)) {
			utils.quitChat(user.username, this.props._id);
		}

		window.addEventListener("beforeunload", (ev) => 
		{  
			ev.preventDefault();
			return ev.returnValue = 'Are you sure you want to close?';
		});

		// close connection with the server
		this.messagesStream.close();
	}

	updateMessages = (newMessage) => {
		let messages = this.state.messages;
		messages.push(newMessage);
		this.setState({messages});
	};


	loadMessages() {
		if(!this.state.messages || this.state.messages.length == 0) {
			return (<Message 
				{...{
					_id: '1234567890',
					chatId: this.props._id,
					user: { username: 'Chatter Bot', specialColor:'#be28d2'},
					body: 'There are no messages on this chat yet... C\'mon! Be the first to send a message! ; )',
					timestamp: new Date().toString()
				}}
				/>);
			}
			else {
				const messagesMarkup = this.state.messages.map(m => <Message key={m._id} {...m}/>);
				return messagesMarkup;
			}
		}


	

	addUserToChatroom = (user) => {
		if(!this.state.users.includes(user.username)) {
			utils.enterChat(user.username, this.props._id);
			this.setState({
				users: this.state.users.push(user.username)
			});
		}
	}

	sendMessage = (e) => {
		e.preventDefault();

		const text = document.getElementById('messageText');

		if(text.value !== '') {
			let messages = this.state.messages;
			const message = {
				chatId: this.props._id,
				user: {
					username: this.props.user.username,
					specialColor: this.props.user.specialColor
				},
				body: text.value,
				timestamp: new Date()
			};

			utils.sendMessage(message)
				.then(result => {
					if(result) {
						text.value = '';
					}
				});
		}
	}

	usersOnly = () => {
		if(this.props.user) {
			return (
				<div className="ui action input" id="input-segment">
					<input id="messageText" type="text" autoFocus="on"/>
					<button type="submit" id="sendButton" className="ui blue button">Send</button>
				</div>);
		}
		else {
			return (
				<div className="ui action input" id="input-segment">
					<div className="ui message center aligned" id="needUser">
						You need a <b className="chatter-color">Chatter</b> account to send messages in chatrooms.
						You can <a id="link" onClick={this.props.goToRegistration}>sign up</a> now.
						Or, if you already have an account <a id="link" onClick={this.props.goToLogin}>log in</a> here.
					</div>
				</div>);
		}
	}

	goDown = () => {
		this.scrollDown.scrollIntoView({behavior: 'smooth'});
	}

	render() {
		return (
			<div className="eleven wide column chatroom-container">
				<form onSubmit={this.sendMessage}>
					<div className="chatFlex">
						<div id="chat-header-container" className="ui top attached purple segment">
							<div>
								<img src={this.props.chatImage} id="true-circle" className="ui circular image" />
								<h3>
									{this.props.chatName}
								</h3>
								<p><i className="certificate icon chatter-color"></i><b>{this.props.chatOwner}</b></p>
							</div>
							<div className="messagesCount">{this.state.messages.length} <i className="envelope icon"></i></div>
							<div className="inChatUsersCount">{this.state.users.length} <i className="user icon"></i></div>
						</div>

						<div className="chat-area" id="scroll">
							<div className="ui celled list" id="messages-list">
								{ this.loadMessages() }
							</div>
							<div style={{float:'left', clear:'both'}} ref={ sd => { this.scrollDown = sd; } }></div>
						</div>
						
						{ this.usersOnly() }
						
					</div>
				</form>
			</div>
		);
	}
}

ChatRoom.propTypes = {
	_id: propTypes.string.isRequired,
	chatOwner: propTypes.string.isRequired,
	chatName: propTypes.string.isRequired,
	chatDescription: propTypes.string.isRequired,
	chatImage: propTypes.string,
	users: propTypes.array.isRequired,
	messages: propTypes.array.isRequired,
	user: propTypes.object,
	goToLogin: propTypes.func.isRequired,
	goToRegistration: propTypes.func.isRequired,
};

export default ChatRoom;