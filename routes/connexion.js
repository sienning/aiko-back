const router = require('express').Router();
const passport = require('passport');

//Discord connection tuto
router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
  failureRedirect: '/forbidden',
  successRedirect: '/profil'
}));
module.exports = router;