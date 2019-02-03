import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.hydrate(<App __INITIAL_DATA__={window.__INITIAL_DATA__}/>,
	document.querySelector('#root')
);