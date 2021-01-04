const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth');
let router = express.Router();
const config = require('../utils/config');
const Skills = require('./../helpers/skills');

router.post('/addUserSkill', auth.isAuth, (req, res)=>{
    Skills.addUserSkill(req.body.score, req.body.id, req.user.id)
        .then(data=>{
            res.send({
                status:200,
                message:'succesful',
                data
            });
        }).catch(err=>{
            res.send(err);
        });
});

router.get('/getUserSkills', (req,res)=>{
    Skills.getUserSkills(req.body.userId)
        .then(data=>{
            console.log(data);
            res.status(200).send(data);
        }).catch(err=>{
            res.send(err);
        });
});

//for manually filling DB with skills
router.post('/addSkill', (req,res)=>{
    Skills.addSkill(req.body.skillName)
    .then(data=>{
        console.log('si')
        res.status(200).send({
            status:200,
            message:'registered succesfully',
            data
        });
    })
    .catch(err=>{
        console.log('no')
        res.send(err);
    });
});

module.exports = router;