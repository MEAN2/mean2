const path = require('path');
const includeAll = require('include-all');
const _ = require('lodash');

const appPath = process.cwd() + '/';

const paths = {
  config: path.resolve(appPath + 'config')
};

let defaultConfig = {
  server: {
    port: 3000
  }
};

function loadUserConfig(cb) {
  includeAll.aggregate({
    dirname: paths.config,
    filter: /^([^.]+)\.(?:(?!md|txt).)+$/,
    flatten: true,
    keepDirectoryPath: true,
    identity: false
  }, (err, config) => {
    config = _.merge(defaultConfig, config)
    cb(err, config);
  });
}

module.exports = {
  loadUserConfig: loadUserConfig
};
