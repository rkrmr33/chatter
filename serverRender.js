'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouterDom = require('react-router-dom');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _App = require('./src/components/App');

var _App2 = _interopRequireDefault(_App);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step('next', value); }, function (err) { step('throw', err); }); } } return step('next'); }); }; }

var serverRender = function serverRender(url) {
	// preform analysis of the url and server render

	var match = routes.find(function (route) {
		return (0, _reactRouterDom.matchPath)(url, route);
	});
	return match.dataFetcher(url);
};

// Handle route '/'
var fetchMainPageData = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
		var response, chatRooms, __INITIAL_DATA__;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return (0, _isomorphicFetch2.default)(_config2.default.serverUrl + '/api/chats/');

				case 2:
					response = _context.sent;

					if (!handleBadFetchStatus(response, _config2.default.serverUrl + '/api/chats/', 'oops!')) {
						_context.next = 5;
						break;
					}

					return _context.abrupt('return');

				case 5:
					_context.next = 7;
					return response.json();

				case 7:
					chatRooms = _context.sent;
					__INITIAL_DATA__ = {
						chatRooms: chatRooms,
						currentChat: null,
						messages: null,
						show: 'ChatList'
					};
					return _context.abrupt('return', {
						initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
						__INITIAL_DATA__: __INITIAL_DATA__
					});

				case 10:
				case 'end':
					return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function fetchMainPageData(_x) {
		return _ref.apply(this, arguments);
	};
}();

// Handle route '/c/:chatName'
var fetchChatPageData = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
		var chatName, response, chat, messages, __INITIAL_DATA__;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
				case 0:
					chatName = path.split('/').pop();

					// Bad path

					if (chatName) {
						_context2.next = 4;
						break;
					}

					console.log('[-] The user tried to go to:\'' + path + '\', but the chat name is problematique..');
					return _context2.abrupt('return');

				case 4:
					_context2.next = 6;
					return (0, _isomorphicFetch2.default)(_config2.default.serverUrl + '/api/chats/' + chatName);

				case 6:
					response = _context2.sent;

					if (!handleBadFetchStatus(response, _config2.default.serverUrl + '/api/chats/' + chatName, 'wat?!')) {
						_context2.next = 9;
						break;
					}

					return _context2.abrupt('return');

				case 9:
					_context2.next = 11;
					return response.json();

				case 11:
					chat = _context2.sent;
					_context2.next = 14;
					return (0, _isomorphicFetch2.default)(_config2.default.serverUrl + '/api/messages/' + chat._id);

				case 14:
					response = _context2.sent;

					if (!handleBadFetchStatus(response, _config2.default.serverUrl + '/api/messages/' + chat._id, 'noooo!')) {
						_context2.next = 17;
						break;
					}

					return _context2.abrupt('return');

				case 17:
					_context2.next = 19;
					return response.json();

				case 19:
					messages = _context2.sent;
					__INITIAL_DATA__ = {
						chatRooms: null,
						currentChat: chat,
						messages: messages,
						show: 'ChatRoom'
					};
					return _context2.abrupt('return', {
						initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
						__INITIAL_DATA__: __INITIAL_DATA__
					});

				case 22:
				case 'end':
					return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function fetchChatPageData(_x2) {
		return _ref2.apply(this, arguments);
	};
}();

// Handle route '/create_account'
var fetchRegistrationPageData = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(path) {
		var __INITIAL_DATA__;

		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
				case 0:
					__INITIAL_DATA__ = {
						chatRooms: null,
						currentChat: null,
						messages: null,
						show: 'Registration'
					};
					return _context3.abrupt('return', {
						initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
						__INITIAL_DATA__: __INITIAL_DATA__
					});

				case 2:
				case 'end':
					return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function fetchRegistrationPageData(_x3) {
		return _ref3.apply(this, arguments);
	};
}();

// Handle route '/login'
var fetchLoginPageData = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(path) {
		var __INITIAL_DATA__;

		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
				case 0:
					__INITIAL_DATA__ = {
						chatRooms: null,
						currentChat: null,
						messages: null,
						show: 'Login'
					};
					return _context4.abrupt('return', {
						initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
						__INITIAL_DATA__: __INITIAL_DATA__
					});

				case 2:
				case 'end':
					return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function fetchLoginPageData(_x4) {
		return _ref4.apply(this, arguments);
	};
}();

var handleBadFetchStatus = function handleBadFetchStatus(response, requestPath, respondWith) {
	if (!response.ok) {
		console.log('[-] Bad request to:\'' + requestPath + '\'. the response was:' + response.statusText);
		// give some indication to user using respondWith
		return true;
	}
	return false;
};

var routes = exports.routes = [{
	path: '/',
	exact: true,
	strict: false,
	dataFetcher: fetchMainPageData
}, {
	path: '/c/:chatName',
	exact: true,
	strict: false,
	dataFetcher: fetchChatPageData
}, {
	path: '/create_account',
	exact: true,
	strict: false,
	dataFetcher: fetchRegistrationPageData
}, {
	path: '/login',
	exact: true,
	strict: false,
	dataFetcher: fetchLoginPageData
}];

exports.default = serverRender;