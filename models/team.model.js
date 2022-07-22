const mongoose = require('mongoose')

const today = new Date();

const teamSchema = new mongoose.Schema({
    nom: { type: String, required: true, unique: true },
    avatar: { type: String, default: "equipe-icon.png" },
    banniere: { type: String, default: "banniere-equipe.png" },
    description: { type: String },
    nblan: { type: Number, default: 0 },
    nbtournois: { type: Number, default: 0 },
    succes: { type: Number, default: 0 },
    jeux: { type: Array },
    reseaux: { type: Array },
    auteur: { type: String },
    membres: { type: Array },
    coach: { type: Array },
    staff: { type: Array },
    recrutement: { type: String },
    tarif: { type: String },
    langues: { type: Array },
    profilsrecherches: { type: Array },
    filtre: { type: Array },
    date: { type: Data, default: today }
})

module.exports = mongoose.model('Team', teamSchema, "team");