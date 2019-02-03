'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ChatPreview = require('./ChatPreview');

var _ChatPreview2 = _interopRequireDefault(_ChatPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatList = function ChatList(_ref) {
	var onChatClick = _ref.onChatClick,
	    chatRooms = _ref.chatRooms;
	return _react2.default.createElement(
		'div',
		{ className: 'ui celled list nine wide column', id: 'mainDiv' },
		Object.keys(chatRooms).map(function (chat) {
			return _react2.default.createElement(_ChatPreview2.default, _extends({ key: chat, onChatClick: onChatClick }, chatRooms[chat]));
		})
	);
};

ChatList.propTypes = {
	onChatClick: _propTypes2.default.func.isRequired,
	chatRooms: _propTypes2.default.object
};

exports.default = ChatList;