const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth');
//const jwtAuth = require('./../middlewares/jwtAuth');

//let upload = require('./../helpers/uploads');
let router = express.Router();
const bcrypt=require('bcryptjs');
const config = require('../utils/config');
const User = require('./../helpers/user');

router.post('/login', function(req, res, next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                err: info
            });
        }
        req.logIn(user, { session: false }, function(err) {
            if (err) {
                return res.status(500).send({
                    err: 'Could not log in user'
                });
            }
            let jsonWebToken = jwt.sign(user, config.secret);
            res.status(200).send({
                status: 200,
                message: 'Login Successful',
                token: jsonWebToken,
                user: req.user
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).send({
        status: 'Bye!'
    });
});


router.put('/changeInfo', function(req,res){
    console.log(req.user);
    User.checkUsername(req.body.username)
    .then((data) => {
        if (data.status === 201){
            User.updateUserInfo(
            req.body.username,
            req.body.name,
            req.body.lastname,
            req.body.email,
            req.user.user_id
        )
        .then(() => {
                    let user = {user_id:req.user.user_id,user_username:req.body.username}
                    req.logIn(user, { session: false }, function(err) {
                        if (err) {
                            return res.status(500).send({
                                err: 'Could not log in user'
                            });
                        }
                        let jsonWebToken = jwt.sign(user, config.secret);
                        res.status(200).send({
                            status: 200,
                            message: 'Login Successful',
                            token: jsonWebToken
                        });
            })}
    )
    .catch(err => res.send(err));
    }
}).catch(err=>res.send(err));
});

/*router.post('/changeProfilePic/:target', auth, upload.single('file') ,function(req,res){
    let dir = `./public/uploads/${req.user.user_id}/pic/${req.file.filename}`;
    User.uploadProfilePic(dir, req.user.user_id)
    .then((data) => {
        res.send(data);   
    })
    .catch((err) => {
        res.send(err);
    })
});*/

router.post('/register',auth.isLogged,auth.emailRegistered,(req,res)=>{
    const user = req.body;
    const salt = bcrypt.genSaltSync(10);
    if(user.password !== user.confPassword){
        res.status(401).send({status:401,message:'passwords must match'});
    }
    user.password = bcrypt.hashSync(user.password, salt);
    User.register(user.name,user.lastName,user.email,user.password)
        .then(data=>{

            res.status(200).send({
                status:200,
                message:'registered succesfully',
                data
            })
        })
        .catch(err=>{
            res.send(err);
        });
    //res.redirect('login');
});

router.get('/test', (req, res) => {
    
        search.searchUser(req.body.id).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        });
    
});


module.exports = router;