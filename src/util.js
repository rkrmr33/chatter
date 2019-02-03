import axios from 'axios';

export const apiUrl = 'http://192.168.1.24:3000';

// Handle bad requests and gives info to user
const handleBadFetchStatus = (error, requestPath, respondWith) => {
	if(error) {
		console.log(`[-] Bad request to:'${requestPath}'. the response was:${error}`);
		console.log(`[-] ${respondWith}`);
		return false;
	}
	return true;
};

// USED FOR GENERATION A NEW RANDOM COLOR FOR A NEW USER SPECIAL_COLOR
export const fetchColor = () => {
	return axios.get(`${apiUrl}/api/color`)
		.then(res => res.data)
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/color`, 'Somthing went wrong with the fetch color request'));
};


// FETCHING MESSAGES FOR CHAT_ID FROM THE API
export const fetchMessages = (chatId) => {
	return axios.get(`${apiUrl}/api/messages/${chatId}`)
		.then(res => res.data)
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/messages/${chatId}`, 'Somthing went wrong with the fetch messages request'));
};


// FETCHIING A CHAT OBJECT FROM THE API
export const fetchChat = (chatName) => {
	return axios.get(`${apiUrl}/api/chats/${chatName}`)
		.then(res => res.data)
		.catch(err => handleBadFetchStatus(err, `${apiUrl}api/chats/${chatName}`, 'Somthing went wrong with the fetch chat object request'));
};

export const fetchAllChats = () => {
	return axios.get(`${apiUrl}/api/chats/`)
		.then(res => res.data)
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/chats/`, 'Somthing went wrong with the fetch all chats request'));
};

export const checkUsername = (username) => {
	return axios.get(`${apiUrl}/api/users/check/${username}`)
		.then(res => res.data)
		.catch(err => handleBadFetchStatus(err, `${apiUrl}api/users/check/${username}`, 'Somthing went wrong with the check username availability request'));
};

export const createAccount = (accountDetails) => {
	return fetchColor()
		.then(specialColor => {
			accountDetails['specialColor'] = specialColor;
			return axios.post(`${apiUrl}/api/users/create`, accountDetails)
				.then(result => {
					return result.data;
				})
				.catch(err => handleBadFetchStatus(err, `api/users/create/${accountDetails}`, 'Somthing went wrong with account creation request'));
		})
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/color`, 'Somthing went wrong with color fetch request'));
};

export const login = (account) => {
	return axios.post(`${apiUrl}/api/users/login`, account)
		.then(result => {
			return result.data;
		})
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/users/login/${account.username}-${account.password}`, 'Somthing went wrong with user login request'));
};

export const enterChat = (username, _id) => {
	return axios.post(`${apiUrl}/api/chats/enter`, {username, _id})
		.then(result => {
			return result.data;
		})
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/chats/enter/${username}-${_id}`, 'Somthing went wrong with user enter chat request'));
};

export const quitChat = (username, _id) => {
	return axios.post(`${apiUrl}/api/chats/quit`, {username, _id})
		.then(result => {
			return result.data;
		})
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/chats/quit/${username}-${_id}`, 'Somthing went wrong with user quit chat request'));
};

export const sendMessage = (message) => {
	return axios.post(`${apiUrl}/api/messages/send`, message)
		.then(result => {
			return result.data;
		})
		.catch(err => handleBadFetchStatus(err, `${apiUrl}/api/messages/send/${JSON.stringify(message)}`, 'Somthing went wrong with message send request'));
};
