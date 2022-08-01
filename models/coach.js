const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')

const coachSchema = new mongoose.Schema({
    idUser: { type: String, require: true, unique: true},
    idGame: { type: String, default: 1 },
    level: { type: String, default: "Casuel"},
    mainRole: { type: String },
    subRole: { type: String },
    rang: { type: String },
    division: { type: String },
    description: { type: String },
    calendly: { type : String}
})

coachSchema.plugin(uniValid)

var coachModel = mongoose.model('coachSchema', coachSchema, "coach");

module.exports = {
    coachModel: coachModel
};
