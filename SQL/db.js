const config = require('../utils/config');
const pgp = require('pg-promise')();
const db = pgp(config.dbUrl);

module.exports = db;