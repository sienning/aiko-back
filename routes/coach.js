var express = require('express');
var router = express.Router();
const auth = require('../controller/auth');
const { userModel } = require('./../models/user');
const { coachModel } = require('./../models/coach')
const mongoose = require('mongoose');

router.get('/see-coach/id_coach=:id', auth, function (req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.id);
    console.log(id)
    coachModel.findById(id)
        .then(coach => { res.send(coach) })
        .catch(error => { res.status(500).json({ error }) })
});

router.put('/see-coach/id_coach=:id', auth, function (req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.id);
    let coach = req.body.coach;
    console.log('Update coach : ' + id)
    console.log('Update coach : ', coach)

    const update = {
        // username: user.username.pseudo,
        // idGame: user.idGame.idGame,
        // division: user.division.division,
        // rang: user.rang.rang,
        // mainRole: user.mainRole.mainRole,
        // subRole: user.subRole.subRole
    }

    coachModel.findByIdAndUpdate(id, update)
        .then(r => {
            res.sendStatus(204)
        })
        .catch(error => { res.status(500).json({ error }) })
});

module.exports = router;
