const chokidar = require('chokidar');

const { createBlockNode } = require('./create-block-nodes');

exports.sourceNodes = function sourceBlocksSourceNodes(
	{ actions, reporter },
	pluginOptions
) {
	const { source } = pluginOptions;
	if (typeof source !== 'function') {
		reporter.panic(`
    "source" is a required option for c4c-source-blocks. It must be a
    function that delivers block objects to the plugin
    `);
	}
	const { createNode } = actions;

	function sourceAndCreateNodes() {
		return source()
			.then(blocks => Promise.all(blocks))
			.then(blocks =>
				blocks
					// .filter(
					// 	block => block.superBlock.toLowerCase() !== 'certificates'
					// )
					.map(block => {
						const res = createBlockNode(block, reporter);
						return res;
					})
					.map(node => {
						const res = createNode(node);
						return res;
					})
			)
			// .catch(e =>
			// 	reporter.panic(`c4c-source-blocks
			//
			// 		${e.message}
			//
			// 	`)
			// );
	}

	return new Promise((resolve, reject) => {
		sourceAndCreateNodes().then(resolve, reject);
	});
};

// exports.createSchemaCustomization = ({ actions }) => {
// 	const { createTypes } = actions;
// 	const typeDefs = `
//     type BlockNode implements Node {
//       image: String
//     }
//   `;
// 	createTypes(typeDefs);
// };
