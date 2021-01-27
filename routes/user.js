const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth');
//const jwtAuth = require('./../middlewares/jwtAuth');

//let upload = require('./../helpers/uploads');
let router = express.Router();
const bcrypt=require('bcryptjs');
const config = require('../utils/config');
const User = require('./../helpers/user');
const Jobs = require('../helpers/jobs');
const { query } = require('../SQL/db');

router.post('/login',auth.isLogged,passport.authenticate('local'), function(req, res) {
   console.log(req.user);
   req.session.user=req.user;
    res.status(200).send({
        status: 200,
        message: 'Login Successful',
        user: req.user
    });
    console.log(req.user);

});

router.get('/logout',  (req, res) => {
    req.logout();
    res.status(200).send({ status: 200, message: "Logged out successfully" });
  });

/*


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
    const user = req.body.user;
    console.log(user)
    const salt = bcrypt.genSaltSync(10);
    if(user.password !== user.confPassword){
        return res.status(401).send({status:401,message:'passwords must match'});
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

router.get('/search/:query', (req, res) => {
    console.log(req.params.query)
        User.searchUser(req.params.query).then((data) => {
            res.send({
                status:200,
                message:'ok',
                data
            });
        }).catch((err) => {
            res.send(err);
        });
    
});

router.put('/changeInfo', auth.emailRegistered, function(req,res){
    console.log(req.user);
    User.checkEmail(req.user.email)
    .then((data) => {
        console.log(1);
        console.log(data);
        if (data){
            User.updateUserInfo(
            req.body.name,
            req.body.lastname,
            req.body.email,
            req.user.id
        ).then(() => {
            console.log(2);
                    let user = {id:req.user.id,email:req.body.email}
                    req.logIn(user, { session: false }, function(err) {
                        if (err) {
                            console.log(3);
                            return res.status(500).send({
                                err: 'Could not log in user'
                            });
                        }
                        console.log(4);
                        console.log(req.user);
                        res.status(200).send({
                            status: 200,
                            message: 'Login Successful',
                        });
            })}
        ).catch(err => res.send(err));
        }
    }).catch(err=>res.send(err));
//    console.log(5);
});

router.get('/getUserInfo/:id',(req,res)=>{
    User.getUser(req.params.id).then(data=>{
        
    }).catch(err=>{
        res.send(err);
    })
});

router.get('/getUserJobs/:id',(req,res)=>{
    Jobs.getUserJobs(req.params.id).then(data=>{
        res.send({
            status:200,
            message:'ok',
            data
        });
    }).catch(err=>{
        res.send(err);
    })
});

router.get('/getUserApplications/',(req,res)=>{
    Jobs.getUserApplications(req.user.id).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    })
});


module.exports = router;