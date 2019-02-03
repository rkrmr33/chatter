const env = process.env;

export default {
	PORT: env.PORT || 3000,
	HOST: env.HOST || '0.0.0.0',
	randomColorUrl: 'http://www.colr.org/json/color/random',
	dbUri: 'mongodb://localhost:27017/test',
	get serverUrl() { return `http://${this.HOST}:${this.PORT}`; }
};