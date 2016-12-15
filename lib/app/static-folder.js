const express = require('express');

module.exports = express.static(process.cwd() + '/build/public');
