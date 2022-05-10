const mongoose = require('mongoose')

const playSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    profile_data: {
        type: Array
    },
    work_exp_data: {
        type: Array
    },
    education_data: {
        type: Array
    },
    award_data: {
        type: Array
    },
    cer_data: {
        type: Array
    },
    skill_data: {
        type: Array
    },
    intt_data: {
        type: Array
    },
    lang_data: {
        type: Array
    },
    reff_data: {
        type: Array
    },
    project_data: {
        type: Array
    },
    font_size: {
        type: String
    },
    font_family: {
        type: String
    },
    theme_color: {
        type: String
    },
    basic_email: {
        type: String
    },
    basic_headline: {
        type: String
    },
    basic_name: {
        type: String
    },
    basic_phone: {
        type: String
    },
    basic_summary: {
        type: String
    },
    basic_website: {
        type: String
    },
    location_address: {
        type: String
    },
    location_city: {
        type: String
    },
    location_country: {
        type: String
    },
    location_postal: {
        type: String
    },
    location_region: {
        type: String
    },
    profile_img: {
        type: String
    },
    profile_img_style: {
        type: Object,
        default: {
            filter: "",
            border: ""
        }
    },
    theme: {
        type: String,
        default: 'kakuna'
    }

}, { timestamps: true })

module.exports = mongoose.model('Play', playSchema)