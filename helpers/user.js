const db = require('../SQL/db');
const bcrypt = require('bcryptjs');
const sql = require('../SQL/queries');

module.exports.getUserByUsername = (username) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one(sql.getUser, [username]).then((data) => {
                res(data);
                obj.done();
            }).catch((error) => {
//                console.log('que esta pasando');
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}

module.exports.getUser = (id) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one(sql.getUser, [id]).then((data) => {
                res(data);
                obj.done();
            }).catch((error) => {
                console.log('que esta pasando');
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}

module.exports.searchUser = (query) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.manyOrNone(sql.searchUser, [query]).then(data=>{
                res(data);
                obj.done;
            }).catch(err=>{
                rej(err);
                obj.done();
            });
        }).catch(err=>{
            rej(err);
        });
    });
}


module.exports.checkEmail = (email) => {
    console.log(email)
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.oneOrNone(sql.checkEmail, email).then((data) => {
                res(data);
                console.log('si')
                //console.log(obj)
                obj.done();
            }).catch((error) => {
                rej(error);
                console.log('no')
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}


module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.register = (name, lastName, email, password) => {
    return new Promise((res, rej) => {
        db.connect().then(obj=>{
            console.log([name, lastName, email, password])
            obj.none(sql.newUser,[name, lastName, email, password])
                .then(()=>{
                    res({
                        status:200,
                        message:'ok'
                    });
                    obj.done();
                }).catch((err)=>{
                    rej({
                        status:500,
                        message:'unsuccesful register'
                    })
                    obj.done();
                });
        });
    });
};


module.exports.updateUserInfo = (name, lastname, email, userId) =>{
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            console.log('si llega')
            obj.any(sql.updateInfo, [name, lastname, email, userId]).then(() => {
                res({status:200, message:'updated'});
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}

module.exports.uploadProfilePic = (url, userId) =>{
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.uploadPicture, [url, userId]).then((data) => {
                res(data);
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}