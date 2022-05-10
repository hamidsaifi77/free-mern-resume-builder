const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
    mem_amt: {
        type: Number
    },
    logo: {
        type: String
    },
    rz_id: {
        type: String
    },
    rz_secret: {
        type: String
    }
})

module.exports = mongoose.model('Setting', settingSchema)