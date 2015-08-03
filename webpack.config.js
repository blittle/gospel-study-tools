var path = require('path');

module.exports = {
	entry: {
		auth: "./app/scripts/auth/auth.js",
		scraper: "./app/scripts/scraper/scraper.js",
		background: "./app/scripts/background/background.js"
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, "app/build"),
		filename: "[name].build.js"
	},
	module: {
	  loaders: [
		    { test: /\.js$/, exclude: /node_modules|bower_components/, loader: "babel-loader"}
		  ]
	}
}
