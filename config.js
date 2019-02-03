'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var env = process.env;

console.log('meow +++ ' + env.HOST);

exports.default = {
	PORT: env.PORT || 8080,
	HOST: env.HOST || '52.208.45.11',
	randomColorUrl: 'http://www.colr.org/json/color/random',
	dbUri: 'mongodb+srv://roikramer:wonder100@cluster0-qxuhq.gcp.mongodb.net/test?retryWrites=true',
	get serverUrl() {
		return 'http://' + this.HOST + ':' + this.PORT;
	}
};