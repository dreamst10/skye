const express = require('express');
let router = express.Router();


router.use('/user', require('./user'));
//router.use('/register', require('./register'));
//router.use('/jobs', require('./jobs'));
//router.use('/search', require('./search'));
//router.use('/skills', require('./skills'));
//router.use('/friend', require('./friend'));

module.exports = router;