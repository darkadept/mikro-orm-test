const debug = require('debug');

const d = debug('inspectLoader');

/*
	This webpack loader can be used to debug which files are being processed by which loader.
 */
module.exports = function inspectLoader(loaderName) {
	return {
		loader: 'inspect-loader',
		options: {
			loaderName,
			callback(inspect) {
				d(`[${inspect.options.loaderName}] ${inspect.context._module.resource}`);
			},
		},
	};
}
