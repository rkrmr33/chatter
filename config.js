const env = process.env;

export default {
	PORT: env.PORT || 8080,
	HOST: env.HOST || 'chatter-app-demo.herokuapp.com',
	randomColorUrl: 'http://www.colr.org/json/color/random',
	dbUri: 'cluster0-shard-00-01-qxuhq.gcp.mongodb.net:27017',
	get serverUrl() { return `http://${this.HOST}:${this.PORT}`; }
};