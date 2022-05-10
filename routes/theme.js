const router = require('express').Router()
const Theme = require('../models/theme')
const { isadmin } = require('../middlewares/user')

// adding one 
router.post('/add', async (req, res) => {
    try {
        const resp = await new Theme(req.body)
        const save = await resp.save()
        res.json({ success: true, data: save, msg: "New theme has been added" })
    } catch (err) {
        console.log(err)
    }
})

// get all
router.get('/get', async (req, res) => {
    try {
        const resp = await Theme.find()
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})

// patch theme 
router.post('/patch', isadmin, async (req, res) => {
    try {
        const resp = await Theme.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
        res.json({ success: true, data: resp, msg: "Theme has been updated" })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router