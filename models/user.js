const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
        unique: true
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    plan_id: {
        type: String
    },
    uid: {
        type: String
    },
    subs_valid: {
        type: Date
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)