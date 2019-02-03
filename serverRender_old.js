import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import { matchPath } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import App from './src/components/App';
import config from './config';

const handleBadFetchStatus = (response, requestPath, respondWith) => {
	if(!response.ok) {
		console.log(`[-] Bad request to:'${requestPath}'. the response was:${response.statusText}`);
		// give some indication to user using respondWith
		return true;
	}
	return false;
};

const fetchMainPageData = async (path) => {

	const response = await fetch(`${config.serverUrl}/api/chats/`);
	
	if(handleBadFetchStatus(response, `${config.serverUrl}/api/chats/`, 'oops!'))
		return;

	const chatRooms = await response.json();

	const __INITIAL_DATA__ = {
		chatRooms,
		chatId: null,
		messages: null
	};

	return {
		initialMarkup: ReactDOMServer.renderToString(<App __INITIAL_DATA__={__INITIAL_DATA__} />),
		__INITIAL_DATA__
	};
};

const fetchChatPageData = async (path) => {
	
	const chatName = path.split('/').pop();
	
	// Bad path
	if(!chatName) {
		console.log(`[-] The user tried to go to:'${path}', but the chat name is problematique..`);
		return;
	}

	let response = await fetch(`${config.serverUrl}/api/chats/${chatName}`);
	if(handleBadFetchStatus(response, `${config.serverUrl}/api/chats/${chatName}`, 'wat?!'))
		return;

	const chat = await response.json();

	response = await fetch(`${config.serverUrl}/api/messages/${chat._id}`);
	if(handleBadFetchStatus(response, `${config.serverUrl}/api/messages/${chat._id}`, 'noooo!'))
		return;

	const messages = await response.json();

	const __INITIAL_DATA__ = {
		chatRooms: null,
		currentChat: chat,
		messages
	};

	return {
		initialMarkup: ReactDOMServer.renderToString(<App __INITIAL_DATA__={__INITIAL_DATA__} />),
		__INITIAL_DATA__
	};
};

const serverRender = (url) => {
	// preform analysis of the url and server render

	const match = routes.find(route => matchPath(url,route));
	return match.dataFetcher(url);

	// if (chatName) {
	// 	let chatRooms;
	// 	let chatId;
	// 	let messages;
	// 	return axios.get(`${config.serverUrl}/api/chats/`)
	// 		.then(chatsData => { 
	// 			chatRooms = chatsData.data.chats;
	// 			return axios.get(`${config.serverUrl}/api/chats/${chatName}`);
	// 		})
	// 		.catch(err => console.error(err))
	// 		.then(idData => {
	// 			chatId = idData.data;
	// 			return axios.get(`${config.serverUrl}/api/messages/${chatId}`);
	// 		})
	// 		.catch(err => console.error(err))
	// 		.then(messagesData => {
	// 			messages = messagesData.data;

	// 			const initialData = {
	// 				chatRooms,
	// 				chatId,
	// 				messages
	// 			};
				
	// 			return {
	// 				initialMarkup: ReactDOMServer.renderToString(<App initialData={initialData} />),
	// 				initialData
	// 			};
	// 		})
	// 		.catch(err => console.error(err));

			
	// 	// 	const chatRooms = chatsData.data.chats;
	// 	// 	return axios.get(`${config.serverUrl}/api/chats/${chatName}`) 
	// 	// 		.then(idData => {
	// 	// 			const chatId = idData.data._id;
	// 	// 			axios.get(`${config.serverUrl}/api/messages/${chatId}`)
	// 	// 				.then(messagesData => {
	// 	// 					const messages = messagesData.data;
							
	// 	// 					const initialData = {
	// 	// 						chatRooms,
	// 	// 						chatId,
	// 	// 						messages
	// 	// 					};
							
	// 	// 					return {
	// 	// 						initialMarkup: ReactDOMServer.renderToString(<App initialData={initialData} />),
	// 	// 						initialData
	// 	// 					};
						
	// 	// 				}).catch(err => console.log(err));
	// 	// 		}).catch(err => console.log(err));
	// 	// }).catch(err => console.log(err));
		
	// } else {
	// 	return axios.get(`${config.serverUrl}/api/chats/`).then((res) => {
			
	// 		const initialData = {
	// 			chatRooms: res.data.chats,
	// 			chatId: null
	// 		};

	// 		return {
	// 			initialMarkup: ReactDOMServer.renderToString(<App initialData={initialData} />),
	// 			initialData
	// 		};
	// 	}).catch(err => console.log(err));
	// }
};

export const routes = [{
	path: '/',
	exact: true,
	strict: false,
	dataFetcher: fetchMainPageData
}, 
{
	path: '/c/:chatName',
	exact: true,
	strict: false,
	dataFetcher: fetchChatPageData
}];

export default serverRender;