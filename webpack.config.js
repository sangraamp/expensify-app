const path = require('path')

// entry -> output

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				// run all .js files through babel except the ones in node_modules
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/,
				// an array of loaders == use
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	devtool: 'eval-cheap-module-source-map', // for easy debugging
	devServer: {
		contentBase: path.join(__dirname, 'public'), // setting up webpack-dev-server
		// routing to be handled via client side code
		historyApiFallback: true,
	},
	mode: 'development',
}
