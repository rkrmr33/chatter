import React from 'react';
import propTypes from 'prop-types';
import ChatPreview from './ChatPreview';

const ChatList = ({onChatClick, chatRooms}) => (
	<div className="ui celled list nine wide column" id="mainDiv">
		{ Object.keys(chatRooms).map((chat) => {
			return <ChatPreview key={chat} onChatClick={onChatClick} {...chatRooms[chat]}/>;
		})}
	</div>
);


ChatList.propTypes = {
	onChatClick: propTypes.func.isRequired,
	chatRooms: propTypes.object,
};

export default ChatList;