var express = require('express');
var router = express.Router();
const auth = require('../controller/auth');
const { userModel } = require('./../models/user');
const mongoose = require('mongoose');

router.get('/see-user/id_user=:id', auth, function (req, res, next) {
  let id = mongoose.Types.ObjectId(req.params.id);
  console.log(id)
  userModel.findById(id)
    .then(user => { res.send(user) })
    .catch(error => { res.status(500).json({ error }) })
});

router.put('/see-user/id_user=:id', auth, function (req, res, next) {
  let id = mongoose.Types.ObjectId(req.params.id);
  let user = req.body.user;
  console.log('Update user : ' + id)
  console.log('Update user : ', user)

  const update = {
    username: user.username.pseudo,
    idGame: user.idGame.idGame,
    division: user.division.division,
    rang: user.rang.rang,
    mainRole: user.mainRole.mainRole,
    subRole: user.subRole.subRole,
    levelCoach: user.levelCoach.levelCoach,
    calendlyCoach: user.calendlyCoach.calendlyCoach,
    descriptionCoach: user.descriptionCoach.descriptionCoach
  }

  userModel.findByIdAndUpdate(id, update)
    .then(r => {
      res.sendStatus(204)
    })
    .catch(error => { res.status(500).json({ error }) })
});

module.exports = router;
