'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

var utils = _interopRequireWildcard(_util);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatRoom = function (_React$Component) {
	_inherits(ChatRoom, _React$Component);

	function ChatRoom(props) {
		_classCallCheck(this, ChatRoom);

		var _this = _possibleConstructorReturn(this, (ChatRoom.__proto__ || Object.getPrototypeOf(ChatRoom)).call(this, props));

		_this.updateMessages = function (newMessage) {
			var messages = _this.state.messages;
			messages.push(newMessage);
			_this.setState({ messages: messages });
		};

		_this.addUserToChatroom = function (user) {
			if (!_this.state.users.includes(user.username)) {
				utils.enterChat(user.username, _this.props._id);
				_this.setState({
					users: _this.state.users.push(user.username)
				});
			}
		};

		_this.sendMessage = function (e) {
			e.preventDefault();

			var text = document.getElementById('messageText');

			if (text.value !== '') {
				var messages = _this.state.messages;
				var message = {
					chatId: _this.props._id,
					user: {
						username: _this.props.user.username,
						specialColor: _this.props.user.specialColor
					},
					body: text.value,
					timestamp: new Date()
				};

				utils.sendMessage(message).then(function (result) {
					if (result) {
						text.value = '';
					}
				});
			}
		};

		_this.usersOnly = function () {
			if (_this.props.user) {
				return _react2.default.createElement(
					'div',
					{ className: 'ui action input', id: 'input-segment' },
					_react2.default.createElement('input', { id: 'messageText', type: 'text', autoFocus: 'on' }),
					_react2.default.createElement(
						'button',
						{ type: 'submit', id: 'sendButton', className: 'ui blue button' },
						'Send'
					)
				);
			} else {
				return _react2.default.createElement(
					'div',
					{ className: 'ui action input', id: 'input-segment' },
					_react2.default.createElement(
						'div',
						{ className: 'ui message center aligned', id: 'needUser' },
						'You need a ',
						_react2.default.createElement(
							'b',
							{ className: 'chatter-color' },
							'Chatter'
						),
						' account to send messages in chatrooms. You can ',
						_react2.default.createElement(
							'a',
							{ id: 'link', onClick: _this.props.goToRegistration },
							'sign up'
						),
						' now. Or, if you already have an account ',
						_react2.default.createElement(
							'a',
							{ id: 'link', onClick: _this.props.goToLogin },
							'log in'
						),
						' here.'
					)
				);
			}
		};

		_this.goDown = function () {
			_this.scrollDown.scrollIntoView({ behavior: 'smooth' });
		};

		_this.state = {
			messages: _this.props.messages,
			users: _this.props.users
		};

		_this.messagesStream = null;
		return _this;
	}

	_createClass(ChatRoom, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			if (this.props.user) {
				this.addUserToChatroom(this.props.user);
			}

			this.messagesStream = new EventSource(utils.apiUrl + '/api/messages/stream/' + this.props._id);

			this.messagesStream.onmessage = function (msg) {
				return _this2.updateMessages(JSON.parse(msg.data));
			};

			this.goDown();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.goDown();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var user = this.props.user;
			if (user && this.props.users.includes(user.username)) {
				utils.quitChat(user.username, this.props._id);
			}

			window.addEventListener('beforeunload', function (ev) {
				ev.preventDefault();
				return ev.returnValue = 'Are you sure you want to close?';
			});

			// close connection with the server
			this.messagesStream.close();
		}
	}, {
		key: 'loadMessages',
		value: function loadMessages() {
			if (!this.state.messages || this.state.messages.length == 0) {
				return _react2.default.createElement(_Message2.default, {
					_id: '1234567890',
					chatId: this.props._id,
					user: { username: 'Chatter Bot', specialColor: '#be28d2' },
					body: 'There are no messages on this chat yet... C\'mon! Be the first to send a message! ; )',
					timestamp: new Date().toString()
				});
			} else {
				var messagesMarkup = this.state.messages.map(function (m) {
					return _react2.default.createElement(_Message2.default, _extends({ key: m._id }, m));
				});
				return messagesMarkup;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'eleven wide column chatroom-container' },
				_react2.default.createElement(
					'form',
					{ onSubmit: this.sendMessage },
					_react2.default.createElement(
						'div',
						{ className: 'chatFlex' },
						_react2.default.createElement(
							'div',
							{ id: 'chat-header-container', className: 'ui top attached purple segment' },
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement('img', { src: this.props.chatImage, id: 'true-circle', className: 'ui circular image' }),
								_react2.default.createElement(
									'h3',
									null,
									this.props.chatName
								),
								_react2.default.createElement(
									'p',
									null,
									_react2.default.createElement('i', { className: 'certificate icon chatter-color' }),
									_react2.default.createElement(
										'b',
										null,
										this.props.chatOwner
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'messagesCount' },
								this.state.messages.length,
								' ',
								_react2.default.createElement('i', { className: 'envelope icon' })
							),
							_react2.default.createElement(
								'div',
								{ className: 'inChatUsersCount' },
								this.state.users.length,
								' ',
								_react2.default.createElement('i', { className: 'user icon' })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'chat-area', id: 'scroll' },
							_react2.default.createElement(
								'div',
								{ className: 'ui celled list', id: 'messages-list' },
								this.loadMessages()
							),
							_react2.default.createElement('div', { style: { float: 'left', clear: 'both' }, ref: function ref(sd) {
								_this3.scrollDown = sd;
							} })
						),
						this.usersOnly()
					)
				)
			);
		}
	}]);

	return ChatRoom;
}(_react2.default.Component);

ChatRoom.propTypes = {
	_id: _propTypes2.default.string.isRequired,
	chatOwner: _propTypes2.default.string.isRequired,
	chatName: _propTypes2.default.string.isRequired,
	chatDescription: _propTypes2.default.string.isRequired,
	chatImage: _propTypes2.default.string,
	users: _propTypes2.default.array.isRequired,
	messages: _propTypes2.default.array.isRequired,
	user: _propTypes2.default.object,
	goToLogin: _propTypes2.default.func.isRequired,
	goToRegistration: _propTypes2.default.func.isRequired
};

exports.default = ChatRoom;