const router = require('express').Router()
const { isadmin } = require('../middlewares/user')
const Setting = require('../models/setting')

// creating one 
// router.post('/adding', async (req, res) => {
//     try {
//         const resp = await new Setting(req.body)
//         const save = await resp.save()
//         res.json(save)
//     } catch (err) {
//         console.log(err)
//     }
// })

// patching one 
router.post('/patch', isadmin, async (req, res) => {
    try {
        if (req.files) {
            if (req.files.file !== undefined) {
                const file = req.files.file
                const filename = ("" + Math.random()).substring(2, 7) + Date.now() + file.name
                file.mv(`${__dirname}/../client/public/images/dynamic/${filename}`, err => {
                    if (err) {
                        console.log(err)
                        return res.json({ err })
                    }
                })
                req.body.logo = filename
            }
        }

        const resp = await Setting.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true })
        res.json({ success: true, data: resp, msg: 'Updated success' })

    } catch (error) {
        console.log(error)
    }
})

// get setting 
router.get('/get', async (req, res) => {
    try {
        const resp = await Setting.findOne()
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router