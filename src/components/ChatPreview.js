import React from 'react';
import propTypes from 'prop-types';

class ChatPreview extends React.Component {
	
	handleClick = () => {
		this.props.onChatClick(this.props._id);
	};
 
	render() {
		return (
			<div className="item" onClick={this.handleClick}>
				<img className="ui avatar image chat-preview-icon" src={this.props.chatImage} />
				<div className="content">
					<div className="header"><span>{this.props.chatName}</span></div>
						{this.props.chatDescription}
				</div>
				<div className="right floated content">
					<span className="usersCount">{this.props.users.length} </span><i className="user circle icon"></i>
				</div>
			</div>
		);
	}
}

ChatPreview.propTypes = {
	_id: propTypes.string,
	chatName: propTypes.string,
	chatDescription: propTypes.string,
	chatImage: propTypes.string,
	onChatClick: propTypes.func,
	users: propTypes.array
};

export default ChatPreview;