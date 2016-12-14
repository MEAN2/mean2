const morgan = require('morgan');

const logLevel = (process.env.NODE_ENV === 'production') ? 'common' : 'dev';

module.exports = morgan(logLevel);
