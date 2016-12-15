const async = require('async');
const _ = require('lodash');

const serve = require('./serve');
const config = require('./config');
const globals = require('./globals');

module.exports = function() {
  // member variables
  this.app = require('express')();
  this.config = {};

  let init = (() => {
    async.series({
      loadGlobals: (cb) => {
        // load globals
        globals.load();
        cb(null, true);
      },

      config: (cb) => {
        config.loadUserConfig(cb);
      }
    }, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }

      // set config object
      this.config = results.config;

      // set routes
      this.config.routes(this.app);

      // run bootstrap
      if (_.isFunction(this.config.bootstrap)) {
        this.config.bootstrap();
      }

      // expose serve method
      this.serve = serve(this.app, this.config);
    });
  })();
};
