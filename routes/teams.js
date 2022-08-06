var express = require('express');
var router = express.Router();
const auth = require('../controller/auth');
const teamsSchema = require("../models/team.model");

router.get('/', auth, function (req, res) {
  teamsSchema.find()
    .then(teams => { res.send(teams) })
    .catch(error => { res.status(500).json({ error }) })
});

router.get('/get-content/:id', auth, function (req, res) {
  let id = req.params.id;
  teamsSchema.findById(id)
    .then(teams => { res.send(teams) })
    .catch(error => { res.status(500).json({ error }) })
});

router.post('/create-team', auth, function (req, res) {
  let team = req.body.team;

  const newTeam = new teamsSchema(team)
  console.log(newTeam);

  newTeam.save()
    .then(() => res.status(201).json({ message: 'Team ' + team.nom + " created.", status: 201 }))
    .catch(error => {
      console.log(error)
      res.send(error)
    })
});



module.exports = router;
