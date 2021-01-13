const express = require('express');
const auth = require('./../middlewares/isAuth');
let router = express.Router();
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

router.get('/getUserSkills/:id', auth.isAuth, (req,res)=>{
    Skills.getUserSkills(req.params.id)
        .then(data=>{
            console.log(data);
            res.status(200).send(data);
        }).catch(err=>{
            res.send(err);
        });
});

router.delete('/deleteUserSkills',auth.isAuth,(req,res)=>{
    Skills.deleteUserSkills(req.user.id)
        .then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(err);
        });
});

router.post('/addJobSkill/:id', auth.isAuth, (req, res)=>{
    Skills.addjobSkill(req.body.score, req.body.id, req.params.id)
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

router.get('/getJobSkills/:id', auth.isAuth, (req,res)=>{
    Skills.getJobSkills(req.params.id)
        .then(data=>{
            console.log(data);
            res.status(200).send(data);
        }).catch(err=>{
            res.send(err);
        });
});

router.delete('/deleteJobSkills/:id',auth.isAuth,(req,res)=>{
    Skills.deleteJobSkills(req.params.id)
        .then(data=>{
            res.send(data);
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