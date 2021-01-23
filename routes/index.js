const express = require('express');
let router = express.Router();


router.use('/user', require('./user'));
router.use('/skills', require('./skills'));
router.use('/jobs', require('./jobs'));
//router.use('/search', require('./search'));


router.get('/', (req, res) => {
    console.log(req.user)
});

router.get('/index',(req,res)=>{
    res.send('this is dashboard');
})

module.exports = router;