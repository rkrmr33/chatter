'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.sendMessage = exports.quitChat = exports.enterChat = exports.login = exports.createAccount = exports.checkUsername = exports.fetchAllChats = exports.fetchChat = exports.fetchMessages = exports.fetchColor = exports.apiUrl = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = exports.apiUrl = '0.0.0.0';

// Handle bad requests and gives info to user
var handleBadFetchStatus = function handleBadFetchStatus(error, requestPath, respondWith) {
	if (error) {
		console.log('[-] Bad request to:\'' + requestPath + '\'. the response was:' + error);
		console.log('[-] ' + respondWith);
		return false;
	}
	return true;
};

// USED FOR GENERATION A NEW RANDOM COLOR FOR A NEW USER SPECIAL_COLOR
var fetchColor = exports.fetchColor = function fetchColor() {
	return _axios2.default.get(apiUrl + '/api/color').then(function (res) {
		return res.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/color', 'Somthing went wrong with the fetch color request');
	});
};

// FETCHING MESSAGES FOR CHAT_ID FROM THE API
var fetchMessages = exports.fetchMessages = function fetchMessages(chatId) {
	return _axios2.default.get(apiUrl + '/api/messages/' + chatId).then(function (res) {
		return res.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/messages/' + chatId, 'Somthing went wrong with the fetch messages request');
	});
};

// FETCHIING A CHAT OBJECT FROM THE API
var fetchChat = exports.fetchChat = function fetchChat(chatName) {
	return _axios2.default.get(apiUrl + '/api/chats/' + chatName).then(function (res) {
		return res.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + 'api/chats/' + chatName, 'Somthing went wrong with the fetch chat object request');
	});
};

var fetchAllChats = exports.fetchAllChats = function fetchAllChats() {
	return _axios2.default.get(apiUrl + '/api/chats/').then(function (res) {
		return res.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/chats/', 'Somthing went wrong with the fetch all chats request');
	});
};

var checkUsername = exports.checkUsername = function checkUsername(username) {
	return _axios2.default.get(apiUrl + '/api/users/check/' + username).then(function (res) {
		return res.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + 'api/users/check/' + username, 'Somthing went wrong with the check username availability request');
	});
};

var createAccount = exports.createAccount = function createAccount(accountDetails) {
	return fetchColor().then(function (specialColor) {
		accountDetails['specialColor'] = specialColor;
		return _axios2.default.post(apiUrl + '/api/users/create', accountDetails).then(function (result) {
			return result.data;
		}).catch(function (err) {
			return handleBadFetchStatus(err, 'api/users/create/' + accountDetails, 'Somthing went wrong with account creation request');
		});
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/color', 'Somthing went wrong with color fetch request');
	});
};

var login = exports.login = function login(account) {
	return _axios2.default.post(apiUrl + '/api/users/login', account).then(function (result) {
		return result.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/users/login/' + account.username + '-' + account.password, 'Somthing went wrong with user login request');
	});
};

var enterChat = exports.enterChat = function enterChat(username, _id) {
	return _axios2.default.post(apiUrl + '/api/chats/enter', { username: username, _id: _id }).then(function (result) {
		return result.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/chats/enter/' + username + '-' + _id, 'Somthing went wrong with user enter chat request');
	});
};

var quitChat = exports.quitChat = function quitChat(username, _id) {
	return _axios2.default.post(apiUrl + '/api/chats/quit', { username: username, _id: _id }).then(function (result) {
		return result.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/chats/quit/' + username + '-' + _id, 'Somthing went wrong with user quit chat request');
	});
};

var sendMessage = exports.sendMessage = function sendMessage(message) {
	return _axios2.default.post(apiUrl + '/api/messages/send', message).then(function (result) {
		return result.data;
	}).catch(function (err) {
		return handleBadFetchStatus(err, apiUrl + '/api/messages/send/' + JSON.stringify(message), 'Somthing went wrong with message send request');
	});
};