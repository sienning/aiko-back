const mongoose = require('mongoose')

const today = new Date();

const teamsSchema = new mongoose.Schema({
    auteur: { type: Object },
    nom: { type: String, required: true, unique: true },
    iconSrc: { type: String, default: "equipe-icon.png" },
    banniere: { type: String, default: "banniere-equipe.png" },
    description: { type: String },
    nbLan: { type: Number, default: 0 },
    nbTournois: { type: Number, default: 0 },
    nbSucces: { type: Number, default: 0 },
    jeux: { type: Array },
    reseaux: { type: Array },
    membres: { type: Array },
    coach: { type: Array },
    staff: { type: Array },
    succes: { type: Array },
    recrutement: { type: String },
    tarifs: { type: Number, default: 0 },
    langues: { type: Array },
    profilRecherche: { type: Object },
    candidatures: { type: Array },
    date: { type: Date, default: today }
})

module.exports = mongoose.model('teamsSchema', teamsSchema, "teams");