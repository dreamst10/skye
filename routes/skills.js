const express = require('express');
const auth = require('./../middlewares/isAuth');
let router = express.Router();
const Skills = require('./../helpers/skills');

router.post('/addUserSkill/:id',  (req, res)=>{
    Skills.addUserSkill(req.body.score, req.body.id, req.params.id)
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

router.get('/getSkills',(req, res)=>{
    Skills.getSkills()
    .then(data=>{
        console.log('data goes thru here')
        res.status(200).send(data);
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/getUserSkills/:id',  (req,res)=>{
    Skills.getUserSkills(req.params.id)
        .then(data=>{
            console.log(data);
            res.status(200).send(data);
        }).catch(err=>{
            res.send(err);
        });
});

router.delete('/deleteUserSkills/:id',(req,res)=>{
    Skills.deleteUserSkills(req.params.id)
        .then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(err);
        });
});

router.post('/addJobSkill/:id',  (req, res)=>{
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

router.get('/getJobSkills/:id',  (req,res)=>{
    Skills.getJobSkills(req.params.id)
        .then(data=>{
            console.log(data);
            res.status(200).send(data);
        }).catch(err=>{
            res.send(err);
        });
});

router.delete('/deleteJobSkills/:id',(req,res)=>{
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