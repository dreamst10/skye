let User = require('./user');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy( {usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
console.log(1)
  User.checkEmail(email).then(user => {
    
    if (user===null) {
      return done(null, false,{message:'wrong email or password'});
    }
    console.log(2)
    User.comparePassword(password, user.user_password).then(isMatch => {
      if(isMatch) {
        console.log(3)
        return done(null, {
          id: user.user_id,
          name: user.user_name,
          lastName: user.user_lastname,
          email: user.user_email
        });
      }
      else {
        console.log(4)
        return done(null, false,{message:'wrong email or password'})
     }
    }).catch((err)=>{
      console.log(5)
      console.log(err);
      return done(null,false);
    });
  }).catch(err=>{
    console.log(6)
    console.log(err);
    return done(null,false);
  })
});