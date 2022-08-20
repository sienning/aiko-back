var express = require('express');
var router = express.Router();
const auth = require('../controller/auth');
const { userModel } = require('../models/user.model');
const mongoose = require('mongoose');

router.get('/see-user/id_user=:id', auth, function (req, res) {
  let id = mongoose.Types.ObjectId(req.params.id);
  console.log(id)
  userModel.findById(id)
    .then(user => { res.send(user) })
    .catch(error => { res.status(500).json({ error }) })
});

router.get('/see-all-players', auth, function (req, res) {
  userModel.find()
    .then(players => { res.send(players) })
    .catch(error => { res.status(500).json({ error }) })
});

router.get('/see-players/id_user=:id_user', auth, function (req, res) {
  let id = mongoose.Types.ObjectId(req.params.id_user);
  userModel.find({ _id: { $ne: id }, admin: "joueur" })
    .then(players => { res.send(players) })
    .catch(error => { res.status(500).json({ error }) })
});

router.get('/see-all-coachs', auth, function (req, res) {
  userModel.find({ coach: true })
    .then(coachs => { res.send(coachs) })
    .catch(error => { res.status(500).json({ error }) })
});

router.post('/update-user/id_user=:id', auth, function (req, res, next) {
  let id = mongoose.Types.ObjectId(req.params.id);
  let user = req.body.user;
  console.log('Update user : ' + id)
  console.log('Update user : ', user)

  const update = {
    avatar: user.avatar.avatar,
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
