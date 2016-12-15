const glob = require('glob');
const path = require('path');
const _ = require('lodash');

const appPath = process.cwd() + '/api/';

module.exports = {
  load: () => {
    // models
    glob.sync(appPath + 'models/**/*.js').forEach(file => {
      let modelName = _.capitalize(path.basename(file, '.js'));
      
      global[modelName] = require(path.resolve(file));
    });

    // controllers
    glob.sync(appPath + 'controllers/**/*.js').forEach(file => {
      let controllerName = path.basename(file, '.js');

      if (!controllerName.endsWith('Controller')) {
        controllerName = _capitalize(controllerName) + 'Controller';
      }

      global[controllerName] = require(path.resolve(file));
    });
  }
};
