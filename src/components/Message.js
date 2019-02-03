import React from 'react';
import propTypes from 'prop-types';

class Message extends React.Component {
	render() {
		return (
			<div className="item">
				<img src="/assets/chatter-icon.ico" className="ui avatar image"/>
				<div className="content">
					<div className="metadata">
						<div className="ui horizontal label" style={{backgroundColor: this.props.user.specialColor, color: 'white'}}>{this.props.user.username}</div>
						{new Date(this.props.timestamp).toLocaleTimeString()}
					</div>
					{this.props.body}
				</div>
			</div>);
	}	
}

Message.propTypes = {
	_id: propTypes.string.isRequired,
	chatId: propTypes.string.isRequired,
	user: propTypes.object.isRequired,
	body: propTypes.string.isRequired,
	timestamp: propTypes.string.isRequired
};

export default Message;