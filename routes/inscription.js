const router = require('express').Router();
const { userModel } = require('./../models/user');
const bcrypt = require('bcryptjs');

// Connexion par le formulaire
router.post('/login/create-user', (req, res, next) => {
    bcrypt.hash(req.body.mdp, 10)
        .then(hash => {
            console.log(req.body.pseudo);
            const user = new userModel({
                email: req.body.email,
                password: hash,
                nom: req.body.nom,
                prenom: req.body.prenom,
                username: req.body.pseudo,
            })

            console.log(user);

            user.save()
                .then(() => res.status(201).json({ message: 'create user' }))
                .catch(error => console.log(error))
        })
        .catch(error => res.status(400).json({ error }))
});

module.exports = router;