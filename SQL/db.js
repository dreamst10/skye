const config = require('../helpers/config');
const pgp = require('pg-promise')();
const db = pgp(config.dbUrl);

module.exports = db;