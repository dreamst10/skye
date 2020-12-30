const cors = require('cors');
const express = require('express');
const app = express();
const jwt = require('express-jwt');
let passport = require('passport');
let auth = require('./middlewares/isAuth');
const config = require('./helpers/config');
