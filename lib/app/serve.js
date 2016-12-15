const bodyParser = require('body-parser');
const morgan = require('./morgan');
const cors = require('./cors');
const staticFolder = require('./static-folder');

module.exports = function(app, config) {
  return function() {
    // enable cors
    app.use(cors);

    // log requests
    app.use(morgan);

    // accept POST
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    // serve static files
    app.use(staticFolder);

    // start server
    let server = app.listen(process.env.port || config.server.port, () => {
      let host = server.address().address,
          port = server.address().port;

      console.log(`Listening at http://${host}:${port}`);
    });
  }
};
