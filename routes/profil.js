const router = require('express').Router();
const jsontoken = require('jsonwebtoken');
const auth = require('../controller/auth');

global.user;

function isAuthorized(req, res, next) {
    console.log("isAuthorized");
    console.log("global user", global.user);
    if (global.user) {
        next();
    } else if (req.user) {
        global.user = req.user
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    console.log("PROFIL");
    console.log(global.user);
    res.redirect(process.env.REDIRECT_FRONT);
});

router.get('/get-profile', isAuthorized, (req, res) => {
    console.log("GET PROFILE");
    console.log(global.user);
    res.send({
        userInfos: global.user,
        userId: global.user._id,
        token: jsontoken.sign(
            { userId: global.user._id }, 'cryptage', { expiresIn: '24h' }
        )
    })
});

router.get('/empty-profile', auth, (req, res) => {
    console.log("EMPTY PROFILE");
    global.user = null;
    res.sendStatus(200);
});

module.exports = router;