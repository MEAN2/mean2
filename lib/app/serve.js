const bodyParser = require('body-parser');
const morgan = require('./morgan');
const cors = require('./cors');

module.exports = function(app) {
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

    // start server
    let server = app.listen(process.env.port || 1337, () => {
      let host = server.address().address,
          port = server.address().port;

      console.log(`Listening at http://${host}:${port}`);
    });
  }
}
