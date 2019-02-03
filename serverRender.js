import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import App from './src/components/App';
import config from './config';


const serverRender = (url) => {
	// preform analysis of the url and server render
	
	const match = routes.find(route => matchPath(url,route));
	return match.dataFetcher(url);
};

// Handle route '/'
const fetchMainPageData = async (path) => {
	
	const response = await fetch(`${config.serverUrl}/api/chats/`);
	
	if(handleBadFetchStatus(response, `${config.serverUrl}/api/chats/`, 'oops!'))
		return;
	
	const chatRooms = await response.json();
	
	const __INITIAL_DATA__ = {
		chatRooms,
		currentChat: null,
		messages: null,
		show: 'ChatList'
	};
	
	return {
		initialMarkup: ReactDOMServer.renderToString(<App __INITIAL_DATA__={__INITIAL_DATA__} />),
		__INITIAL_DATA__
	};
};

// Handle route '/c/:chatName'
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
		messages,
		show: 'ChatRoom'
	};

	return {
		initialMarkup: ReactDOMServer.renderToString(<App __INITIAL_DATA__={__INITIAL_DATA__} />),
		__INITIAL_DATA__
	};
};

// Handle route '/create_account'
const fetchRegistrationPageData = async (path) => {
	const __INITIAL_DATA__ = {
		chatRooms: null,
		currentChat: null,
		messages: null,
		show: 'Registration'
	};

	return {
		initialMarkup: ReactDOMServer.renderToString(<App __INITIAL_DATA__={__INITIAL_DATA__} />),
		__INITIAL_DATA__
	};
};

// Handle route '/login'
const fetchLoginPageData = async (path) => {
	const __INITIAL_DATA__ = {
		chatRooms: null,
		currentChat: null,
		messages: null,
		show: 'Login'
	};

	return {
		initialMarkup: ReactDOMServer.renderToString(<App __INITIAL_DATA__={__INITIAL_DATA__} />),
		__INITIAL_DATA__
	};
};

const handleBadFetchStatus = (response, requestPath, respondWith) => {
	if(!response.ok) {
		console.log(`[-] Bad request to:'${requestPath}'. the response was:${response.statusText}`);
		// give some indication to user using respondWith
		return true;
	}
	return false;
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
},
{
	path: '/create_account',
	exact: true,
	strict: false,
	dataFetcher: fetchRegistrationPageData
},
{
	path: '/login',
	exact: true,
	strict: false,
	dataFetcher: fetchLoginPageData
}];


export default serverRender;