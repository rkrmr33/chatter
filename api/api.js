'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//CONNECT TO DB
var mdb = void 0;
console.log(_config2.default.dbUri);
_mongodb.MongoClient.connect(_config2.default.dbUri, { useNewUrlParser: true }, function (err, client) {
	_assert2.default.equal(null, err);
	mdb = client.db('heroku_rwfpp10l');
});

var newMessage = new _events.EventEmitter().setMaxListeners(10000);

// GET SPECIAL HEX COLOR FOR NEW USER ON REGISTRATION
router.get('/color', function (req, res) {
	_axios2.default.get(_config2.default.randomColorUrl).then(function (resp) {
		if (resp.status === 200) res.send(resp.data.colors[0].hex);
	}).catch(function (err) {
		if (err) console.error(err);
	});
});

//GET ALL CHATS
router.get('/chats/', function (req, res) {
	var chats = {};
	mdb.collection('chats').find({}).toArray(function (err, chatsArray) {
		_assert2.default.equal(null, err);
		_assert2.default.notEqual(chatsArray.length, 0);

		chatsArray.forEach(function (chat) {
			chats[chat._id] = chat;
		});
		res.send(chats);
		return;
	});
});

//GET CHAT OF CHAT_NAME
router.get('/chats/:chatName', function (req, res) {
	mdb.collection('chats').findOne({ chatName: req.params.chatName }).then(function (result) {
		res.send(result);
	}).catch(function (err) {
		console.error(err);
	});
});

// GET MESSAGES OF CHAT_ID
router.get('/messages/:chatId', function (req, res) {

	var chatId = void 0;
	try {
		chatId = (0, _mongodb.ObjectID)(req.params.chatId);
	} catch (e) {
		console.log('[-] Tried to load ObjectId with:' + req.params.chatId);
		res.send({});
		return;
	}

	mdb.collection('messages').find({ chatId: (0, _mongodb.ObjectID)(chatId) }).toArray(function (err, messages) {
		_assert2.default.equal(null, err);

		try {
			_assert2.default.notEqual(messages.length, 0);
		} catch (e) {
			// There are no messages on this chat, returns empty messages array
			res.send([]);
			return;
		}

		res.send(messages);
		return;
	});
});

// GET ALL REGISTERED USERS
router.get('/users/', function (req, res) {
	var users = {};
	mdb.collection('users').find({}).toArray(function (err, usersArrat) {
		_assert2.default.equal(null, err);
		_assert2.default.notEqual(usersArrat.length, 0);

		usersArrat.forEach(function (user) {
			users[user._id] = user;
		});
		res.send(users);
		return;
	});
});

// CHECK THE AVAILABILITY OF A USERNAME. TRUE IF AVAILABLE, FALSE IF TAKEN
router.get('/users/check/:username', function (req, res) {
	mdb.collection('users').findOne({ username: req.params.username.toString() }, { projection: { _id: 1 } }).then(function (result) {
		if (result) res.send(false);else res.send(true);
	}).catch(function (e) {
		console.error(e);
		res.status(404).send('Somthing went wrong');
	});
});

// FIRST CHECKS IF THE USERNAME IS TAKEN, IF FREE, INSERTS A NEW USER
router.post('/users/create', function (req, res) {
	var user = req.body;

	if (user) {
		mdb.collection('users').findOne({ username: user.username }, { projection: { _id: 1 } }).then(function (userTaken) {
			if (!userTaken) {
				mdb.collection('users').insertOne(user).then(function (result) {
					if (JSON.parse(result).ok === 1) {
						console.log(user);
						user['_id'] = result.insertedId;

						res.send({ status: 'account created', user: user });
					} else res.send(result);
				}).catch(function (e) {
					console.error(e);
					res.status(404).send('Somthing went wrong');
				});
			} else {
				console.log('taken');
				res.send({ status: 'username taken' });
			}
		}).catch(function (e) {
			console.error(e);
			res.status(404).send('Somthing went wrong');
		});
	}
});

router.get('/users/delete/:username', function (req, res) {});

router.post('/users/login', function (req, res) {
	var userRequest = req.body;
	mdb.collection('users').findOne({ username: userRequest.username, password: userRequest.password }).then(function (user) {
		if (user) res.send(user);else res.send(null);
	}).catch(function (e) {
		console.error(e);
		res.status(404).send('Somthing went wrong');
	});
});

router.post('/chats/enter', function (req, res) {
	var username = req.body.username;
	var chatId = req.body._id;

	mdb.collection('chats').findOneAndUpdate({ _id: (0, _mongodb.ObjectID)(chatId) }, { $push: { users: username } }).then(function (result) {
		if (result && result.ok && result.ok == 1) res.send(result);else res.send(null);
	}).catch(function (e) {
		console.error(e);
		res.status(404).send('Somthing went wrong');
	});
});

router.post('/chats/quit', function (req, res) {
	var username = req.body.username;
	var chatId = req.body._id;

	mdb.collection('chats').findOneAndUpdate({ _id: (0, _mongodb.ObjectID)(chatId) }, { $pull: { users: username } }).then(function (result) {
		if (result && result.ok && result.ok == 1) res.send(result);else res.send(null);
	}).catch(function (e) {
		console.error(e);
		res.status(404).send('Somthing went wrong');
	});
});

router.post('/messages/send', function (req, res) {
	var message = req.body;
	message['chatId'] = (0, _mongodb.ObjectID)(message.chatId);
	mdb.collection('messages').insertOne(message).then(function (result) {
		if (result.ops && result.ops[0]) {
			newMessage.emit('new-message', result.ops[0]);
			res.send(result.ops[0]);
		} else res.send(null);
	}).catch(function (e) {
		console.error(e);
		res.status(404).send('Somthing went wrong');
	});
});

router.get('/messages/stream/:chatId', function (req, res) {
	res.writeHead(200, {
		Connection: 'keep-alive',
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Access-Control-Allow-Origin': '*'
	});

	newMessage.addListener('new-message', function (msg) {
		res.write('data: ' + JSON.stringify(msg));
		res.write('\n\n');
	});
});

exports.default = router;