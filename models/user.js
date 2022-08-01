const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')

// const UserDiscordSchema = new mongoose.Schema({
//     discordId: { type: String, required: true },
//     username: { type: String, require: true },
//     email: { type: String, require: true},
//     avatar: { type: String },
//     admin: { type: String, require: true, default: "joueur" }
// });

const userSchema = new mongoose.Schema({
    prenom: { type: String },
    nom: { type: String },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: { type: String, require: true, default: "joueur" },
    avatar: { type: String, default: "avatar-default.png" },
    discordName: { type: String },
    inGameName: { type: String},
    idGame: { type: String, default: 1 },
    level: { type: String, default: "Casuel"},
    mainRole: { type: String },
    subRole: { type: String },
    rang: { type: String },
    division: { type: String },
    description: { type: String }
})

userSchema.plugin(uniValid)

// var discordModel = mongoose.model('discordModel', UserDiscordSchema, "users");
var userModel = mongoose.model('userModel', userSchema, "users");

module.exports = {
    // discordModel: discordModel,
    userModel: userModel
};

// module.exports = mongoose.model('User', userModel, "users");
// module.exports = mongoose.model('User', UserSchema, "users");