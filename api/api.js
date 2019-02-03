import axios from 'axios';
import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import bodyParser from 'body-parser';
import config from '../config';
import { EventEmitter } from 'events';

const router = express.Router();


//CONNECT TO DB
let mdb;
MongoClient.connect(config.dbUri, {useNewUrlParser: true}, (err, client) => {
	assert.equal(null, err);
	mdb = client.db('test');
});

let newMessage = new EventEmitter().setMaxListeners(10000);

// GET SPECIAL HEX COLOR FOR NEW USER ON REGISTRATION
router.get('/color', (req, res) => {
	axios.get(config.randomColorUrl).then((resp) => {
		if (resp.status === 200)
			res.send(resp.data.colors[0].hex);
	}).catch((err) => {
		if (err) console.error(err);
	});
});


//GET ALL CHATS
router.get('/chats/', (req, res) => {
	let chats = {};
	mdb.collection('chats').find({})
		.toArray((err, chatsArray) => {
			assert.equal(null, err);
			assert.notEqual(chatsArray.length, 0);

			chatsArray.forEach((chat) => {
				chats[chat._id] = chat;
			});
			res.send(chats);
			return;
		});
});


//GET CHAT OF CHAT_NAME
router.get('/chats/:chatName', (req, res) => {
	mdb.collection('chats').findOne({chatName: req.params.chatName})
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.error(err);
		});
});


// GET MESSAGES OF CHAT_ID
router.get('/messages/:chatId', (req, res) => {
	
	let chatId;
	try {
		chatId = ObjectID(req.params.chatId);
	}catch(e) { 
		console.log(`[-] Tried to load ObjectId with:${req.params.chatId}`);
		res.send({});
		return;
	}

	mdb.collection('messages').find({chatId: ObjectID(chatId)})
		.toArray((err, messages) => {
			assert.equal(null, err);

			try {
				assert.notEqual(messages.length, 0);
			}catch(e) {
				// There are no messages on this chat, returns empty messages array
				res.send([]);
				return;
			}

			res.send(messages);
			return;
		});
});

// GET ALL REGISTERED USERS
router.get('/users/', (req, res) => {
	let users = {};
	mdb.collection('users').find({})
		.toArray((err, usersArrat) => {
			assert.equal(null, err);
			assert.notEqual(usersArrat.length, 0);

			usersArrat.forEach((user) => {
				users[user._id] = user;
			});
			res.send(users);
			return;
		});
});

// CHECK THE AVAILABILITY OF A USERNAME. TRUE IF AVAILABLE, FALSE IF TAKEN
router.get('/users/check/:username', (req, res) => {
	mdb.collection('users').findOne({username: req.params.username.toString()}, {projection: {_id:1}})
		.then(result => {
			if(result)
				res.send(false);
			else
				res.send(true);
		})
		.catch(e => {
			console.error(e);
			res.status(404).send('Somthing went wrong');
		});
});

// FIRST CHECKS IF THE USERNAME IS TAKEN, IF FREE, INSERTS A NEW USER
router.post('/users/create', (req, res) => {
	let user = req.body;

	if(user) {
		mdb.collection('users').findOne({username: user.username}, {projection: {_id:1}})
			.then(userTaken => {
				if(!userTaken) {
					mdb.collection('users').insertOne(user)
						.then(result => {
							if(JSON.parse(result).ok === 1){
								console.log(user);
								user['_id'] = result.insertedId;
								
								res.send({ status: 'account created', user});
							}
							else
								res.send(result);
						})
						.catch(e => {
							console.error(e);
							res.status(404).send('Somthing went wrong');
						});
				}
				else {
					console.log('taken');
					res.send({status: 'username taken'});
				}
			})
			.catch(e => {
				console.error(e);
				res.status(404).send('Somthing went wrong');
			});
	}
});

router.get('/users/delete/:username', (req, res) => {
	
});

router.post('/users/login', (req, res) => {
	const userRequest = req.body;
	mdb.collection('users').findOne({username: userRequest.username, password: userRequest.password})
		.then(user => {
			if(user)
				res.send(user);
			else
				res.send(null);
		})
		.catch(e => {
			console.error(e);
			res.status(404).send('Somthing went wrong');
		});
});

router.post('/chats/enter', (req, res) => {
	const username = req.body.username;
	const chatId = req.body._id;

	mdb.collection('chats').findOneAndUpdate(
		{ _id: ObjectID(chatId)	},
		{ $push: { users: username } }
	).then(result => {
		if(result && result.ok && result.ok == 1)
			res.send(result);
		else
			res.send(null);
	})
		.catch(e => {
			console.error(e);
			res.status(404).send('Somthing went wrong');
		});
});

router.post('/chats/quit', (req, res) => {
	const username = req.body.username;
	const chatId = req.body._id;

	mdb.collection('chats').findOneAndUpdate(
		{ _id: ObjectID(chatId)	},
		{ $pull: { users: username } }
	).then(result => {
		if(result && result.ok && result.ok == 1)
			res.send(result);
		else
			res.send(null);
	})
		.catch(e => {
			console.error(e);
			res.status(404).send('Somthing went wrong');
		});
});

router.post('/messages/send', (req, res) => {
	const message = req.body;
	message['chatId'] = ObjectID(message.chatId);
	mdb.collection('messages').insertOne(message)
		.then(result => {
			if(result.ops && result.ops[0]) {
				newMessage.emit('new-message', result.ops[0]);
				res.send(result.ops[0]);
			}
			else
				res.send(null);
		})
		.catch(e => {
			console.error(e);
			res.status(404).send('Somthing went wrong');
		});
});

router.get('/messages/stream/:chatId', (req, res) => {
	res.writeHead(200, {
		Connection: 'keep-alive',
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Access-Control-Allow-Origin': '*'
	});

	newMessage.addListener('new-message', (msg) => {
		res.write(`data: ${JSON.stringify(msg)}`);
		res.write('\n\n');
	});
});

export default router;