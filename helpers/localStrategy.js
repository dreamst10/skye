let User = require('./user');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy( {usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
  User.checkEmail(email).then(user => {
    if (user===null) {
      return done(null, false,{message:'wrong email or password'});
    }

    User.comparePassword(password, user.user_password).then(isMatch => {
      if(isMatch) {
        return done(null, {
          id: user.user_id,
          name: user.user_name,
          lastName: user.user_lastname,
          email: user.user_email
        });
      }
      else {
        return done(null, false,{message:'wrong email or password'})
     }
    }).catch((err)=>{
      console.log(err);
      return done(null,false);
    });
  }).catch(err=>{
    console.log(err);
    return done(null,false);
  })
});