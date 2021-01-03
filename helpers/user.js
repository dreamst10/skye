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

module.exports.checkUsername = (username) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.getUser, [username]).then(() => {
                res({status:201});
                obj.done();
            }).catch((error) => {
                rej(error);
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

module.exports.registerUser = (username, password, name, lastName, sex, email) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.newUser, [username, password, name, lastName, email, sex])
                .then(() => {
                    res({
                        message: "OK",
                        status: 200
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'not Created',
                        status: 500
                    });
                    obj.done();
                });
        });
    });
};


module.exports.updateUserInfo = (username, name, lastname, email, userId) =>{
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.updateInfo, [username, name, lastname, email, userId]).then(() => {
                res({status:200, message:'updated papi'});
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