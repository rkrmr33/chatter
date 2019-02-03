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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _App = require('./src/components/App');

var _App2 = _interopRequireDefault(_App);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverRender = function serverRender(url) {
	// preform analysis of the url and server render

	var match = routes.find(function (route) {
		return (0, _reactRouterDom.matchPath)(url, route);
	});
	return match.dataFetcher(url);
};

// Handle route '/'
var fetchMainPageData = function fetchMainPageData(path) {

	return _axios2.default.get(_config2.default.serverUrl + '/api/chats/').then(function (response) {
		if (handleBadFetchStatus(response, _config2.default.serverUrl + '/api/chats/', 'oops!')) return;

		var chatRooms = response.data;

		var __INITIAL_DATA__ = {
			chatRooms: chatRooms,
			currentChat: null,
			messages: null,
			show: 'ChatList'
		};

		return {
			initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
			__INITIAL_DATA__: __INITIAL_DATA__
		};
	}).catch(function (e) {
		console.log(e);
	});
};

// Handle route '/c/:chatName'
var fetchChatPageData = function fetchChatPageData(path) {

	var chatName = path.split('/').pop();

	// Bad path
	if (!chatName) {
		console.log('[-] The user tried to go to:\'' + path + '\', but the chat name is problematique..');
		return;
	}

	return _axios2.default.get(_config2.default.serverUrl + '/api/chats/' + chatName).then(function (response) {
		if (handleBadFetchStatus(response, _config2.default.serverUrl + '/api/chats/' + chatName, 'wat?!')) return;

		var chat = response.data;

		return _axios2.default.get(_config2.default.serverUrl + '/api/messages/' + chat._id).then(function (resp) {
			if (handleBadFetchStatus(resp, _config2.default.serverUrl + '/api/messages/' + chat._id, 'noooo!')) return;

			var messages = resp.data;

			var __INITIAL_DATA__ = {
				chatRooms: null,
				currentChat: chat,
				messages: messages,
				show: 'ChatRoom'
			};

			return {
				initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
				__INITIAL_DATA__: __INITIAL_DATA__
			};
		}).catch(function (e) {
			return console.log(e);
		});
	}).catch(function (e) {
		return console.log(e);
	});
};

// Handle route '/create_account'
var fetchRegistrationPageData = function fetchRegistrationPageData(path) {
	return new Promise(function (resolve, reject) {
		var __INITIAL_DATA__ = {
			chatRooms: null,
			currentChat: null,
			messages: null,
			show: 'Registration'
		};

		resolve({
			initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
			__INITIAL_DATA__: __INITIAL_DATA__
		});
	});
};

// Handle route '/login'
var fetchLoginPageData = function fetchLoginPageData(path) {
	return new Promise(function (resolve, reject) {
		var __INITIAL_DATA__ = {
			chatRooms: null,
			currentChat: null,
			messages: null,
			show: 'Login'
		};

		resolve({
			initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { __INITIAL_DATA__: __INITIAL_DATA__ })),
			__INITIAL_DATA__: __INITIAL_DATA__
		});
	});
};

var handleBadFetchStatus = function handleBadFetchStatus(response, requestPath, respondWith) {
	if (!response.status === 200) {
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