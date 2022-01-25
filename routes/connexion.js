const router = require('express').Router();
const passport = require('passport');
const { userModel } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jsontoken = require('jsonwebtoken')

//Discord connection tuto
router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
  failureRedirect: '/forbidden',
  // successRedirect: 'http://localhost:3000/'
  successRedirect: '/profil'
}));

router.post('/login', (req, res) => {
  userModel.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.send({ status: "error", message: "Cet utilisateur n'existe pas ! Verifiez votre adresse mail." });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(ok => {
          if (!ok) {
            return res.send({ status: "error", message: "Mot de passe incorrect." });
          }
          res.status(200).json({
            userInfos: user,
            userId: user._id,
            token: jsontoken.sign(
              { userId: user._id }, 'cryptage', { expiresIn: '24h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
})

module.exports = router;