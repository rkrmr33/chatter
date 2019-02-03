'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var env = process.env;

exports.default = {
	PORT: env.PORT || 8080,
	HOST: env.HOST || 'chatter-app-demo.herokuapp.com',
	randomColorUrl: 'http://www.colr.org/json/color/random',
	dbUri: 'mongodb://root:wonder100@cluster0-shard-00-00-qxuhq.gcp.mongodb.net:27017,cluster0-shard-00-01-qxuhq.gcp.mongodb.net:27017,cluster0-shard-00-02-qxuhq.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
	get serverUrl() {
		return 'http://' + this.HOST + ':' + this.PORT;
	}
};