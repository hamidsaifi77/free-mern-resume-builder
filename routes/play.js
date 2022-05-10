const router = require('express').Router()
const { isvalid } = require('../middlewares/user')
const Play = require('../models/play')

router.post('/add', isvalid, async (req, res) => {
    try {
        const ext = await Play.findOne({ slug: req.body.slug })
        console.log(ext)
        if (ext) {
            return res.json({ success: false, msg: "Duplicate slug found", data: ext })
        }
        req.body.uid = req.decode.uid
        const resp = await Play(req.body)
        const save = await resp.save()
        res.json({ success: true, msg: "Task done", data: save })
    } catch (err) {
        console.log(err)
    }
})


router.put('/patch', isvalid, async (req, res) => {
    try {
        const resp = await Play.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true })
        res.json({ success: true, data: resp, msg: 'Updated success' })
    } catch (err) {
        console.log(err)
    }
})

router.post('/profile_img', isvalid, async (req, res) => {
    try {
        if (req.files) {
            const file = req.files.file
            const filename = ("" + Math.random()).substring(2, 7) + Date.now() + file.name
            file.mv(`${__dirname}/../client/public/images/profile/${filename}`, err => {
                if (err) {
                    console.log(err)
                    return res.json({ err })
                }
            })
            const resp = await Play.findByIdAndUpdate({ _id: req.body.id }, { profile_img: filename, profile_img_style: JSON.parse(req.body.style) }, { new: true })
            res.json({ success: true, data: resp, msg: "Profile pic updated" })
            return
        }
        res.json({ success: false, msg: "No image attached" })
    } catch (err) {
        console.log(err)
    }
})

// get play by uid 
router.get('/get', isvalid, async (req, res) => {
    try {
        const resp = await Play.find({ uid: req.decode.uid })
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})

// get by id 
router.post('/get_one', async (req, res) => {
    try {
        const resp = await Play.findOne({ _id: req.body.id })
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})

// delete resume 
router.post('/delete', isvalid, async (req, res) => {
    try {
        const findfirst = Play.findOne({ _id: req.body.id })
        if (findfirst._id === "6235be8ad441b04e5637f8a5") {
            return (res.json({ msg: "This cant be deleted", success: false }))
        }
        console.log(res.body)
        const resp = await Play.findOne({ uid: req.decode.uid, _id: req.body._id })
        if (!resp) {
            res.json({ success: false, msg: "Something went wrong" })
        }
        const del = await Play.findOneAndDelete({ _id: resp._id })
        res.json({ success: true, data: del, msg: "Deleted" })
    } catch (err) {
        console.log(err)
    }
})


// get play data by slug 
router.get('/get_by_slug/:slug', async (req, res) => {
    try {
        const resp = await Play.findOne({ slug: req.params.slug })
        if (!resp) {
            return res.json({ success: false, msg: "invalid slug" })
        }
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})


router.post('/image_demo_data', async (req, res) => {
    try {
        const resp = await Play.findOne({ uid: 'demo' })
        resp._id = req.body.id
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router