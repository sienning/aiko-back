const router = require('express').Router();
const passport = require('passport');
const { userModel } = require('./../models/user');
const bcrypt = require('bcryptjs');
const jsontoken = require('jsonwebtoken')

//Discord connection tuto
router.get('/', passport.authenticate('discord'), (res, req) => {
  console.log(res);
});
router.get('/redirect', passport.authenticate('discord', {
  failureRedirect: '/forbidden',
  successRedirect: '/profil'
}));

router.get('/login', (req, res) => {
  userModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'pas trouvé' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(ok => {
          if (!ok) {
            return res.status((401).json({ error: 'incorect mdp' }))
          }
          res.status(200).json({
            userId: user._id,
            token: jsontoken.sign(
              { userId: user._id }, 'cryptage', { expiresIn: '48h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })

})

module.exports = router;