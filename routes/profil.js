const router = require('express').Router();

function isAuthorized(req, res, next){
    if(req.user) {
        console.log("User is logged in.");
        console.log(req.user);
        next();
    }
    else {
        console.log("User is not loged in.");
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.send(200)
});

module.exports = router;