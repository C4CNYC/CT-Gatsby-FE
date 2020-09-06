const chokidar = require('chokidar');

const { createUnitNode } = require('./create-unit-nodes');

exports.sourceNodes = function sourceUnitsSourceNodes(
	{ actions, reporter },
	pluginOptions
) {
	const { source } = pluginOptions;
	if (typeof source !== 'function') {
		reporter.panic(`
    "source" is a required option for c4c-source-units. It must be a
    function that delivers unit objects to the plugin
    `);
	}
	const { createNode } = actions;

	function sourceAndCreateNodes() {
		return source()
			.then(units => Promise.all(units))
			.then(units =>
				units
					// .filter(
					// 	unit => unit.superBlock.toLowerCase() !== 'certificates'
					// )
					.map(unit => createUnitNode(unit, reporter))
					.map(node => createNode(node))
			)
			.catch(e =>
				reporter.panic(`c4c-source-units
					${e.message}
				`)
			);
	}

	return new Promise((resolve, reject) => {
		sourceAndCreateNodes().then(resolve, reject);
	});
};
