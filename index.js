const cors = require('cors');
const express = require('express');
const app = express();
const jwt = require('express-jwt');
let passport = require('passport');
let strategies = require('./helpers/strategies');
let auth = require('./middlewares/isAuth');
const config = require('./helpers/config');

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwt({
    secret: config.secret,
    credentialsRequired: false
}).unless({
    path: ['/session/login', '/register/createUser', '/']
}));
app.use(passport.initialize());
app.use(passport.session());
app.options('*', cors());
app.use(cors());

app.use('/', require('./routes'));
app.get('/', function(req, res) {
    res.redirect('views/index.html');
});
app.use(auth.isValidToken);
passport.use(strategies.localStrategy);
passport.use(strategies.jwtStrategy);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.listen(config.port, function() {
    console.log('Example app listening on port 3000!');
});
