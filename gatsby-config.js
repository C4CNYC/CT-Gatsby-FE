const path = require('path');

const config = require('./config/env');
const { buildBlocks } = require('./utils/buildBlocks');
const { buildUnits } = require('./utils/buildUnits');

module.exports = {
  siteMetadata: {
    title: 'Codetribe',
    siteUrl: config.homeLocation
  },
  plugins: [
    'gatsby-plugin-top-layout',
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-resolve-src',
      options: {
        addSassLoader: true,
      },
    },
    {
      resolve: 'c4c-source-blocks',
      options: {
        name: 'blocks',
        source: buildBlocks
      }
    },
    {
      resolve: 'c4c-source-units',
      options: {
        name: 'units',
        source: buildUnits
      }
    },
    // 'gatsby-plugin-postcss',
    // {
    //   resolve: 'gatsby-plugin-create-client-paths',
    //   options: {
    //     prefixes: [
    //       '/certification/*',
    //       '/unsubscribed/*',
    //       '/user/*',
    //       '/settings/*',
    //       '/n/*'
    //     ]
    //   }
    // },

    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'introductions',
    //     path: curriculumIntroRoot
    //   }
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/posts/`,
    //     name: "posts"
    //   }
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/pages/`,
    //     name: "pages"
    //   }
    // },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // 'gatsby-remark-fcc-forum-emoji',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {}
            }
          },
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: "transparent"
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 2em`
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-plugin-scroll-indicator`,
            options: {
              // Configure color of the scroll indicator
              color: '#663391',
              // Height of the scroll indicator
              height: '3px',
              // Configure paths where the scroll indicator will appear
              paths: ['/', '/blog/**'],
              // Configure the z-index of the indicator element
              zIndex: `9999`,
            },
          }
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // {
    //   resolve: 'gatsby-remark-node-identity',
    //   options: {
    //     identity: 'blockIntroMarkdown',
    //     predicate: ({ frontmatter }) => {
    //       if (!frontmatter) {
    //         return false;
    //       }
    //       const { title, block, superBlock } = frontmatter;
    //       return title && block && superBlock;
    //     }
    //   }
    // },
    // {
    //   resolve: 'gatsby-remark-node-identity',
    //   options: {
    //     identity: 'superBlockIntroMarkdown',
    //     predicate: ({ frontmatter }) => {
    //       if (!frontmatter) {
    //         return false;
    //       }
    //       const { title, block, superBlock } = frontmatter;
    //       return title && !block && superBlock;
    //     }
    //   }
    // },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/learn`,
          /(\/)learn(\/)\S*/
        ],
        addUncaughtPages: true
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Codetribe',
        /* eslint-disable camelcase */
        short_name: 'Codetribe',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        /* eslint-enable camelcase */
        display: 'minimal-ui',
        icon: 'src/assets/images/jika.png'
      }
    },
    // 'gatsby-plugin-remove-serviceworker'
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        include: /svg-icons/
      }
    }
  ]
};
