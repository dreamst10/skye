const express = require('express');
let router = express.Router();


router.use('/user', require('./user'));
router.use('/skills', require('./skills'));
router.use('/jobs', require('./jobs'));
//router.use('/search', require('./search'));


router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/index');
    }else{
        res.redirect('/login');
    }
});

router.get('/index',(req,res)=>{
    res.send('this is dashboard');
})

module.exports = router;