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

router.post('/update-team/:teamId', auth, function (req, res) {
  let team = req.body.team;
  let id = req.params.teamId;
  const update = team

  teamsSchema.findByIdAndUpdate(id, update)
    .then(() => res.status(201).json({ message: 'Team ' + team.nom + " updated.", status: 201 }))
    .catch(error => {
      console.log(error)
      res.send(error)
    })
});

router.post('/add-candidature/:teamId', auth, function (req, res) {
  let id = req.params.teamId;
  let newCandidate = req.body.newCandidate;
  const update = { $push: { candidatures: newCandidate } }

  teamsSchema.findByIdAndUpdate(id, update)
    .then(() => {
      res.status(201).json({ message: 'Candidate ' + newCandidate.username + " added.", status: 201 })
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
});

router.post('/add-member/:teamId', auth, function (req, res) {
  let id = req.params.teamId;
  let newMember = req.body.member;
  console.log("newMember", newMember);
  const update = { $push: { membres: newMember } }

  teamsSchema.findByIdAndUpdate(id, update)
    .then(() => {
      res.status(201).json({ message: 'Candidate ' + newMember.username + " added.", status: 201 })
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
});

router.post('/remove-candidature/:teamId', auth, function (req, res) {
  let id = req.params.teamId;
  let candidate = req.body.candidate;
  const update = { $pull: { candidatures: { _id: candidate._id } } }

  teamsSchema.findByIdAndUpdate(id, update)
    .then(() => res.status(201).json({ message: 'Candidate ' + candidate.username + " removed.", status: 201 }))
    .catch(error => {
      console.log(error)
      res.send(error)
    })
});


module.exports = router;
