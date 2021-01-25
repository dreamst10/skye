const db = require('../SQL/db');
const sql = require('../SQL/queries');



module.exports.getJobApplications = (jobId) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.manyOrNone(sql.getJobApplications, [jobId])
                .then(data=>{
                    res({
                        status:200,
                        message:'ok',
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
};

module.exports.sendApplication = (jobId,userId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(sql.sendApplication,[jobId,userId]).then(()=>{
                res({
                    status:200,
                    message:'ok'
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
};

module.exports.deleteApplication = (appId,userId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(sql.deleteApplication,[appId,userId]).then(()=>{
                res({
                    status:200,
                    message:'ok'
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
};

module.exports.checkApplication = (jobId,userId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.oneOrNone(sql.checkApplication,[jobId,userId]).then(data=>{
                res({
                    status:200,
                    message:'ok',
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
};

module.exports.postJob = (userId, jobTitle, jobDesc) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(sql.postJob, [userId, jobTitle, jobDesc])
                .then(()=>{
                    res({
                        status:200,
                        message:'ok'
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
};

module.exports.deleteJob = (jobId, userId) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(sql.deleteJob, [jobId, userId])
                .then(()=>{
                    res({
                        status:200,
                        message:'ok'
                    });
                    obj.done();
                }).catch(err=>{
                    rej(err);
                    obj.done();
                });
        }).catch(err=>{
            rej(err);
        })
    })
};

module.exports.updateJob = (jobTitle, jobDesc, jobId, userId) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(sql.updateJob, [jobTitle, jobDesc, jobId, userId])
                .then(()=>{
                    res({
                        status:200,
                        message:'ok'
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
};

module.exports.getUserJobs = (userId) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.manyOrNone(sql.getJobs, [userId])
                .then(data=>{
                    res({
                        status:200,
                        message:'ok',
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
  
};

module.exports.getJobInfo=(jobId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one(sql.getJobInfo, [jobId])
                .then(data=>{
                    res({
                        status:200,
                        message:'ok',
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
    })
}