const env = require('./config/env');

const { createFilePath } = require('gatsby-source-filesystem');

const { dasherize } = require('./utils/slugs');
const { blockNameify } = require('./utils/blockNameify');
const {
  createUnitPages,
  createBlockIntroPages,
  createSuperBlockIntroPages
} = require('./utils/gatsby');

const createByIdentityMap = {
  lesson: createBlockIntroPages,
  course: createSuperBlockIntroPages
};

exports.onCreateNode = function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions;
  if (node.internal.type === 'UnitNode') {
    const { tests = [], block, title, superBlock } = node;
    const slug = `/learn/${dasherize(superBlock)}/${dasherize(
      block
    )}/${dasherize(title)}`;
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'blockName', value: blockNameify(block) });
    createNodeField({ node, name: 'tests', value: tests });
  }

  if (node.internal.type === 'BlockNode') {
    const { title, superBlock } = node;
    const slug = `/learn/${superBlock ? `${dasherize(superBlock)}/` : ''}${dasherize(
      title
    )}`;

    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = function createPages({ graphql, actions, reporter }) {
  // if (!env.algoliaAPIKey || !env.algoliaAppId) {
  //   if (process.env.CODE4CHANGE_NODE_ENV === 'production') {
  //     throw new Error(
  //       'Algolia App id and API key are required to start the client!'
  //     );
  //   } else {
  //     reporter.info(
  //       'Algolia keys missing or invalid. Required for search to yield results.'
  //     );
  //   }
  // }
  //
  // if (!env.stripePublicKey || !env.servicebotId) {
  //   if (process.env.CODE4CHANGE_NODE_ENV === 'production') {
  //     throw new Error(
  //       'Stripe public key and Servicebot id are required to start the client!'
  //     );
  //   } else {
  //     reporter.info(
  //       'Stripe public key or Servicebot id missing or invalid. Required for' +
  //         ' donations.'
  //     );
  //   }
  // }

  const { createPage } = actions;

  /* required {
  link
  src
}*/

  return new Promise((resolve, reject) => {
    // Query for all markdown 'nodes' and for the slug we previously created.
    resolve(
      graphql(`
        {
          allUnitNode(
            sort: { fields: [superOrder, order, unitOrder] }
          ) {
            edges {
              node {
                block
                unitType
                fields {
                  slug
                }
                id
                order

                unitOrder
                superBlock
                superOrder
                template
              }
            }
          }
          allBlockNode(
            sort: { fields: [superOrder, order] }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                superBlock
                title
                content
                id
                excerpt
                type
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          return reject(result.errors);
        }

        // Create unit pages.
        result.data.allUnitNode.edges.forEach(
          createUnitPages(createPage)
        );

        // Create block pages
        result.data.allBlockNode.edges.forEach(edge => {
          const {
            node: { type }
          } = edge;

          // if (!fields) {
          //   return null;
          // }
          // const { slug, nodeIdentity } = fields;
          // if (slug.includes('LICENCE')) {
          //   return null;
          // }
          // try {
            const pageBuilder = createByIdentityMap[type](createPage);
            return pageBuilder(edge);
          // } catch (e) {
          //   console.log(`
          //   ident: ${nodeIdentity} does not belong to a function
          //
          //   ${frontmatter ? JSON.stringify(edge.node) : 'no frontmatter'}
          //
          //
          //   `);
          // }
          // return null;
        });

        return null;
      })
    );
  });
};

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, plugins, actions }) => {
  const newPlugins = [
    plugins.define({
      HOME_PATH: JSON.stringify(
        process.env.HOME_PATH || 'http://localhost:3000'
      ),
      STRIPE_PUBLIC_KEY: JSON.stringify(process.env.STRIPE_PUBLIC_KEY || ''),
      ROLLBAR_CLIENT_ID: JSON.stringify(process.env.ROLLBAR_CLIENT_ID || ''),
      ENVIRONMENT: JSON.stringify(
        process.env.CODE4CHANGE_NODE_ENV || 'development'
      ),
      PAYPAL_SUPPORTERS: JSON.stringify(process.env.PAYPAL_SUPPORTERS || 404)
    })
  ];
  // The monaco editor relies on some browser only globals so should not be
  // involved in SSR. Also, if the plugin is used during the 'build-html' stage
  // it overwrites the minfied files with ordinary ones.
  if (stage !== 'build-html') {
    newPlugins.push(new MonacoWebpackPlugin({
      features: ['!gotoSymbol'],
    }));
  }
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    },
    plugins: newPlugins,
    // devtool: 'eval'
    // devtool: 'eval-source-map'
    // devtool: 'source-map',
    // devtool: 'cheap-module-source-map'
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-function-bind'
  });
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from'
  });
  actions.setBabelPlugin({
    name: 'babel-plugin-transform-imports',
    options: {
      lodash: {
        transform: 'lodash/${member}',
        preventFullImport: true
      }
    }
  });
};
