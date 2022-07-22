const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
    equipe: { type: String, required: true, unique: true },
    available: { type: Array },
    taken: { type: Array },
})

module.exports = mongoose.model('Calendar', calendarSchema, "calendar");