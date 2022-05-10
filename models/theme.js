const mongoose = require('mongoose')

const themeSchema = new mongoose.Schema({
    is_paid: {
        type: Boolean,
        default: false
    },
    name: {
        type: String
    },
    style_id: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Theme', themeSchema)