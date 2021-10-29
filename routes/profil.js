const router = require('express').Router();
const jsontoken = require('jsonwebtoken');
const auth = require('../controller/auth');

let user;

function isAuthorized(req, res, next) {
    console.log("isAuthorized");
    console.log("global user", user);
    if(user){
        console.log("User is logged in.");
        next();
    } else if (req.user) {
        console.log("User is logged in.");
        console.log(req.user);
        user = req.user
        next();
    }
    else {
        console.log("User is not loged in.");
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    console.log("PROFIL");
    console.log(user);
    // res.send({
    //     userInfos: req.user,
    //     userId: req.user._id,
    //     token: jsontoken.sign(
    //         { userId: req.user._id }, 'cryptage', { expiresIn: '24h' }
    //     )
    // })
    res.redirect('http://localhost:3000');
});

router.get('/get-profile', isAuthorized, (req, res) => {
    console.log("GET PROFILE");
    console.log(user);
    res.send({
        userInfos: user,
        userId: user._id,
        token: jsontoken.sign(
            { userId: user._id }, 'cryptage', { expiresIn: '24h' }
        )
    })
    // .redirect('http://localhost:3000');
});

router.get('/empty-profile', auth, (req, res) => {
    console.log("EMPTY PROFILE");
    console.log(user);
    user = null;
    res.sendStatus(200);
});

module.exports = router;