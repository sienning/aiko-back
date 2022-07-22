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
  console.log('Update user' + id)
  userModel.findOneAndUpdate(id)
    .then(user => { res.send(user) })
    .catch(error => { res.status(500).json({ error }) })
});

module.exports = router;
