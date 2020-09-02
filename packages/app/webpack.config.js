/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const inspectLoader = require('../common/inspectLoader');

module.exports = {
	mode: 'production',
	target: 'node',
	devtool: false,
	entry: './src/index.ts',
	externals: nodeExternals({modulesDir: 'node_modules', additionalModuleDirs: [path.join('..', '..', 'node_modules')]}),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'commonjs2',
	},
	resolve: {
		extensions: ['.mjs', '.js', '.ts', '.d.ts'],
	},
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					inspectLoader('BABEL'),
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium', {client: false}]],
						},
					},
				],
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					inspectLoader('BABEL-TS'),
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true}]],
						},
					},
				],
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
				use: [inspectLoader('NODE-MJS')],
			},
		],
	},
};
