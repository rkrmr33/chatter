'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var env = process.env;

console.log('meow +++ ' + env.HOST);

exports.default = {
	PORT: env.PORT || 8080,
	HOST: env.HOST || '0.0.0.0',
	randomColorUrl: 'http://www.colr.org/json/color/random',
	dbUri: 'mongodb://root:wonder100@ds235711.mlab.com:35711/heroku_rwfpp10l',
	get serverUrl() {
		return 'http://' + this.HOST + ':' + this.PORT;
	}
};