const mongoose = require('mongoose')

const today = new Date();

const notificationAdminSchema = new mongoose.Schema({
    auteur: { type: Object },
    description: { type: String },
    experience: { type: String },
    date: { type: Date, default: today }
})

module.exports = mongoose.model('notificationAdminSchema', notificationAdminSchema, "notificationAdmin");