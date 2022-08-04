var express = require('express');
var router = express.Router();
const auth = require('../controller/auth');
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
        idGame: coach.idGame.idGame,
        division: coach.division.division,
        rang: coach.rang.rang,
        mainRole: coach.mainRole.mainRole,
        subRole: coach.subRole.subRole,
        calendly: coach.calendly.calendly,
        description: coach.description.description
    }

    coachModel.findByIdAndUpdate(id, update)
        .then(r => {
            res.sendStatus(204)
        })
        .catch(error => { res.status(500).json({ error }) })
});

module.exports = router;
