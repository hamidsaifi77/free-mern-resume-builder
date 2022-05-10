const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String
    },
    pass: {
        type: String
    },
    mobile: {
        type: String
    },
    role: {
        type: String,
        default: 'admin'
    }
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema)