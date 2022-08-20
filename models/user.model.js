const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    prenom: { type: String, default: "" },
    nom: { type: String, default: "" },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: { type: String, require: true, default: "joueur" },
    avatar: { type: String, default: "avatar-default-01.png" },
    discordId: { type: String, required: true, default: "0" },
    discordName: { type: String, default: "" },
    inGameName: { type: String, default: ""},
    idGame: { type: String, default: 1 },
    mainRole: { type: String, default: "" },
    subRole: { type: String, default: "" },
    rang: { type: String, default: "" },
    division: { type: String, default: "" },
    coach: { type: Boolean, default: false },
    certificationCoach: { type: Boolean, default: 1 },
    descriptionCoach: { type: String, default: "" },
    calendlyCoach: { type: String, default: "" },
    levelCoach: { type: String, default: "Casuel" },
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