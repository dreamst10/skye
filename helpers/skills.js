const db = require('../SQL/db');
const sql = require('../SQL/queries');

module.exports.addUserSkill = (skillScore, skillId, userId) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none(sql.addUserSkill,[skillScore,skillId,userId])
            .then(()=>{
                console.log('hai')
                res({
                    status: 200,
                    message:'ok'
                });
                obj.done();
            }).catch((err)=>{
                console.log('ie')
                rej(err);
                rej({
                    status:500,
                    message:'unsuccesful'
                })
            })
        }).catch((err)=>{
            console.log('ieee')
            console.log(err);
            rej(err);
            res.send(err);
        })
    })
}

module.exports.addjobSkill = (skillScore, skillId, jobId) => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none(sql.addJobSkill,[skillScore,skillId,jobId])
            .then(()=>{
                res({
                    status: 200,
                    message:ok
                });
                obj.done();
            }).catch((err)=>{
                rej({
                    status:500,
                    message:unsuccesful
                })
            })
        }).catch((err)=>{
            console.log(err);
            rej(err);
            res.send(err);
        })
    })
}

module.exports.getUserSkills = (userId)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.manyOrNone(sql.getUserSkills, [userId])
                .then((data)=>{
                    //console.log(data);
                    res({
                        status:200,
                        message:'succesful',
                        data
                    });
                    obj.done();
                }).catch(err=>{
                    rej(err);
                    obj.done();
                });
        }).catch(err=>{
            rej(err);
            obj.done();
        });
    });
}

module.exports.deleteUserSkills = (userId)=>{
    return new Promise((res, rej)=>{
        db.connect().then((obj)=>{
            obj.any(sql.deleteUserSkills, [userId])
                .then(data=>{
                    res({
                        status:200,
                        message:'done',
                        data
                    });
                    obj.done();
                }).catch(err=>{
                    rej(err);
                    obj.done();
                });
        }).catch(err=>{
            rej(err);
        });
    });
}

module.exports.getJobSkills = (JobId)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.manyOrNone(sql.getJobSkills, [JobId])
                .then((data)=>{
                    res.status(200).send(data);
                    obj.done();
                }).catch(err=>{
                    rej(err);
                    obj.done();
                });
        }).catch(err=>{
            rej(err);
            obj.done();
        });
    });
}

module.exports.deleteJobSkills = (jobId)=>{
    return new Promise((res, rej)=>{
        db.connect().then((obj)=>{
            obj.any(sql.deleteJobSkills, [jobId])
                .then(data=>{
                    res({
                        status:200,
                        message:'done',
                        data
                    });
                    obj.done();
                }).catch(err=>{
                    rej(err);
                    obj.done();
                });
        }).catch(err=>{
            rej(err);
        });
    });
}

//for manually filling DB skills table
module.exports.addSkill = (skillName)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none(sql.addSkill, [skillName]).then(()=>{
                res({
                    status:200,
                    message:'ok'
                });
                obj.done();
            }).catch(err=>{
                rej(err);
                obj.done();
            })
        }).catch(err=>{
            rej(err);
            res.send(err);
        })
})
}