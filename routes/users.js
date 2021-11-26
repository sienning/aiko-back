var express = require('express');
var router = express.Router();
const auth = require('../controller/auth');
const { userModel } = require('./../models/user');
const mongoose = require('mongoose');

router.get('/see-user/id_user=:id', auth, function (req, res) {
  let id = mongoose.Types.ObjectId(req.params.id);
  userModel.findById(id)
    .then(user => { res.send(user) })
    .catch(error => { res.status(500).json({ error }) })
});

router.get('/see-players/id_user=:id_user', auth, function (req, res) {
  let id = mongoose.Types.ObjectId(req.params.id_user);
  userModel.find({_id : { $ne: id }, admin : "joueur"})
    .then(players => { res.send(players) })
    .catch(error => { res.status(500).json({ error }) })
});

module.exports = router;
