module.exports = {
	node: {fs: 'empty'},
	entry: './src/index.js',
	output: {
		path: `${__dirname}/public`,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
};