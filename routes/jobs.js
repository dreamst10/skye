const express = require('express');
const auth = require('./../middlewares/isAuth');
let router = express.Router();
const Jobs = require('./../helpers/jobs');

router.get('/getJobApplications/:jobId',auth.isAuth,(req,res)=>{
    Jobs.getJobApplications(req.params.jobId).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    });
});

router.post('/sendApplication/:jobId',auth.isAuth,(req,res)=>{
    Jobs.checkApplication(req.params.jobId,req.user.id).then(data=>{
        if(!data.data){
            Jobs.sendApplication(req.params.jobId,req.user.id).then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send(err);
            });
        }else{
            res.send('You already applied for this job');
        }
    }).catch(err=>{
        res.send(err);
    })
});

router.delete('/deleteApplication/:id',auth.isAuth,(req,res)=>{
    Jobs.deleteApplication(req.params.id,req.user.id).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    });
});

router.post('/postJob',auth.isAuth,(req,res)=>{
    Jobs.postJob(req.user.id,req.body.jobTitle,req.body.jobDesc).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    })
});

router.delete('/deleteJob/:jobId',auth.isAuth,(req,res)=>{
    Jobs.deleteJob(req.params.jobId,req.user.id).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    });
});

router.put('/updateJob/:jobId',auth.isAuth,(req,res)=>{
    Jobs.updateJob(req.body.jobTitle,req.body.jobDesc,req.params.jobId,req.user.id).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    })
})



module.exports = router;