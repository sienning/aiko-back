const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')

const userModel = mongoose.Schema({
    prenom: {type: String, require: true},
    nom: {type: String, require:true},
    pseudo: {type: String, require:true, unique: true},
    email: {type: String, require:true, unique: true},
    password: {type: String, require:true},
    admin: {type: String, require:true}
})

userModel.plugin(uniValid)

module.exports = mongoose.model('User', userModel)