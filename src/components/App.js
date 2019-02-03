'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

var utils = _interopRequireWildcard(_util);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _ChatList = require('./ChatList');

var _ChatList2 = _interopRequireDefault(_ChatList);

var _ChatRoom = require('./ChatRoom');

var _ChatRoom2 = _interopRequireDefault(_ChatRoom);

var _Registration = require('./Registration');

var _Registration2 = _interopRequireDefault(_Registration);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.renewChatList = function () {
			// if we have an old chatRooms list and we want to update it with new data
			utils.fetchAllChats().then(function (chatRooms) {
				var state = { chatRooms: chatRooms, currentChat: null, messages: null, show: 'ChatList' };
				history.pushState(state, 'Chatter', '/');
				_this.setState(state);
			});
		};

		_this.loadMain = function () {
			// already have a chat list on the state
			if (_this.state.chatRooms) {
				// prepare state object
				var state = { chatRooms: _this.state.chatRooms, currentChat: null, messages: null, show: 'ChatList' };
				// push a new state to the history object
				history.pushState(state, 'Chatter', '/');
				// set the new state of the app
				_this.setState(state, _this.renewChatList());
			} else {
				// needs to fetch the chat list from the api and do the same as above
				utils.fetchAllChats().then(function (chatRooms) {
					var state = { chatRooms: chatRooms, currentChat: null, messages: null, show: 'ChatList' };
					history.pushState(state, 'Chatter', '/');
					_this.setState(state);
				});
			}
		};

		_this.loadChat = function (chatId) {

			if (_this.state.chatRooms && _this.state.chatRooms[chatId]) {
				var currentChat = _this.state.chatRooms[chatId];
				// need to fetch messages for chatId
				utils.fetchMessages(currentChat._id).then(function (messages) {
					// fetched messages, now push state to history object and app state obj
					var state = { chatRooms: _this.state.chatRooms, currentChat: currentChat, messages: messages, show: 'ChatRoom' };
					history.pushState(state, currentChat.chatName, '/c/' + currentChat.chatName);
					_this.setState(state);
				});
			} else {
				console.log('[-] Somthing is wrong with the state, need to load chat menualy');
			}
		};

		_this.loadRegistration = function () {
			var state = { chatRooms: _this.state.chatRooms, currentChat: null, messages: null, show: 'Registration' };
			history.pushState(state, 'Registration', '/create_account');
			_this.setState(state);
		};

		_this.loadLogin = function () {
			var state = { chatRooms: _this.state.chatRooms, currentChat: null, messages: null, show: 'Login' };
			history.pushState(state, 'Login', '/login');
			_this.setState(state);
		};

		_this.login = function (user) {
			return utils.login(user).then(function (result) {
				if (result) {
					_this.setState({ user: result });
					localStorage.setItem('username', result.username);
					localStorage.setItem('password', result.password);
					_this.loadMain();
					return 'logged in';
				} else return 'wrong combination';
			}).catch(function (e) {
				console.error(e);
				return 'server error';
			});
		};

		_this.logout = function () {
			_this.setState({ user: null });
			localStorage.removeItem('username');
			localStorage.removeItem('password');
			_this.loadMain();
		};

		_this.currentContent = function () {
			if (_this.state.show === 'ChatRoom') {
				return _react2.default.createElement(_ChatRoom2.default, _extends({}, _this.state.currentChat, {
					messages: _this.state.messages,
					user: _this.state.user,
					goToLogin: _this.loadLogin,
					goToRegistration: _this.loadRegistration
				}));
			} else if (_this.state.show === 'Registration') {
				return _react2.default.createElement(_Registration2.default, { login: _this.login.bind(_this), goToLogin: _this.loadLogin });
			} else if (_this.state.show === 'Login') {
				return _react2.default.createElement(_Login2.default, { login: _this.login.bind(_this), goToRegistration: _this.loadRegistration });
			} else if (_this.state.show === 'ChatList') {
				return _react2.default.createElement(_ChatList2.default, {
					onChatClick: _this.loadChat,
					chatRooms: _this.state.chatRooms });
			} else {
				return 'Somthing bad happened!';
			}
		};

		_this.state = {
			chatRooms: props.__INITIAL_DATA__.chatRooms,
			currentChat: props.__INITIAL_DATA__.currentChat,
			messages: props.__INITIAL_DATA__.messages,
			show: props.__INITIAL_DATA__.show
		};
		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			// check if return login
			try {
				var username = localStorage.getItem('username');
				var password = localStorage.getItem('password');
				if (username && password) {
					utils.login({ username: username, password: password }).then(function (result) {
						if (result) _this2.setState({ user: result });
					}).catch(function (e) {
						console.log(e);
					});
				}
			} catch (e) {
				throw e;
			}

			// determain initial status and push it to the history state
			if (this.state.show === 'ChatRoom') {
				// loaded on a chat page
				history.replaceState(this.state, this.state.currentChat.chatName, '/c/' + this.state.currentChat.chatName);
			} else if (this.state.show === 'ChatList') {
				// loaded on the main chatter page
				history.replaceState(this.state, 'Chatter', '/');
			} else if (this.state.show === 'Registration') {
				// loaded on the main chatter page
				history.replaceState(this.state, 'Registration', '/create_account');
			} else if (this.state.show === 'Login') {
				// loaded on the main chatter page
				history.replaceState(this.state, 'Login', '/login');
			} else {
				// no initial data at all, somthing went wrong
				console.log('[-] Something went wrong, the initial data is: ' + this.props.__INITIAL_DATA__);
			}

			// removes the unneeded initial data variable from the global object
			delete window.__INITIAL_DATA__;

			// handle popstate event
			window.addEventListener('popstate', function (e) {
				_this2.setState(e.state);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'flexer', className: 'ui grid' },
				_react2.default.createElement(_Header2.default, {
					goToChatter: this.loadMain,
					goToRegistration: this.loadRegistration,
					goToLogin: this.loadLogin,
					user: this.state.user,
					logout: this.logout }),
				this.currentContent()
			);
		}
	}]);

	return App;
}(_react2.default.Component);

App.propTypes = {
	__INITIAL_DATA__: _propTypes2.default.object.isRequired
};

exports.default = App;