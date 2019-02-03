'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var env = process.env;

exports.default = {
	PORT: env.PORT || 8080,
	HOST: env.HOST || 'https://chatter-app-demo.herokuapp.com/',
	randomColorUrl: 'http://www.colr.org/json/color/random',
	dbUri: 'mongodb+srv://roikramer:wonder100@cluster0-qxuhq.gcp.mongodb.net/test?retryWrites=true',
	get serverUrl() {
		return 'http://' + this.HOST + ':' + this.PORT;
	}
};