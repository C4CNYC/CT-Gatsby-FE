const fs = require('fs');
const path = require('path');
const debug = require('debug');

const env = require('../../../config/env');

// const { getChallengesForLang } = require('../../../curriculum/getChallenges');
const { createPathMigrationMap } = require('../seed/createPathMigrationMap');

const { createRedirects } = require('./create-redirects');

const log = debug('fcc:tools:ensure-env');

const { CODE4CHANGE_NODE_ENV } = process.env;

const { apiLocation: api, locale, forumProxy, newsProxy } = env;

try {
  const apiPath = path.resolve(__dirname, '../../../../api-fcc');
} catch (error) {
  console.error(error);
}

try {
  const clientPath = path.resolve(__dirname, '../../../../app/webFrontend');
  const clientStaticPath = path.resolve(clientPath, 'static');
} catch (error) {
  console.error(error);
}

const globalConfigPath = path.resolve(__dirname, '../../../config');

if (typeof clientStaticPath !== 'undefined' && CODE4CHANGE_NODE_ENV === 'production') {
  const redirects = createRedirects({ api, newsProxy, forumProxy });
  fs.writeFile(`${clientStaticPath}/_redirects`, redirects, function(err) {
    if (err) {
      log('Error');
      console.error(err);
    }
    log('_redirects written');
  });
} else {
  log(`ignoring creation of redirect file in ${CODE4CHANGE_NODE_ENV}`);
}

if (typeof apiPath !== 'undefined') {
  const migrationMapPath = `${apiPath}/server/resources/pathMigration.json`;
  fs.access(migrationMapPath, err => {
    if (err && CODE4CHANGE_NODE_ENV !== 'production') {
      log('creating pathMigration');
      return fs.writeFileSync(migrationMapPath, '{}');
    }
    if (CODE4CHANGE_NODE_ENV === 'production') {
      return getUnitsForLang(locale)
        .then(createPathMigrationMap)
        .then(map => {
          fs.writeFileSync(migrationMapPath, JSON.stringify(map));
          log('pathMigration has been written');
        })
        .catch(err => {
          console.error(err);
          // eslint-disable-next-line
          process.exit(1);
        });
    }
    log('pathMigration present');
    return null;
  });
}

if (typeof clientPath !== 'undefined') {
  fs.writeFileSync(`${clientPath}/config/env.json`, JSON.stringify(env));
}
fs.writeFileSync(`${globalConfigPath}/env.json`, JSON.stringify(env));
