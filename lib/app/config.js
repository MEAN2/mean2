const path = require('path');
const includeAll = require('include-all');

const appPath = process.cwd() + '/';

const paths = {
  config: path.resolve(appPath + 'config')
};

function loadUserConfig(cb) {
  includeAll.aggregate({
    dirname: paths.config,
    filter: /^([^.]+)\.(?:(?!md|txt).)+$/,
    flatten: true,
    keepDirectoryPath: true,
    identity: false
  }, cb);
}

module.exports = {
  loadUserConfig: loadUserConfig
};
