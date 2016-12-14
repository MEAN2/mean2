const serve = require('./serve');
const config = require('./config');

module.exports = function() {
  var init = () => {
    config.loadUserConfig((err, config) => {
      if (err) {
        console.error(err);
        return;
      }

      this.config = config;
    });
  };

  // member variables
  this.app = require('express')();
  this.config = {};

  // public methods
  this.serve = serve(this.app);
  
  // run init
  init();
}
